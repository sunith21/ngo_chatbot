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
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * The system prompt constrains Gemini to act as a career counselor
 * for Indian students, keeping responses focused and relevant.
 */
const SYSTEM_CONTEXT = `You are a friendly, empathetic career counselor assistant for Indian students (Class 10-12).
Your role is to help students make informed decisions about their academic streams and career paths.

Rules:
- Keep responses concise (3-5 sentences max), warm, and encouraging.
- Focus on Indian education system: streams (PCM, PCB, Commerce, Arts), exams (JEE, NEET, UPSC, CLAT, CA), colleges (IITs, IIMs, AIIMS, NLUs).
- Use Indian salary figures (LPA format).
- Always end with a question that encourages the student to share more.
- If you don't know something specific, say so and suggest where to look.
- Do NOT recommend illegal or harmful activities.
- Respond in the same language the student used (English or Kannada).`;

/**
 * Calls Gemini API with the user's message and conversation context.
 * Returns the AI response text, or null if the call fails.
 *
 * @param {string} userMessage - The user's typed input
 * @param {Array<{role: string, text: string}>} recentMessages - Last few messages for context
 * @returns {Promise<string|null>}
 */
export async function askGemini(userMessage, recentMessages = []) {
    if (!GEMINI_API_KEY) {
        console.warn('REACT_APP_GEMINI_API_KEY not set. Gemini fallback disabled.');
        return null;
    }

    // Build conversation history for Gemini (last 6 messages for context)
    const history = recentMessages.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const requestBody = {
        system_instruction: {
            parts: [{ text: SYSTEM_CONTEXT }]
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
            maxOutputTokens: 300,
            topP: 0.9,
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ]
    };

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

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
