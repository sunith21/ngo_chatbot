/**
 * geminiService.js
 *
 * Calls Google Gemini API as a smart fallback for any free-text query
 * that isn't caught by local handlers. This makes the chatbot genuinely
 * intelligent for unusual or complex questions.
 *
 * To use: set REACT_APP_GEMINI_API_KEY in your .env file.
 * Get a free key at: https://aistudio.google.com/app/apikey
 */

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * The system prompt constrains Gemini to act as a career counselor
 * for Indian students, keeping responses focused and relevant.
 */
const BASE_SYSTEM_CONTEXT = `You are a warm, encouraging career counselor assistant for Indian students in Class 10-12.
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
- If you don't know something specific, say so and suggest where to look.
- Never say "I cannot" — always try to help or gently redirect.
- Do NOT recommend illegal or harmful activities.`;

/**
 * Builds the system context with optional chatbot state context.
 */
function buildSystemContext(context = {}) {
    let ctx = BASE_SYSTEM_CONTEXT;
    if (context.step) {
        ctx += `\n\n## Current Chatbot Context\nThe student is at the "${context.step}" step of the career exploration flow.`;
    }
    if (context.career) {
        ctx += ` They are currently exploring the **"${context.career}"** career — tailor your advice to this field when relevant.`;
    }
    return ctx;
}

/**
 * Calls Gemini API with the user's message and conversation context.
 * Returns the AI response text, or null if the call fails.
 *
 * @param {string} userMessage - The user's typed input
 * @param {Array<{role: string, text: string}>} recentMessages - Last few messages for context
 * @param {Object} context - optional { step, career }
 * @returns {Promise<string|null>}
 */
export async function askGemini(userMessage, recentMessages = [], context = {}) {
    if (!GEMINI_API_KEY) {
        console.warn('REACT_APP_GEMINI_API_KEY not set. Gemini fallback disabled.');
        return null;
    }

    // Build conversation history for Gemini (last 10 messages for richer context)
    const history = recentMessages.slice(-10).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const requestBody = {
        system_instruction: {
            parts: [{ text: buildSystemContext(context) }]
        },
        contents: [
            ...history,
            {
                role: 'user',
                parts: [{ text: userMessage }]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 700,
            topP: 0.9,
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ]
    };

    try {
        const fetchPromise = fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 8000));
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response) { console.warn('Gemini request timed out'); return null; }
        if (!response.ok) {
            console.error('Gemini API error:', response.status);
            return null;
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return text?.trim() || null;

    } catch (error) {
        console.error('Gemini API call failed:', error);
        return null;
    }
}
