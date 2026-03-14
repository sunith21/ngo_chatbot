/**
 * comparisonEngine.js
 *
 * Handles natural-language comparison and suitability questions like:
 *   "should I take engineering or medical"
 *   "will CS suit me"
 *   "engineering vs law which is better"
 *   "confused between medicine and management"
 *
 * Returns { response, followUp, comparisonKey } or null.
 */

import { findComparisonMatch, resolveComparisonSide } from '../data/careerComparisons';

// Re-export so Chatbot.jsx only needs to import from one place
export { resolveComparisonSide };

/**
 * Resolves a comparison or suitability question.
 *
 * @param {string} userText - Raw user input
 * @param {string} lang - 'en' or 'kn'
 * @returns {{ response: string, followUp: string, comparisonKey: string } | null}
 */
export function resolveComparison(userText, lang = 'en') {
    const match = findComparisonMatch(userText);
    if (!match) return null;

    const { entry, key } = match;

    const response = `${entry.response}\n\n${entry.suitability}`;

    return {
        response,
        followUp: entry.followUp,
        comparisonKey: key,
    };
}
