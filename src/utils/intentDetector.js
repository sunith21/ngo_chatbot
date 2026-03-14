import { detectCareerDetailIntent, isQuestion } from './fuzzyMatcher';

const INTENTS = {
    restart: 5,
    class_selection: 4,
    stream_selection: 4,
    career_question: 3,
    doubt_clarification: 3,
    continue_flow: 4.5,
    help: 2,
    greeting: 1,
    fallback: 0
};

export const detectIntents = (text) => {
    const normalizedText = text.toLowerCase().trim();
    const detected = [];

    // 1. Restart
    if (/\b(start over|restart|reset|begin again|start fresh)\b/i.test(normalizedText)) {
        detected.push({ intent: 'restart', priority: INTENTS.restart });
    }

    // 2. Class Selection
    const classMatch = normalizedText.match(/\b(10|12)(th)?\b/i) || normalizedText.match(/\b(ten|twelve)\b/i);
    if (classMatch) {
        let cls = classMatch[1] || classMatch[0];
        if (cls === 'ten') cls = '10';
        if (cls === 'twelve') cls = '12';
        if (['10', '12'].includes(cls)) {
            detected.push({ intent: 'class_selection', priority: INTENTS.class_selection, value: cls });
        }
    }

    // 3. Stream Selection
    const streamPatterns = {
        sciencePCM: /\b(pcm|non-medical|physics.*(maths|math)|engineering stream|physics chemistry maths)\b/i,
        sciencePCB: /\b(pcb|medical|biology|physics chemistry bio|studied biology)\b/i,
        commerceMaths: /\b(commerce.*(with|integrated).*maths|maths.*commerce)\b/i,
        commerceNoMaths: /\b(commerce.*(without|no).*maths)\b/i,
        arts: /\b(arts|humanities|social science|history|pol.*sci)\b/i,
        vocational: /\b(vocational|skill-based|diploma|iti|media|animation|marketing)\b/i,
        government: /\b(government|upsc|ssc|banking|civil service|ias|ips)\b/i
    };
    for (const [stream, regex] of Object.entries(streamPatterns)) {
        if (regex.test(normalizedText)) {
            detected.push({ intent: 'stream_selection', priority: INTENTS.stream_selection, value: stream });
        }
    }

    // 4. ── Smart Career Detail Detection ──────────────────────────────────────
    // First try sentence-level & fuzzy matching (handles typos + natural language)
    const detailKey = detectCareerDetailIntent(normalizedText);
    if (detailKey) {
        detected.push({ intent: 'career_question', priority: INTENTS.career_question + 0.5, value: detailKey });
    }

    // 5. Doubt / confusion patterns — comprehensive student-facing topics
    const doubtPatterns = {
        exam_failure: /\b(fail|dont crack|not clear|not qualify|not pass|failed|drop).*(neet|jee|exam|test|bank|upsc|entrance)\b/i,
        field_switching: /\b(switch|change|shift|wrong|regret).*(field|stream|career|choice|path|branch)\b/i,
        difficulty_query: /\b(is|are).*(hard|difficult|tough|challenging|stressful|worth)\b/i,
        exam_info: /\b(what|which).*(exams|entrance|test|form|notification|appear|needed)\b/i,
        commerce_without_maths: /\b(commerce.*(without|no).*maths.*good|scope.*commerce.*no.*maths)\b/i,
        parental_pressure: /\b(parents|family|mom|dad|father|mother|forc|pressure|they want me|nagging)\b/i,
        abroad_opportunities: /\b(abroad|foreign|overseas|international|usa|uk|canada|germane|migrate|ms degree)\b/i,
        salary_concern: /\b(money|salary|earn|income|rich|highest paying|afford|fee|scholarship|loan)\b/i,
        job_market: /\b(scope|future scope|job market|unemployed|placement|demand|job security|hiring|stable)\b/i,
        peer_comparison: /\b(my friends|classmates|peers|everyone else|falling behind|not smart|not good enough|comparison|rank)\b/i,
        arts_stigma: /\b(arts (bad|useless|no scope)|humanities scope|is arts good|no future in arts)\b/i,
        gap_year: /\b(gap year|taking a break|year off|drop year|dropper|repeat year)\b/i,
        startup_interest: /\b(startup|own business|entrepreneur|self.?employ|business idea|freelance|be my own boss)\b/i,
        // ── NEW ────────────────────────────────────────────────────────────────
        mental_health: /\b(stressed out|burnt out|burnout|anxiety|anxious|overwhelmed|can'?t cope|feeling low|hopeless|lost motivation|no motivation|exam fear|exam anxiety|fear of failure|depressed|mental health|tired of studying)\b/i,
        score_based: /\b(got \d+%|my marks|my score|low marks|scored \d+|marks are low|failed in|board result|result out)\b/i,
    };
    for (const [type, regex] of Object.entries(doubtPatterns)) {
        if (regex.test(normalizedText)) {
            detected.push({ intent: 'doubt_clarification', priority: INTENTS.doubt_clarification + 1, type });
        }
    }
    if (!detected.some(d => d.intent === 'doubt_clarification')) {
        if (/\b(confused|not sure|help me|don't know|can't decide|stuck|guidance|doubts|question|what should i|which is better)\b/i.test(normalizedText)) {
            detected.push({ intent: 'doubt_clarification', priority: INTENTS.doubt_clarification });
        }
    }

    // 6. Flow Control
    if (/\b(yes|continue|proceed|let's go|go ahead|resume|ok|sure|yep|yeah)\b/i.test(normalizedText)) {
        detected.push({ intent: 'continue_flow', priority: INTENTS.continue_flow });
    }

    // 7. Help
    if (/\b(help|what can you do|how to use|capabilities)\b/i.test(normalizedText)) {
        detected.push({ intent: 'help', priority: INTENTS.help });
    }

    // 8. Greeting
    if (/\b(hi|hello|hey|howdy|sup|namaste|good morning|good afternoon|good evening|how are you|how r u|what's up|whats up|heyy)\b/i.test(normalizedText)) {
        detected.push({ intent: 'greeting', priority: INTENTS.greeting });
    }

    // 9. Thank you
    if (/\b(thank you|thanks|thank u|thx|ty|grateful|appreciate|that helped|so helpful|nicely explained|good bot)\b/i.test(normalizedText)) {
        detected.push({ intent: 'thank_you', priority: 3.5 });
    }

    // 10. Goodbye / farewell
    if (/\b(bye|goodbye|good bye|see you|see ya|gotta go|talk later|cya|take care|ttyl|have to go)\b/i.test(normalizedText)) {
        detected.push({ intent: 'goodbye', priority: 3.5 });
    }

    // 9. When no intent matched and it looks like a question — try to extract detail
    if (detected.length === 0 && isQuestion(normalizedText)) {
        // If it's a general question we couldn't match, treat as vague career_question
        detected.push({ intent: 'career_question', priority: 1, value: null });
    }

    if (detected.length === 0) {
        return [{ intent: 'fallback', priority: INTENTS.fallback }];
    }

    return detected.sort((a, b) => b.priority - a.priority);
};
