/**
 * careerQuestionResolver.js
 *
 * Handles ANY career-specific question typed in natural language.
 * Strategy:
 *   1. Extract career name from the question (fuzzy match against all careers)
 *   2. Detect what aspect the user is asking about (salary, growth, day, etc.)
 *   3. Pull that data from the enriched career object and build a natural response
 *
 * This runs BEFORE the HF API call, making the bot feel very smart
 * without any external API dependency.
 */

import { detectCareerDetailIntent } from '../utils/fuzzyMatcher';

// Career name aliases mapped to career IDs for quick lookup
// Covers colloquial names, abbreviations, and common phrasings
const CAREER_NAME_ALIASES = {
    // CS / Tech
    'software engineer': 'btech-cs-ai',
    'software developer': 'btech-cs-ai',
    'programmer': 'btech-cs-ai',
    'coder': 'btech-cs-ai',
    'developer': 'btech-cs-ai',
    'computer science': 'btech-cs-ai',
    'cs': 'btech-cs-ai',
    'cse': 'btech-cs-ai',
    'ai engineer': 'btech-cs-ai',
    'machine learning engineer': 'btech-cs-ai',
    'data scientist': 'btech-cs-ai',
    'data science': 'btech-cs-ai',
    'it': 'btech-cs-ai',

    // Core Engineering
    'mechanical engineer': 'btech-core',
    'civil engineer': 'btech-core',
    'electrical engineer': 'btech-core',
    'core engineering': 'btech-core',
    'engineer': 'btech-core',
    'engineering': 'btech-core',
    'btech': 'btech-core',
    'be': 'btech-core',

    // Medical
    'doctor': 'mbbs',
    'physician': 'mbbs',
    'surgeon': 'mbbs',
    'mbbs': 'mbbs',
    'medicine': 'mbbs',
    'medical': 'mbbs',
    'neet': 'mbbs',

    // Allied health
    'physiotherapist': 'allied-health',
    'physiotherapy': 'allied-health',
    'nursing': 'allied-health',
    'nurse': 'allied-health',
    'pharmacist': 'allied-health',
    'pharmacy': 'allied-health',
    'lab technician': 'allied-health',

    // Research / Science
    'scientist': 'pure-science-research',
    'researcher': 'pure-science-research',
    'research scientist': 'pure-science-research',
    'physics': 'pure-science-research',
    'chemistry': 'pure-science-research',
    'maths': 'pure-science-research',
    'mathematics': 'pure-science-research',

    // Biotech
    'biotech': 'biotech-research',
    'biotechnology': 'biotech-research',
    'biologist': 'biotech-research',
    'genetics': 'biotech-research',

    // CA / Finance
    'ca': 'ca',
    'chartered accountant': 'ca',
    'accountant': 'ca',
    'finance': 'ca',
    'cpa': 'ca',

    // Actuarial
    'actuary': 'actuarial-science',
    'actuarial': 'actuarial-science',
    'actuarial science': 'actuarial-science',

    // Management
    'mba': 'management-bba',
    'manager': 'management-bba',
    'management': 'management-bba',
    'bba': 'management-bba',
    'business': 'management-bba',
    'marketing': 'management-bba',
    'hr': 'management-bba',

    // Entrepreneurship
    'entrepreneur': 'entrepreneurship',
    'startup founder': 'entrepreneurship',
    'business owner': 'entrepreneurship',
    'startups': 'entrepreneurship',

    // Law
    'lawyer': 'law-integrated',
    'advocate': 'law-integrated',
    'law': 'law-integrated',
    'attorney': 'law-integrated',
    'barrister': 'law-integrated',
    'solicitor': 'law-integrated',
    'llb': 'law-integrated',
    'legal': 'law-integrated',

    // CS/Legal
    'company secretary': 'cs-legal',
    'cs legal': 'cs-legal',
    'corporate laws': 'cs-legal',
    'compliance': 'cs-legal',

    // Psychology
    'psychologist': 'psychology',
    'psychology': 'psychology',
    'therapist': 'psychology',
    'counselor': 'psychology',
    'mental health': 'psychology',

    // Social / Public Policy
    'social worker': 'socio-public-policy',
    'public policy': 'socio-public-policy',
    'ngo': 'socio-public-policy',
    'journalism': 'socio-public-policy',
    'journalist': 'socio-public-policy',

    // UI/UX
    'designer': 'ui-ux-design',
    'ux designer': 'ui-ux-design',
    'ui designer': 'ui-ux-design',
    'graphic designer': 'ui-ux-design',
    'product designer': 'ui-ux-design',
    'ux': 'ui-ux-design',
    'ui ux': 'ui-ux-design',

    // Digital Marketing
    'digital marketing': 'digital-marketing',
    'digital marketer': 'digital-marketing',
    'seo': 'digital-marketing',
    'content creator': 'digital-marketing',
    'social media manager': 'digital-marketing',
    'influencer': 'digital-marketing',

    // Government / Civil Services
    'ias': 'civil-services',
    'ips': 'civil-services',
    'civil service': 'civil-services',
    'civil services': 'civil-services',
    'upsc': 'civil-services',
    'government job': 'civil-services',
    'collector': 'civil-services',

    // Banking
    'banker': 'banking-gov',
    'banking': 'banking-gov',
    'bank': 'banking-gov',
    'sbi': 'banking-gov',
    'rbi': 'banking-gov',

    // Defence
    'army': 'defence-tech',
    'navy': 'defence-tech',
    'air force': 'defence-tech',
    'defence': 'defence-tech',
    'defense': 'defence-tech',
    'soldier': 'defence-tech',
    'military': 'defence-tech',
    'nda': 'defence-tech',

    // ITI / Vocational
    'iti': 'iti-trade',
    'electrician': 'iti-trade',
    'plumber': 'iti-trade',
    'welder': 'iti-trade',
    'mechanic': 'iti-trade',
    'vocational': 'iti-trade',
    'diploma': 'iti-trade',
};

