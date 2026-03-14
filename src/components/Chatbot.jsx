import React, { useCallback, useEffect, useRef, useState } from "react";
import educationData from "../data/educationData";
import careerData from "../data/careerData";
import { enrichCareerData } from "../data/careerEnrichment";
import { detectIntents } from "../utils/intentDetector";
import { getRandomResponse } from "../data/conversationalResponses";
import doubtResponses from "../data/doubtResponses";
import { classifyIntent, mapEntitiesToState, mapIntentToAction, paraphraseResponse, getSentiment } from "../services/nlpService";
import { getGuidance } from "../services/guidanceEngine";
import { quizData } from "../data/quizData";
import { generateRoadmap } from "../services/roadmapService";
import { getTranslation } from "../utils/translations";
import { detectInterestsFromText, looksLikeInterestStatement, findCareersByIds } from "../services/interestEngine";
import { detectCareerDetailIntent } from "../utils/fuzzyMatcher";
import { RoadmapTemplate } from "./RoadmapTemplate";
import ReactMarkdown from "react-markdown";
import { handleFreeText, handlePriorityFreeText } from "../services/freeTextHandler";
import { askGemini } from "../services/geminiService";
import { askGroq } from "../services/groqService";
import { resolveCareerQuestion } from "../services/careerQuestionResolver";
import { resolveComparison, resolveComparisonSide } from '../services/comparisonEngine';

// Enrich career data once at module level
const enrichedCareerData = enrichCareerData(careerData);

// Flat list of all careers for the question resolver
const ALL_CAREERS = Object.values(enrichedCareerData).flatMap(cat => Object.values(cat).flat());

// Dev-time warning for missing HF key
if (!process.env.REACT_APP_HF_API_KEY) {
  console.warn('[Chatbot] REACT_APP_HF_API_KEY not set — Hugging Face NLP pipeline disabled. Groq/Gemini fallbacks will handle queries.');
}

// Memoized message bubble — only re-renders when its own text/sender changes.
// Prevents the entire message list from re-rendering on every new message.
const MessageBubble = React.memo(({ sender, text }) => (
  <div className={`chat-bubble ${sender}`}>
    <ReactMarkdown>{text}</ReactMarkdown>
  </div>
));
MessageBubble.displayName = 'MessageBubble';

