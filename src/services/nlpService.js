const HF_API_KEY = process.env.REACT_APP_HF_API_KEY;
const API_BASE = "https://api-inference.huggingface.co/models";

// Resolves to null after `ms` milliseconds — used to cap slow HF API calls.
function withTimeout(promise, ms = 2000) {
    return Promise.race([
        promise,
        new Promise(resolve => setTimeout(() => resolve(null), ms)),
    ]);
}

const CANDIDATE_INTENTS = [
    "greeting",
    "class_10_guidance",
    "class_12_guidance",
    "stream_confusion",
    "exam_doubt",
    "career_interest",
    // Granular career detail intents
    "ask about salary or income",
    "ask about work life balance or stress",
    "ask about job growth or future prospects",
    "ask about daily tasks or day in life",
    "ask about challenges or difficulties",
    "ask about study resources or courses",
    "ask about entrance exams or admission",
    "ask about eligibility or requirements",
    "ask about duration or years",
    "ask about backup careers or alternatives",
    "ask about top companies or recruiters",
    "ask about future outlook or industry trends",
    "express confusion or need help choosing",
    "restart or start over",
    "fallback"
];

export async function getSentiment(text) {
    if (!HF_API_KEY) return null;

    try {
        const fetchPromise = fetch(`${API_BASE}/distilbert-base-uncased-finetuned-sst-2-english`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: text })
        }).then(r => r.ok ? r.json() : null).then(r => r?.[0] ?? null);

        return await withTimeout(fetchPromise, 2000);
    } catch {
        return null;
    }
}

export async function classifyIntent(text) {
    if (!HF_API_KEY) return null;

    try {
        const fetchPromise = fetch(`${API_BASE}/facebook/bart-large-mnli`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: text,
                parameters: { candidate_labels: CANDIDATE_INTENTS }
            })
        }).then(r => r.ok ? r.json() : null).then(r => r ? ({
            intent: r.labels?.[0] || "fallback",
            confidence: r.scores?.[0] || 0,
            allLabels: r.labels || [],
            allScores: r.scores || []
        }) : null);

        return await withTimeout(fetchPromise, 2000);
    } catch {
        return null;
    }
}

export function mapEntitiesToState(nerEntities, text) {
    const state = { class: null, stream: null, career: null, exam: null };
    const lowerText = text.toLowerCase();

    // Extract from NER entities (kept for backward compatibility if passed)
    if (Array.isArray(nerEntities)) {
        for (const entity of nerEntities) {
            const word = (entity.word || "").toLowerCase();
            if (/10|12|ten|twelve/.test(word)) {
                state.class = word.includes("10") || word === "ten" ? "10" : "12";
            }
        }
    }

    // Supplement with regex for Indian education-specific terms
    if (/\b(10th?|ten|class 10)\b/i.test(lowerText)) state.class = "10";
    if (/\b(12th?|twelve|class 12)\b/i.test(lowerText)) state.class = "12";

    if (/\b(pcm|non-medical|physics.*maths)\b/i.test(lowerText)) state.stream = "sciencePCM";
    if (/\b(pcb|medical|biology)\b/i.test(lowerText)) state.stream = "sciencePCB";
    if (/\b(commerce.*maths)\b/i.test(lowerText)) state.stream = "commerceMaths";
    if (/\b(commerce.*(without|no).*maths)\b/i.test(lowerText)) state.stream = "commerceNoMaths";
    if (/\b(arts|humanities)\b/i.test(lowerText)) state.stream = "arts";

    if (/\b(engineering|btech|software)\b/i.test(lowerText)) state.career = "engineering";
    if (/\b(medical|doctor|mbbs)\b/i.test(lowerText)) state.career = "medical";
    if (/\b(law|lawyer|advocate)\b/i.test(lowerText)) state.career = "law";
    if (/\b(design|designer|nid)\b/i.test(lowerText)) state.career = "design";

    if (/\b(jee)\b/i.test(lowerText)) state.exam = "JEE";
    if (/\b(neet)\b/i.test(lowerText)) state.exam = "NEET";
    if (/\b(cuet)\b/i.test(lowerText)) state.exam = "CUET";
    if (/\b(clat)\b/i.test(lowerText)) state.exam = "CLAT";
    if (/\b(upsc)\b/i.test(lowerText)) state.exam = "UPSC";

    return state;
}

export async function paraphraseResponse(baseResponse, context) {
    if (!HF_API_KEY) return baseResponse;

    try {
        const streamInfo = context.stream ? `student in ${context.stream}` : "student";
        const prompt = `Rewrite this career guidance in a friendly, empathetic, and encouraging tone. Keep the information accurate and concise. Input: "${baseResponse}" Context: Guidance for a ${streamInfo}.`;

        const fetchPromise = fetch(`${API_BASE}/google/flan-t5-base`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { max_length: 150, temperature: 0.7 }
            })
        }).then(r => r.ok ? r.json() : null).then(r => r?.[0]?.generated_text || null);

        return await withTimeout(fetchPromise, 2000) || baseResponse;
    } catch {
        return baseResponse;
    }
}

export function mapIntentToAction(intentResult) {
    if (!intentResult) return { action: "fallback", confidence: 0 };

    const { intent, confidence } = intentResult;

    // Direct career detail intent mapping from granular HF labels
    const granularDetailMap = {
        "ask about salary or income": "salary",
        "ask about work life balance or stress": "workLife",
        "ask about job growth or future prospects": "growth",
        "ask about daily tasks or day in life": "day",
        "ask about challenges or difficulties": "challenges",
        "ask about study resources or courses": "resources",
        "ask about entrance exams or admission": "entrance",
        "ask about eligibility or requirements": "eligibility",
        "ask about duration or years": "duration",
        "ask about backup careers or alternatives": "backupOptions",
        "ask about top companies or recruiters": "topCompanies",
        "ask about future outlook or industry trends": "futureOutlook",
    };

    if (granularDetailMap[intent]) {
        return {
            action: "career_detail_direct",
            detailKey: granularDetailMap[intent],
            originalIntent: intent,
            confidence,
        };
    }

    const intentMapping = {
        greeting: "greeting",
        class_10_guidance: "class_selection",
        class_12_guidance: "class_selection",
        stream_confusion: "doubt_clarification",
        exam_doubt: "doubt_clarification",
        career_interest: "career_question",
        "express confusion or need help choosing": "doubt_clarification",
        "restart or start over": "restart",
        fallback: "fallback"
    };

    return {
        action: intentMapping[intent] || "fallback",
        originalIntent: intent,
        confidence,
        classHint: intent === "class_10_guidance" ? "10" : intent === "class_12_guidance" ? "12" : null
    };
}