/**
 * Find the best career ID match in user's text.
 * First tries multi-word aliases (longest first for specificity),
 * then falls back to single-word substring matching.
 */
function extractCareerIdFromText(text, allCareers) {
    const lower = text.toLowerCase();

    // Sort aliases by length descending so "software engineer" wins over "engineer"
    const sortedAliases = Object.entries(CAREER_NAME_ALIASES)
        .sort((a, b) => b[0].length - a[0].length);

    for (const [alias, id] of sortedAliases) {
        if (lower.includes(alias)) return id;
    }

    // Fall back to matching against the actual career names in data
    for (const career of allCareers) {
        const enName = (career.name?.en || '').toLowerCase().split('(')[0].trim();
        if (enName.length > 3 && lower.includes(enName)) return career.id;
    }

    return null;
}

/**
 * Build a natural language response from a career object + requested detail key.
 */
function buildResponse(career, detailKey, lang = 'en') {
    const name = career.name?.en || career.name || 'This career';

    const templates = {
        salary: () => `**${name} — Salary Expectations**\n\n${career.salary || 'Salary data not available.'}\n\nThis varies based on experience, location, and specialization.`,
        workLife: () => `**${name} — Work-Life Balance**\n\n${career.workLife || 'Work-life info not available.'}`,
        growth: () => `**${name} — Job Growth**\n\n${career.jobGrowth || career.growth || 'Growth data not available.'}\n\nThis makes it ${career.jobGrowth?.toLowerCase().includes('high') ? 'a strong choice' : 'worth considering'} for long-term career planning.`,
        day: () => `**${name} — A Typical Day**\n\n${career.dayInLife || 'Day-in-life info not available.'}`,
        challenges: () => `**${name} — Key Challenges**\n\n${career.challenges || 'Challenge data not available.'}\n\nEvery career has hurdles — knowing them in advance puts you ahead.`,
        resources: () => {
            const res = Array.isArray(career.resources) ? career.resources.join(', ') : career.resources;
            return `**${name} — Learning Resources**\n\n${res || 'No specific resources listed.'}\n\nAlso check YouTube, Coursera, and NPTEL for free high-quality content.`;
        },
        entrance: () => {
            const exams = Array.isArray(career.entrance) ? career.entrance.join(', ') : career.entrance;
            return `**${name} — Entrance Exams**\n\n${exams || 'Check official websites for latest exam notifications.'}\n\nStart preparing at least 1-2 years before your target exam.`;
        },
        eligibility: () => `**${name} — Eligibility**\n\n${career.eligibility || 'Eligibility varies by institution.'}\n\nAlways check specific college requirements as they may differ.`,
        duration: () => `**${name} — Duration**\n\n${career.duration || 'Duration not specified.'}`,
        backupOptions: () => {
            const opts = Array.isArray(career.backupOptions) ? career.backupOptions.join(', ') : career.backupOptions;
            return `**${name} — Backup Options**\n\nIf ${name} doesn't work out:\n${opts || 'Explore related fields in the same domain.'}`;
        },
        topCompanies: () => {
            const companies = Array.isArray(career.topCompanies) ? career.topCompanies.join(', ') : (career.topCompanies || 'Data not available');
            return `**${name} — Top Employers**\n\n${companies}\n\nNetworking and internships are the best ways to get into these companies.`;
        },
        futureOutlook: () => `**${name} — Future Outlook**\n\n${career.futureOutlook || career.jobGrowth || 'Outlook data not available.'}`,
    };

    const builder = templates[detailKey];
    if (!builder) {
        // Generic overview if we can't match a specific aspect
        return buildOverview(career, lang);
    }
    return builder();
}