const Chatbot = ({ onFieldChange }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("chatbot_state");
    // Add version check to prevent stale state issues
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.stateVersion === 1) return parsed;
      } catch (e) { console.warn("Failed to parse chatbot_state"); }
    }
    return {
      stateVersion: 1, step: 'class', selectedCareer: null, pausedStep: null,
      awaitingResume: false, isQuizMode: false, quizIndex: 0,
      quizScores: { Science: 0, Commerce: 0, Arts: 0 }, language: 'en',
      lastShownId: null, lastComparison: null,
    };
  });

  const roadmapRef = useRef(null);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbot_messages");
    if (saved) return JSON.parse(saved);
    const lang = (() => { try { return JSON.parse(localStorage.getItem("chatbot_state"))?.language || 'en'; } catch { return 'en'; } })();
    return [
      { sender: "bot", text: getTranslation(lang, 'welcomeMsg1') },
      { sender: "bot", text: getTranslation(lang, 'welcomeMsg2') },
      { sender: "bot", text: getTranslation(lang, 'welcomeMsg3') },
    ];
  });

  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [typing, setTyping] = useState(false);
  const [suggestedCareers, setSuggestedCareers] = useState([]);
  const [detailTab, setDetailTab] = useState('info');
  const chatEndRef = useRef(null);
  const lang = state.language;
  const t = (key) => getTranslation(lang, key);

  const loc = (field) => {
    if (!field) return '';
    if (typeof field === 'object' && (field.en !== undefined || field.kn !== undefined)) return field[lang] || field.en || '';
    return field;
  };

  // Debounce timers for localStorage — avoids blocking the main thread on every render
  const msgSaveTimer = useRef(null);
  const stateSaveTimer = useRef(null);

  useEffect(() => {
    clearTimeout(msgSaveTimer.current);
    msgSaveTimer.current = setTimeout(() => {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    }, 800);
  }, [messages]);

  useEffect(() => {
    clearTimeout(stateSaveTimer.current);
    stateSaveTimer.current = setTimeout(() => {
      localStorage.setItem("chatbot_state", JSON.stringify(state));
    }, 800);
  }, [state]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const addBotMessage = useCallback((text, delay = 500) => {
    setTyping(true);
    setTimeout(() => { setMessages(prev => [...prev, { sender: "bot", text }]); setTyping(false); }, delay);
  }, []);

  const addUserMessage = useCallback((text) => setMessages(prev => [...prev, { sender: "user", text }]), []);

  const handleClassClick = (cls) => {
    addUserMessage(cls === "10" ? t('class10') : t('class12'));
    setState(prev => ({ ...prev, step: 'stream', selectedClass: cls }));
    setTimeout(() => { addBotMessage(cls === "10" ? t('classPrompt10') : t('classPrompt12')); }, 400);
  };

  const handleStreamClick = (streamKey) => {
    onFieldChange(streamKey);
    if (state.selectedClass === "10") {
      const data = educationData.class10[streamKey];
      const name = loc(data.name);
      addUserMessage(name);
      setTimeout(() => {
        addBotMessage(`${t('infoAbout')} ${name}:`);
        addBotMessage(`${t('subjectsList')}: ${loc(data.subjects)}`, 800);
        addBotMessage(`${t('suitableFor')}: ${loc(data.suitableFor)}`, 1600);
        addBotMessage(`${t('flexibility')}: ${loc(data.flexibility)}`, 2400);
        setState(prev => ({ ...prev, step: 'result' }));
      }, 400);
    } else {
      addUserMessage(streamKey.replace(/([A-Z])/g, ' $1').trim().toUpperCase());
      setTimeout(() => {
        addBotMessage(t('careerPrompt'));
        setState(prev => ({ ...prev, step: 'careerSelect', selectedStreamKey: streamKey }));
      }, 400);
    }
  };

  const getCareersForStream = (streamKey) => {
    const path = educationData.class12[streamKey].split('.');
    return enrichedCareerData[path[0]][path[1]];
  };

  const handleCareerClick = (career) => {
    const careerName = loc(career.name);
    addUserMessage(careerName);
    setSuggestedCareers([]);
    setDetailTab('info');
    setState(prev => ({ ...prev, step: 'careerDetail', selectedCareer: career }));
    setTimeout(() => {
      addBotMessage(t('careerDetailPrompt').replace('{careerName}', careerName));
      if (career.detailedDescription) {
        addBotMessage(`${t('detailedAbout')}: ${loc(career.detailedDescription)}`, 1000);
      }
    }, 400);
  };

  const handleDownloadRoadmap = async () => {
    if (!state.selectedCareer || !roadmapRef.current) return;

    setIsProcessing(true); // Show typing/loading
    const success = await generateRoadmap(roadmapRef.current, "Student");
    setIsProcessing(false);

    if (success) {
      addBotMessage(t('roadmapGenerated'));
    } else {
      addBotMessage(t('pdfError'));
    }
  };

  const startQuiz = () => {
    setState(prev => ({ ...prev, isQuizMode: true, quizIndex: 0, quizScores: { Science: 0, Commerce: 0, Arts: 0 } }));
    addBotMessage(t('quizStart'));
  };

  const handleQuizAnswer = (weights) => {
    const newScores = { ...state.quizScores };
    Object.keys(weights).forEach(k => { newScores[k] += weights[k]; });
    if (state.quizIndex + 1 < quizData.questions.length) {
      setState(prev => ({ ...prev, quizIndex: prev.quizIndex + 1, quizScores: newScores }));
    } else {
      const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      const winnerKey = winner === "Science" ? "sciencePCM" : winner === "Commerce" ? "commerceMaths" : "arts";
      const winnerLabel = lang === 'kn' ? (winner === "Science" ? "ವಿಜ್ಞಾನ" : winner === "Commerce" ? "ವಾಣಿಜ್ಯ" : "ಕಲೆ") : winner;
      setState(prev => ({ ...prev, isQuizMode: false, quizScores: newScores }));
      setTimeout(() => {
        addBotMessage(
          t('quizResultScore')
            .replace('{s}', newScores.Science)
            .replace('{c}', newScores.Commerce)
            .replace('{a}', newScores.Arts)
        );
        addBotMessage(t('quizAligned').replace('{stream}', winnerLabel), 1000);
        setTimeout(() => {
          addBotMessage(t('quizExplore').replace('{stream}', winnerLabel));
          onFieldChange(winnerKey);
          setTimeout(() => { addBotMessage(t('quizCareerList')); setState(prev => ({ ...prev, step: 'careerSelect', selectedStreamKey: winnerKey })); }, 1000);
        }, 2200);
      }, 500);
    }
  };

  const handleSuggestionClick = (career) => { handleCareerClick(career); };

  const handleInterestInput = (userText) => {
    const ids = detectInterestsFromText(userText);
    if (ids.length === 0) {
      addBotMessage(t('interestNone'));
      return false;
    }
    const careers = findCareersByIds(enrichedCareerData, ids);
    setSuggestedCareers(careers);
    addBotMessage(t('interestPrompt'));
    return true;
  };

  const showCareerDetail = (type) => {
    const career = state.selectedCareer;
    const map = {
      salary: [t('salaryLabel'), career.salary],
      workLife: [t('workLifeLabel'), career.workLife],
      growth: [t('growthLabel'), career.jobGrowth],
      day: [t('dayLabel'), career.dayInLife],
      challenges: [t('challengesLabel'), career.challenges],
      resources: [t('resourcesLabel'), career.resources?.join(", ")],
      entrance: [t('entranceLabel'), career.entrance?.join(", ")],
      eligibility: [t('eligibilityLabel'), career.eligibility],
      duration: [t('durationLabel'), career.duration],
      backupOptions: [t('backupLabel'), career.backupOptions?.join(", ")],
      topCompanies: [t('topCompanies'), career.topCompanies?.join(" | ")],
      futureOutlook: [t('futureOutlook'), loc(career.futureOutlook)],
    };
    const [label, value] = map[type] || ['', t('detailPrefix')];
    addBotMessage(label ? `${label}: ${value || '—'}` : value);
  };

  const showRelatedCareers = () => {
    const career = state.selectedCareer;
    if (!career?.relatedCareers?.length) { addBotMessage(t('noRelatedCareers')); return; }
    const related = findCareersByIds(enrichedCareerData, career.relatedCareers);
    setSuggestedCareers(related);
    addBotMessage(t('relatedCareers'));
  };

  const goBack = () => {
    onFieldChange("default");
    setSuggestedCareers([]);
    setState(prev => ({ ...prev, step: prev.step === 'careerDetail' ? 'careerSelect' : 'stream', selectedCareer: null }));
    addBotMessage(t('returningToPrev'));
  };

  const restartChat = () => {
    onFieldChange("default");
    setSuggestedCareers([]);
    localStorage.removeItem("chatbot_messages");
    localStorage.removeItem("chatbot_state");
    setMessages([{ sender: "bot", text: getRandomResponse('restart', lang) }]);
    setState({ step: 'class', selectedClass: null, selectedStreamKey: null, selectedCareer: null, language: state.language });
  };

  const handleComparison = (n1, n2) => {
    const find = (name) => { for (const cat of Object.values(enrichedCareerData)) for (const sub of Object.values(cat)) { const c = sub.find(x => loc(x.name).toLowerCase().includes(name.toLowerCase())); if (c) return c; } return null; };
    const c1 = find(n1), c2 = find(n2);
    if (c1 && c2) {
      addBotMessage(t('compareResult')
        .replace('{c1}', loc(c1.name)).replace('{c2}', loc(c2.name))
        .replace('{s1}', c1.salary).replace('{s2}', c2.salary)
        .replace('{g1}', c1.jobGrowth).replace('{g2}', c2.jobGrowth)
        .replace('{w1}', c1.workLife).replace('{w2}', c2.workLife)
      );
    } else { addBotMessage(t('compareNotFound')); }
  };

  const toggleVoiceInput = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { addBotMessage(t('voiceNoSupport')); return; }
    const r = new SR(); r.lang = lang === 'kn' ? 'kn-IN' : 'en-IN'; r.start();
    addBotMessage(t('listening'));
    r.onresult = (e) => { const tx = e.results[0][0].transcript; setInputText(tx); addBotMessage(t('heard').replace('{transcript}', tx)); };
    r.onerror = () => addBotMessage(t('voiceError'));
  };

  const processIntents = (detected) => {
    const top = detected[0];
    if (top.intent === 'restart') { restartChat(); return; }
    if (top.intent === 'continue_flow' && state.awaitingResume) {
      setState(prev => ({ ...prev, step: prev.pausedStep, pausedStep: null, awaitingResume: false }));
      addBotMessage(t('continueMsg')); return;
    }
    if (top.intent === 'doubt_clarification') {
      const dt = top.type || 'generic_doubt', dr = doubtResponses[dt];
      const resp = dr?.[lang] || dr?.en || doubtResponses.generic_doubt.en;
      setState(prev => ({ ...prev, pausedStep: prev.pausedStep || prev.step, awaitingResume: true }));
      addBotMessage(resp);
      setTimeout(() => addBotMessage(t('continuePrompt')), 1000); return;
    }
    if (state.awaitingResume) { addBotMessage(t('awaitingResumeMsg')); return; }
    if (top.intent === 'class_selection' && state.step === 'class') { handleClassClick(top.value); return; }
    if (top.intent === 'stream_selection') {
      if (state.step === 'class') { addUserMessage(t('class12')); setState(prev => ({ ...prev, selectedClass: "12", step: 'stream' })); setTimeout(() => handleStreamClick(top.value), 500); }
      else if (state.step === 'stream') handleStreamClick(top.value);
      else addBotMessage(t('notedMomment'));
      return;
    }
    if (top.intent === 'career_question' && state.step === 'careerDetail') { showCareerDetail(top.value); return; }
    if (top.intent === 'career_question') {
      if (top.value) { addBotMessage(t('careerInfoPrefix').replace('{detail}', top.value)); }
      else { addBotMessage(getRandomResponse('fallback', lang)); }
      return;
    }
    if (top.intent === 'help') { addBotMessage(getRandomResponse('help', lang)); return; }
    if (top.intent === 'greeting') { addBotMessage(getRandomResponse('greeting', lang)); return; }
    if (top.intent === 'thank_you') { addBotMessage(getRandomResponse('thank_you', lang)); return; }
    if (top.intent === 'goodbye') { addBotMessage(getRandomResponse('farewell', lang)); return; }
    addBotMessage(getRandomResponse('fallback', lang));
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    const userText = inputText.trim();
    // Capture current messages snapshot BEFORE addUserMessage updates state
    // so we can pass accurate history to Groq/Gemini
    const currentMessages = messages;
    addUserMessage(userText);
    setInputText("");
    setIsProcessing(true);
    const lower = userText.toLowerCase().trim();

    // ── 0. Contextual "Yes" / follow-up handler
    if (/^(yes|yeah|yep|sure|ok|okay|tell me more|details|go on)\b/i.test(lower) && state.lastShownId) {
      const career = ALL_CAREERS.find(c => c.id === state.lastShownId);
      if (career) { handleCareerClick(career); setIsProcessing(false); return; }
    }

    // ── 0.3. Comparison follow-up reply handler
    // After showing a comparison table, if the user types a preference like
    // "treating patients" or "coding", detect the leaning and show that career.
    if (state.lastComparison) {
      const leanedCareer = resolveComparisonSide(userText, state.lastComparison);
      if (leanedCareer) {
        const career = ALL_CAREERS.find(c => c.id === leanedCareer);
        if (career) {
          setState(prev => ({ ...prev, lastComparison: null }));
          addBotMessage(`Great choice! Let me show you what a career in **${career.name?.en || career.name}** looks like.`);
          setTimeout(() => handleCareerClick(career), 800);
          setIsProcessing(false);
          return;
        }
      }
    }

    // ── 0.5. Bare detail keyword + context handler
    // If user types just "salary", "growth", "day", etc. as a follow-up after we
    // already showed them a career (lastShownId is set), answer with that career's data.
    // This prevents "salary" from being swallowed by the generic salary_anxiety topic.
    if (state.lastShownId) {
      const detailKeyFromText = detectCareerDetailIntent(userText);
      if (detailKeyFromText) {
        const contextCareer = ALL_CAREERS.find(c => c.id === state.lastShownId);
        if (contextCareer) {
          // Import buildResponse-equivalent by calling resolveCareerQuestion with the
          // career name injected so it can match and serve the detail.
          const syntheticQuery = `${detailKeyFromText} for ${contextCareer.name?.en || contextCareer.name}`;
          const contextResult = resolveCareerQuestion(syntheticQuery, ALL_CAREERS, lang);
          if (contextResult) {
            addBotMessage(contextResult.response);
            if (contextResult.followUp) setTimeout(() => addBotMessage(contextResult.followUp), 1200);
            setIsProcessing(false);
            return;
          }
        }
      }
    }

    // ── 0.9. Priority free-text topics (must beat career resolver)
    // Catches mental health, exam prep, thank-you, government jobs, distance study
    // BEFORE the career resolver can intercept their keywords.
    const priorityResult = handlePriorityFreeText(userText, lang);
    if (priorityResult) {
      addBotMessage(priorityResult.response);
      if (priorityResult.followUp) setTimeout(() => addBotMessage(priorityResult.followUp), 1200);
      setIsProcessing(false);
      return;
    }

    // ── 1. Comparison / suitability engine (RUNS FIRST)
    // Handles: "should I take engineering or medical", "CS vs CA", "will medicine suit me"
    // Must run before careerQuestionResolver so two-career queries get a table, not a
    // single-career info card (e.g. "engineering or medical" would otherwise resolve to
    // just "Core Engineering").
    const compResult = resolveComparison(userText, lang);
    if (compResult) {
      addBotMessage(compResult.response);
      // Store which comparison was shown so we can handle the follow-up reply
      setState(prev => ({ ...prev, lastComparison: compResult.comparisonKey, lastShownId: null }));
      if (compResult.followUp) setTimeout(() => addBotMessage(compResult.followUp), 1200);
      setIsProcessing(false);
      return;
    }

    // ── 1.2. Career question resolver
    // Handles any question about a single named career (salary, growth, day, exams, etc.)
    // Runs after comparison engine so two-career queries are already handled above.
    const careerResult = resolveCareerQuestion(userText, ALL_CAREERS, lang);
    if (careerResult) {
      addBotMessage(careerResult.response);
      if (careerResult.followUp) setTimeout(() => addBotMessage(careerResult.followUp), 1200);

      // Update context
      const matchedId = ALL_CAREERS.find(c => c.name?.en === careerResult.careerName || c.id === careerResult.careerName)?.id;
      if (matchedId) setState(prev => ({ ...prev, lastShownId: matchedId }));

      setIsProcessing(false);
      return;
    }

    // ── 1.5. Free text semantic handler
    // Handles parental pressure, abroad, generic salary anxiety, job market, arts stigma, etc.
    // Runs AFTER career resolver so named-career queries get specific answers first.
    const freeResult = handleFreeText(userText, lang);
    if (freeResult) {
      addBotMessage(freeResult.response);
      if (freeResult.followUp) setTimeout(() => addBotMessage(freeResult.followUp), 1200);
      setIsProcessing(false);
      return;
    }

    // ── 2. Interest detection — works from any step
    if (looksLikeInterestStatement(userText)) {
      const handled = handleInterestInput(userText);
      if (handled) { setIsProcessing(false); return; }
    }

    // ── 3. Comparison
    if (lower.includes("compare")) {
      const parts = userText.replace(/compare/i, "").split(/\band\b|\bvs\b|,/i);
      if (parts.length >= 2) { handleComparison(parts[0].trim(), parts[1].trim()); setIsProcessing(false); return; }
    }

    // ── 4. Career-name entity carryover: if user types a career name in ANY step, jump to it
    if (state.step !== 'careerDetail') {
      for (const cat of Object.values(enrichedCareerData)) {
        for (const sub of Object.values(cat)) {
          const match = sub.find(c => {
            const name = loc(c.name).toLowerCase();
            return lower.includes(name.split('(')[0].trim()) && name.split('(')[0].trim().length > 3;
          });
          if (match) { handleCareerClick(match); setIsProcessing(false); return; }
        }
      }
    }

    // ── 5. Career select fuzzy match
    if (state.step === 'careerSelect' && state.selectedStreamKey) {
      const careers = getCareersForStream(state.selectedStreamKey);
      const matched = careers.find(c => { const n = loc(c.name).toLowerCase(); return lower.includes(n.split('(')[0].trim()) || n.includes(lower); });
      if (matched) { handleCareerClick(matched); setIsProcessing(false); return; }
    }

    // ── 6. Stream fuzzy match
    if (state.step === 'stream') {
      const ms = Object.keys(educationData.class12).find(s => lower.includes(s.toLowerCase()) || educationData.class12[s].toLowerCase().includes(lower));
      if (ms) { handleStreamClick(ms); setIsProcessing(false); return; }
    }

    // ── 7. Class match
    if (state.step === 'class') {
      if (/\b(10|ten)\b/i.test(lower)) { handleClassClick("10"); setIsProcessing(false); return; }
      if (/\b(12|twelve)\b/i.test(lower)) { handleClassClick("12"); setIsProcessing(false); return; }
    }

    // ── 8. Interest keywords from class/stream step (only for non-questions)
    const isQuestion = /^(should|is|are|can|will|what|which|how|why|do|does|would|could|when|where|was|were)\b/i.test(lower);
    if (!isQuestion && (state.step === 'class' || state.step === 'stream')) {
      const ids = detectInterestsFromText(userText);
      if (ids.length > 0) { handleInterestInput(userText); setIsProcessing(false); return; }
    }

    // ── 9. Fuzzy career detail detection (careerDetail step)
    if (state.step === 'careerDetail') {
      const fuzzyDetailKey = detectCareerDetailIntent(userText);
      if (fuzzyDetailKey) { showCareerDetail(fuzzyDetailKey); setIsProcessing(false); return; }
    }

    try {
      const [intentResult, sentimentResult] = await Promise.all([classifyIntent(userText), getSentiment(userText)]);
      const entities = mapEntitiesToState([], userText); // Removed NER API call
      const { action, originalIntent, confidence, detailKey } = mapIntentToAction(intentResult);

      // HF directly resolved a career detail intent
      if (action === "career_detail_direct" && confidence > 0.35) {
        if (state.step === 'careerDetail') {
          showCareerDetail(detailKey);
        } else {
          addBotMessage(t('careerInfoPrefix').replace('{detail}', detailKey));
        }
        setIsProcessing(false);
        return;
      }

      const guidance = getGuidance(originalIntent, entities, state.step, lang);
      let finalBotResponse = guidance.baseResponse;
      if (confidence > 0.45 && lang === 'en') finalBotResponse = await paraphraseResponse(guidance.baseResponse, entities);
      if (sentimentResult) {
        const top = [...sentimentResult].sort((a, b) => b.score - a.score)[0];
        if (top.label === "NEGATIVE" && top.score > 0.8) addBotMessage(t('sentimentNegative'));
        else if (top.label === "POSITIVE" && top.score > 0.9) addBotMessage(t('sentimentPositive'));
      }
      if (action === "greeting") addBotMessage(getRandomResponse('greeting', lang));
      else if (action === "restart") restartChat();
      else if (entities.class && state.step === 'class') handleClassClick(entities.class);
      else if (entities.stream && state.step === 'stream') handleStreamClick(entities.stream);
      else if (originalIntent === "stream_confusion" || originalIntent === "exam_doubt" || action === "career_question") {
        // Only show local guidance — do NOT also call AI fallback to avoid duplicate messages
        addBotMessage(finalBotResponse);
        setTimeout(() => addBotMessage(guidance.followUp), 1200);
      } else {
        // AI Fallback priority: Groq > Gemini > Local Fallback
        // Pass current context so AI knows what the user is looking at
        const aiContext = {
          step: state.step,
          career: state.selectedCareer?.name?.en || null,
        };
        // Show typing indicator while AI is thinking
        setTyping(true);
        // Use currentMessages (pre-send snapshot) so history is accurate
        const aiResp = await askGroq(userText, currentMessages, aiContext) || await askGemini(userText, currentMessages, aiContext);
        setTyping(false);
        if (aiResp) addBotMessage(aiResp, 0);
        else { const detected = detectIntents(userText); processIntents(detected); }
      }
    } catch (error) {
      console.error('Main AI pipe failed:', error);
      // Main NLP pipe failed — try smart AI fallback before falling back to local regex
      try {
        const aiContext = { step: state.step, career: state.selectedCareer?.name?.en || null };
        setTyping(true);
        const aiResp = await askGroq(userText, currentMessages, aiContext) || await askGemini(userText, currentMessages, aiContext);
        setTyping(false);
        if (aiResp) { addBotMessage(aiResp, 0); setIsProcessing(false); return; }
      } catch (aiError) {
        setTyping(false);
        console.error('Full AI failure:', aiError);
      }
      const detected = detectIntents(userText);
      processIntents(detected);
    } finally { setIsProcessing(false); }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <span>{t('header')}</span>
        <button onClick={() => setState(s => ({ ...s, language: s.language === 'en' ? 'kn' : 'en' }))} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>
          {t('toggle')}
        </button>
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
        {typing && (
          <div className="chat-bubble bot typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="options">
        {/* --- Suggested Careers (from interest engine) --- */}
        {suggestedCareers.length > 0 && (
          <div style={{ width: '100%', marginBottom: '8px' }}>
            <p style={{ fontSize: '0.7rem', opacity: 0.6, textAlign: 'center', marginBottom: '6px' }}>
              {t('suggestedTitle')}
            </p>
            {suggestedCareers.map(c => (
              <button key={c.id} className="option-card" style={{ background: 'rgba(124,58,237,0.2)', borderColor: 'rgba(124,58,237,0.5)', width: '100%', marginBottom: '4px' }} onClick={() => handleSuggestionClick(c)}>
                {loc(c.name)}
              </button>
            ))}
            <button className="back-btn" style={{ width: '100%', marginTop: '4px' }} onClick={() => setSuggestedCareers([])}>
              {t('backToClassBtn')}
            </button>
          </div>
        )}

        {/* --- Class Step --- */}
        {state.step === 'class' && !state.isQuizMode && suggestedCareers.length === 0 && (
          <div className="button-row">
            {["10", "12"].map(cls => (
              <button key={cls} onClick={() => handleClassClick(cls)}>{cls === "10" ? t('class10') : t('class12')}</button>
            ))}
          </div>
        )}

        {/* --- Stream Step --- */}
        {state.step === 'stream' && suggestedCareers.length === 0 && (
          <div className="button-row">
            {Object.keys(state.selectedClass === "10" ? educationData.class10 : educationData.class12).map(sk => (
              <button key={sk} className="option-card" onClick={() => handleStreamClick(sk)}>
                {state.selectedClass === "10" ? loc(educationData.class10[sk].name) : sk.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
              </button>
            ))}
            <button className="back-btn" onClick={restartChat} style={{ width: '100%', marginTop: '4px' }}>{t('changeClass')}</button>
          </div>
        )}

        {/* --- Career Select Step --- */}
        {state.step === 'careerSelect' && (
          <div className="button-row">
            {getCareersForStream(state.selectedStreamKey).map(c => (
              <button key={c.id} className="option-card" onClick={() => handleCareerClick(c)}>{loc(c.name)}</button>
            ))}
            <button className="back-btn" onClick={goBack} style={{ width: '100%', marginTop: '4px' }}>{t('changeStream')}</button>
          </div>
        )}

        {/* --- Career Detail Step: Tabbed --- */}
        {state.step === 'careerDetail' && (() => {
          const tabs = [
            { id: 'info', label: t('infoTab') },
            { id: 'req', label: t('reqTab') },
            { id: 'outlook', label: t('outlookTab') },
            { id: 'act', label: t('moreTab') },
          ];
          return (
            <>
              {/* Tab selector row */}
              <div className="detail-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`detail-tab${detailTab === tab.id ? ' active' : ''}`}
                    onClick={() => setDetailTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <hr className="tab-divider" />

              {/* Tab content */}
              <div className="detail-grid">
                {detailTab === 'info' && (
                  <>
                    <button onClick={() => showCareerDetail('salary')}>{t('salaryBtn')}</button>
                    <button onClick={() => showCareerDetail('workLife')}>{t('workLifeBtn')}</button>
                    <button onClick={() => showCareerDetail('growth')}>{t('growthBtn')}</button>
                    <button onClick={() => showCareerDetail('day')}>{t('dayBtn')}</button>
                    <button onClick={() => showCareerDetail('challenges')}>{t('challengesBtn')}</button>
                  </>
                )}
                {detailTab === 'req' && (
                  <>
                    <button onClick={() => showCareerDetail('eligibility')}>{t('eligibilityBtn')}</button>
                    <button onClick={() => showCareerDetail('entrance')}>{t('entranceBtn')}</button>
                    <button onClick={() => showCareerDetail('duration')}>{t('durationBtn')}</button>
                    <button onClick={() => showCareerDetail('resources')}>{t('resourcesBtn')}</button>
                    <button onClick={() => showCareerDetail('backupOptions')}>{t('backupBtn')}</button>
                  </>
                )}
                {detailTab === 'outlook' && (
                  <>
                    <button onClick={() => showCareerDetail('topCompanies')} style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.25)' }}>{t('topCompanies')}</button>
                    <button onClick={() => showCareerDetail('futureOutlook')} style={{ background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.25)' }}>{t('futureOutlook')}</button>
                    <button onClick={showRelatedCareers} style={{ background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.25)' }}>{t('relatedCareers')}</button>
                  </>
                )}
              </div>

              {detailTab === 'act' && (
                <div className="button-row">
                  {lang === 'en' && (
                    <button className="option-card" onClick={handleDownloadRoadmap} style={{ background: 'rgba(16,185,129,0.2)', borderColor: 'rgba(16,185,129,0.3)', width: '100%' }}>{t('downloadRoadmap')}</button>
                  )}
                  <button className="back-btn" onClick={goBack} style={{ width: '100%' }}>{t('backToList')}</button>
                  <button className="restart-btn" onClick={restartChat} style={{ width: '100%' }}>{t('startFresh')}</button>
                </div>
              )}
            </>
          );
        })()}

        {/* --- Quiz --- */}
        {state.isQuizMode && (
          <div className="quiz-container" style={{ width: '100%', padding: '10px' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '10px', textAlign: 'center' }}>
              {t('quizQuestionCount').replace('{index}', state.quizIndex + 1).replace('{total}', quizData.questions.length)}
            </p>
            <h4 style={{ marginBottom: '15px', color: '#e2e8f0', textAlign: 'center' }}>{quizData.questions[state.quizIndex].question[lang]}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quizData.questions[state.quizIndex].options.map((opt, i) => (
                <button key={i} onClick={() => handleQuizAnswer(opt.weights)} className="option-card" style={{ width: '100%', padding: '12px' }}>
                  {opt.text[lang]}
                </button>
              ))}
            </div>
          </div>
        )}

        {!state.isQuizMode && state.step === 'class' && (
          <button className="option-card" style={{ background: 'rgba(124,58,237,0.2)', borderColor: 'rgba(124,58,237,0.4)', marginTop: '10px' }} onClick={startQuiz}>
            {t('notSure')}
          </button>
        )}

        {state.step === 'result' && (
          <>
            <button className="back-btn" onClick={goBack}>{t('changeStream')}</button>
            <button className="restart-btn" onClick={restartChat}>{t('startFresh')}</button>
          </>
        )}
      </div>

      <form className="chat-input-form" onSubmit={handleTextSubmit}>
        <input type="text" className="chat-input" value={inputText} onChange={e => setInputText(e.target.value)} placeholder={t('placeholder')} />
        <button type="button" className="voice-btn" onClick={toggleVoiceInput} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.6 }}>🎤</button>
        <button type="submit" className="send-btn">{t('send')}</button>
      </form>

      {/* Hidden container for PDF capture - English Only to prevent layout bugs */}
      {lang === 'en' && (
        <div style={{ position: 'absolute', left: '-9999px', top: '0', zIndex: -1 }}>
          <div ref={roadmapRef}>
            {state.selectedCareer && (
              <RoadmapTemplate userData={{
                name: "Student",
                selectedClass: state.selectedClass,
                selectedStream: state.selectedStreamKey,
                career: state.selectedCareer,
                lang
              }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
