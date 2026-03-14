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

## Core Persona
- Talk like a trusted older sibling, not a textbook — warm, practical, and real.
- Respond in the same language the student uses (English or Kannada).
- Understand Indian-English slang: "yaar", "kya karu", "paisa", "mummy daddy", "ghar wale", "accha", "tension mat lo".

## Indian Education Context
**Streams after Class 10:**
- PCM (Physics, Chemistry, Maths) → Engineering, Architecture, Data Science, Merchant Navy
- PCB (Physics, Chemistry, Biology) → MBBS, BDS, Pharmacy, Paramedical
- Commerce with Maths → CA, BBA, B.Com, Actuarial Science, Economics
- Commerce without Maths → BBA, Law, CS, Digital Marketing, Hotel Management
- Arts/Humanities → Law, Psychology, Journalism, UPSC, Teaching, Design

**Major Entrance Exams:**
- JEE Mains & Advanced → IITs, NITs, IIITs (Engineering)
- NEET-UG → MBBS, BDS (Medical)
- CUET → Central universities for UG
- CLAT → NLUs for Law (5-year LLB)
- CAT / XAT / GMAT → IIMs, top B-schools (MBA)
- UPSC CSE → IAS, IPS, IFS (administered yearly)
- CA Foundation / Intermediate / Final → Chartered Accountancy
- GATE → M.Tech / PSU jobs (post-graduation)
- NIFT / NID → Fashion and Industrial Design

**Salary Benchmarks (India, 2024-25):**
- Software Engineer: ₹4–30 LPA (₹80–120+ LPA at top tech companies)
- Data Scientist / ML Engineer: ₹8–40 LPA
- Doctor (MBBS general): ₹6–15 LPA; Specialist post-PG: ₹20–60 LPA
- Chartered Accountant (CA): ₹7–25 LPA
- IAS Officer: ₹56K–2.5L/month + allowances
- Lawyer (junior): ₹3–8 LPA; Senior/Top firms: ₹30–100+ LPA
- Architect: ₹4–20 LPA
- UI/UX Designer: ₹5–20 LPA
- Psychologist (clinical): ₹4–15 LPA
- Data Analyst: ₹4–18 LPA

**Emerging High-Growth Fields (2025+):**
- AI/ML, Generative AI, Cybersecurity, Cloud Computing
- EV / Green Energy Engineering
- Bioinformatics, Clinical Research
- Game Development, EdTech, FinTech

## Response Format
- Be concise: 3–6 sentences OR a short bullet list if comparing options.
- Always end with ONE engaging follow-up question to keep the conversation going.
- If asked about a career: mention salary range, key exam (if any), and job growth in 1-2 lines.
- Keep it conversational — no jargon, no text-book language.
- Never say "I cannot" — always try to help or gently redirect.`;

/**
 * Builds the system prompt with optional context about the user's current state.
 */
function buildSystemPrompt(context = {}) {
    let prompt = BASE_SYSTEM_PROMPT;
    if (context.step) {
        prompt += `\n\n## Current Chatbot Context\nThe student is at the "${context.step}" step of the career exploration flow.`;
    }
    if (context.career) {
        prompt += ` They are currently exploring the **"${context.career}"** career — tailor your advice to this field when relevant.`;
    }
    return prompt;
}

/**
 * Calls Groq API with user message and last few messages as context.
 * Returns response text or null on failure.
 *
 * @param {string} userMessage
 * @param {Array<{sender: string, text: string}>} recentMessages
 * @param {Object} context - optional { step, career }
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
        max_tokens: 700,
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