/**
 * Build a general overview of a career (used as default when no specific aspect is detected).
 */
function buildOverview(career, lang = 'en') {
    const name = career.name?.en || career.name || 'This career';
    const roles = Array.isArray(career.roles) ? career.roles.slice(0, 3).join(', ') : career.roles || '';
    const exams = Array.isArray(career.entrance) ? career.entrance.slice(0, 3).join(', ') : career.entrance || '';

    return `**${name}**\n\n` +
        `📚 **Degree**: ${career.degree || 'Varies'}\n` +
        `⏱ **Duration**: ${career.duration || 'Varies'}\n` +
        `💰 **Salary**: ${career.salary || 'Varies'}\n` +
        `📈 **Job Growth**: ${career.jobGrowth || 'Good'}\n` +
        (roles ? `👔 **Common Roles**: ${roles}\n` : '') +
        (exams ? `📝 **Key Exams**: ${exams}\n` : '') +
        `\nAsk me about salary, work-life balance, daily tasks, challenges, or entrance exams for more!`;
}

/**
 * Main entry point.
 * Given user text and the full list of enriched careers,
 * returns { response, careerName } or null if no career was found.
 */
export function resolveCareerQuestion(text, allCareers, lang = 'en') {
    const careerId = extractCareerIdFromText(text, allCareers);
    if (!careerId) return null;

    const career = allCareers.find(c => c.id === careerId);
    if (!career) return null;

    // ── COMPLEXITY GUARD ──────────────────────────────────────────────
    // If it's a "Can I combine X and Y" or "X vs Y" question, 
    // it's too nuanced for structured data. Let Groq/Gemini handle it.
    const complexKeywords = /\b(combine|combination|and also|along with|versus| vs |better than|compared to|difference between|choice|choosing|confused|decide)\b/i;
    if (complexKeywords.test(text)) return null;

    // What aspect are they asking about?
    const detailKey = detectCareerDetailIntent(text);

    const response = detailKey
        ? buildResponse(career, detailKey, lang)
        : buildOverview(career, lang);

    return {
        response,
        careerName: career.name?.en || careerId,
        followUp: `Would you like to know more about ${career.name?.en || 'this career'} — salary, growth, typical day, or entrance exams?`,
    };
}
