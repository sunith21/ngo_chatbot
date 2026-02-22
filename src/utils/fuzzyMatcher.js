/**
 * Fuzzy text matching utilities.
 * Provides typo correction, synonym expansion, and partial matching
 * so the bot understands natural language and misspellings.
 */

// Levenshtein distance for typo detection
function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

// Similarity ratio 0-1
function similarity(a, b) {
    const dist = levenshtein(a.toLowerCase(), b.toLowerCase());
    return 1 - dist / Math.max(a.length, b.length, 1);
}

/**
 * Returns the best matching keyword from a list, or null if no good match.
 * @param {string} word - Input word
 * @param {string[]} targets - List of target keywords
 * @param {number} threshold - Minimum similarity (0-1), default 0.75
 */
export function fuzzyMatchWord(word, targets, threshold = 0.75) {
    let best = null, bestScore = 0;
    for (const target of targets) {
        const score = similarity(word, target);
        if (score > bestScore && score >= threshold) { best = target; bestScore = score; }
    }
    return best;
}

/**
 * Checks if a sentence contains a fuzzy match for ANY of the targets.
 * Splits input into words and checks each against targets.
 * Returns the matched target or null.
 */
export function sentenceContainsFuzzy(sentence, targets, threshold = 0.78) {
    const words = sentence.toLowerCase().split(/\s+/);
    for (const word of words) {
        const match = fuzzyMatchWord(word, targets, threshold);
        if (match) return match;
    }
    return null;
}

// ── Synonym / paraphrase map ──────────────────────────────────────────────────
// Maps natural-language phrasings → canonical intent keys
export const INTENT_SYNONYMS = {
    salary: [
        "salary", "pay", "income", "earning", "money", "package", "lpa",
        "ctc", "wage", "stipend", "paid", "compensation", "remuneration",
        "how much", "remunaration", "sallary", "salery", "salry"
    ],
    workLife: [
        "work-life", "worklife", "balance", "hours", "stress", "flexible",
        "remote", "wfh", "timing", "shift", "leave", "overtime", "work life"
    ],
    growth: [
        "growth", "future", "scope", "prospects", "demand", "market",
        "career path", "promotions", "opportunities", "job market", "groth"
    ],
    day: [
        "day in life", "daily", "routine", "tasks", "what do they do",
        "typical day", "work like", "job like", "responsibilities"
    ],
    challenges: [
        "challenges", "difficulties", "difficult", "tough", "hard", "problems",
        "drawbacks", "downside", "negative", "challanges", "chalenge"
    ],
    resources: [
        "resources", "study", "learn", "books", "courses", "guide", "prepare",
        "material", "links", "website", "platform", "resourses", "resourece",
        "recources", "rescources", "material", "how to prepare"
    ],
    entrance: [
        "exam", "entrance", "test", "admission", "apply", "how to get in",
        "notification", "form", "jee", "neet", "clat", "cuet", "gate",
        "enrance", "entrace", "exams"
    ],
    eligibility: [
        "eligibility", "criteria", "percentage", "marks", "age", "qualify",
        "requirement", "need", "required", "minimum", "who can apply"
    ],
    duration: [
        "duration", "long", "years", "time", "how many years", "length",
        "how long", "semester", "duraton", "duartion"
    ],
    backupOptions: [
        "backup", "alternative", "other option", "if fail", "plan b",
        "fallback", "else", "instead"
    ],
    topCompanies: [
        "company", "companies", "employer", "hire", "recruit", "work at",
        "where to work", "top firm", "best place", "compny"
    ],
    futureOutlook: [
        "future", "outlook", "trend", "upcoming", "next 10 years",
        "will it grow", "is it good", "career future"
    ],
};

/**
 * Given a free-form user sentence, detect which career detail they're asking about.
 * Returns the matched key (e.g., "salary", "resources") or null.
 */
export function detectCareerDetailIntent(text) {
    const lower = text.toLowerCase();

    // Natural language sentence patterns (highest priority)
    const sentencePatterns = [
        { key: 'salary', patterns: [/how much.*(earn|paid|make|get)/i, /what.*(salary|pay|income)/i, /tell me about.*(money|pay)/i] },
        { key: 'growth', patterns: [/is.*good.*future/i, /what.*scope/i, /will.*grow/i, /career.*prospect/i] },
        { key: 'resources', patterns: [/what.*(resource|need|study|learn|prepare)/i, /how.*prepare/i, /suggest.*(book|course)/i] },
        { key: 'entrance', patterns: [/which.*exam/i, /how.*apply/i, /what.*test/i, /entrance.*for/i] },
        { key: 'eligibility', patterns: [/who.*can.*do/i, /what.*required?/i, /what.*need/i, /am.*eligible/i] },
        { key: 'duration', patterns: [/how.*long/i, /how.*many.*year/i, /how.*much.*time/i] },
        { key: 'workLife', patterns: [/how.*stress/i, /work.*hour/i, /can.*work.*home/i, /life.*work/i] },
        { key: 'challenges', patterns: [/what.*hard/i, /any.*downside/i, /is.*tough/i, /what.*problem/i] },
        { key: 'day', patterns: [/what.*do.*daily/i, /typical.*day/i, /what.*work.*like/i] },
        { key: 'topCompanies', patterns: [/which.*company/i, /where.*work/i, /who.*hire/i, /top.*employer/i] },
        { key: 'futureOutlook', patterns: [/what.*future/i, /will.*demand/i, /trending/i, /next.*year/i] },
        { key: 'backupOptions', patterns: [/what if.*fail/i, /plan b/i, /alternative/i, /other.*option/i] },
    ];

    for (const { key, patterns } of sentencePatterns) {
        for (const p of patterns) {
            if (p.test(lower)) return key;
        }
    }

    // Fuzzy word-level matching (handles typos)
    for (const [key, synonyms] of Object.entries(INTENT_SYNONYMS)) {
        const match = sentenceContainsFuzzy(lower, synonyms, 0.78);
        if (match) return key;
    }

    return null;
}

/**
 * Checks if user input is a general question (starts with what/how/is/why/tell/which)
 */
export function isQuestion(text) {
    return /^(what|how|is|are|why|tell|which|when|who|can|do|will|would)\b/i.test(text.trim());
}
