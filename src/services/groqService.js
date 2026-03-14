/**
 * groqService.js
 *
 * Calls Groq's free API (Llama 3.3 70B) as a smart AI fallback.
 * Groq is free, requires no credit card, and is extremely fast.
 *
 * Get your free key at: https://console.groq.com
 * Then add to .env: REACT_APP_GROQ_API_KEY=gsk_...
 *
 * Free tier limits: 30 req/min, 6000 req/day, 6000 tokens/req
 */

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const BASE_SYSTEM_PROMPT = `You are a warm, encouraging career counselor assistant for Indian students in Class 10-12.
Your goal is to help students make confident decisions about their academic streams and career paths.

Guidelines:
- Be concise: 3-6 sentences max, warm and encouraging in tone.
- Focus on Indian education: PCM, PCB, Commerce, Arts streams; JEE, NEET, UPSC, CLAT, CAT, CA exams; IITs, IIMs, AIIMS, NLUs colleges.
- Use Indian salary format (LPA — Lakhs Per Annum).
- End every response with one engaging follow-up question.
- Be honest about challenges while staying positive.
- If asked about a career, mention: typical salary range, key entrance exams (if any), and job growth.
- Respond in the same language the student uses (English or Kannada).
- Keep it conversational, like talking to a trusted older sibling, not a textbook.
- Understand Indian-English phrases like "yaar", "kya karu", "paisa", "mummy daddy", "ghar wale", "accha".`;

/**
 * Builds the system prompt with optional context about the user's current state.
 */
function buildSystemPrompt(context = {}) {
    let prompt = BASE_SYSTEM_PROMPT;
    if (context.step) {
        prompt += `\n\nCurrent chatbot state: The student is at the "${context.step}" step.`;
    }
    if (context.career) {
        prompt += ` They are currently looking at the "${context.career}" career.`;
    }
    return prompt;
}

/**
 * Calls Groq API with user message and last few messages as context.
 * Returns response text or null on failure.
 *
 * @param {string} userMessage
 * @param {Array<{sender: string, text: string}>} recentMessages
 * @returns {Promise<string|null>}
 */
export async function askGroq(userMessage, recentMessages = [], context = {}) {
    if (!GROQ_API_KEY) {
        console.warn('[Groq] No API key set. Add REACT_APP_GROQ_API_KEY to .env');
        return null;
    }

    // Build conversation history (last 12 messages for rich context)
    const history = recentMessages.slice(-12).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
    }));

    const body = {
        model: 'llama-3.3-70b-versatile',
        messages: [
            { role: 'system', content: buildSystemPrompt(context) },
            ...history,
            { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
    };

    try {
        const fetchPromise = fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify(body),
        });

        const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 8000));
        const res = await Promise.race([fetchPromise, timeoutPromise]);

        if (!res) { console.warn('[Groq] Request timed out'); return null; }
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            console.error('[Groq] API error:', res.status, err?.error?.message);
            return null;
        }

        const data = await res.json();
        return data?.choices?.[0]?.message?.content?.trim() || null;

    } catch (e) {
        console.error('[Groq] Request failed:', e.message);
        return null;
    }
}
