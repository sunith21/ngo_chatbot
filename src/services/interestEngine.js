/**
 * Interest-based career suggestion engine.
 * Maps free-form hobbies and interests to career IDs.
 */

const INTEREST_MAP = {
    // Tech
    coding: ["btech-cs-ai"], programming: ["btech-cs-ai"], software: ["btech-cs-ai"],
    computer: ["btech-cs-ai"], "artificial intelligence": ["btech-cs-ai"], data: ["btech-cs-ai", "actuarial-science"],
    games: ["btech-cs-ai", "ui-ux-design"], apps: ["btech-cs-ai", "ui-ux-design"], websites: ["btech-cs-ai", "ui-ux-design"],
    hacking: ["btech-cs-ai"], robotics: ["btech-core", "btech-cs-ai"], robots: ["btech-core", "btech-cs-ai"],
    // Engineering
    building: ["btech-core"], construction: ["btech-core"], bridges: ["btech-core"],
    machines: ["btech-core", "iti-trade"], electricity: ["btech-core", "iti-trade"],
    electronics: ["btech-core"], airplanes: ["btech-core", "defence-tech"], cars: ["btech-core", "iti-trade"],
    mechanical: ["btech-core", "iti-trade"], circuits: ["btech-core"],
    // Science
    science: ["pure-science-research", "biotech-research"], chemistry: ["pure-science-research", "biotech-research"],
    physics: ["pure-science-research", "btech-core"], biology: ["mbbs", "allied-health", "biotech-research"],
    plants: ["pure-science-research", "biotech-research"], animals: ["mbbs", "biotech-research"],
    space: ["pure-science-research", "btech-core"], research: ["pure-science-research", "biotech-research"],
    laboratory: ["biotech-research", "pure-science-research"], genetics: ["biotech-research"],
    environment: ["pure-science-research", "biotech-research"], nature: ["pure-science-research"],
    // Medicine
    doctor: ["mbbs"], medicine: ["mbbs"], hospital: ["mbbs", "allied-health"],
    patients: ["mbbs", "allied-health", "psychology"], health: ["mbbs", "allied-health"],
    healing: ["mbbs", "allied-health"], surgery: ["mbbs"], nursing: ["allied-health"], pharmacy: ["allied-health"],
    // Arts & Design
    drawing: ["ui-ux-design", "digital-marketing"], painting: ["ui-ux-design"],
    art: ["ui-ux-design", "socio-public-policy"], design: ["ui-ux-design"],
    photography: ["ui-ux-design", "digital-marketing"], music: ["ui-ux-design"],
    creativity: ["ui-ux-design", "digital-marketing"], animation: ["ui-ux-design"], fashion: ["ui-ux-design"],
    // Writing & Communication
    writing: ["socio-public-policy", "digital-marketing", "law-integrated"],
    journalism: ["socio-public-policy", "digital-marketing"], reading: ["law-integrated", "psychology"],
    speaking: ["law-integrated", "management-bba"], debating: ["law-integrated"],
    // People & Social
    helping: ["psychology", "socio-public-policy", "allied-health"], people: ["psychology", "management-bba", "civil-services"],
    society: ["socio-public-policy"], leadership: ["civil-services", "management-bba"],
    community: ["socio-public-policy", "civil-services"], teaching: ["socio-public-policy"],
    counseling: ["psychology"],
    // Law & Government
    law: ["law-integrated", "cs-legal"], justice: ["law-integrated"], politics: ["civil-services", "socio-public-policy"],
    government: ["civil-services", "banking-gov"], ias: ["civil-services"], policy: ["civil-services", "socio-public-policy"],
    army: ["defence-tech"], defence: ["defence-tech"], military: ["defence-tech"],
    // Business
    business: ["management-bba", "ca", "entrepreneurship"], money: ["ca", "banking-gov", "actuarial-science"],
    finance: ["ca", "actuarial-science", "banking-gov"], accounts: ["ca", "banking-gov"],
    stocks: ["actuarial-science", "ca"], investing: ["ca", "actuarial-science"],
    startup: ["entrepreneurship"], entrepreneur: ["entrepreneurship"],
    marketing: ["digital-marketing", "management-bba"], "social media": ["digital-marketing"],
    // Vocational
    repair: ["iti-trade"], fixing: ["iti-trade"], welding: ["iti-trade"], trade: ["iti-trade"],
    // Kannada keywords
    "ವಿಜ್ಞಾನ": ["pure-science-research", "biotech-research"],
    "ಕಂಪ್ಯೂಟರ್": ["btech-cs-ai"], "ಕೋಡಿಂಗ್": ["btech-cs-ai"],
    "ವೈದ್ಯ": ["mbbs"], "ಡಾಕ್ಟರ್": ["mbbs"],
    "ಕಾನೂನು": ["law-integrated"], "ವ್ಯವಹಾರ": ["management-bba", "entrepreneurship"],
    "ಕಲೆ": ["ui-ux-design"], "ಚಿತ್ರ": ["ui-ux-design"],
    "ಸಮಾಜ": ["socio-public-policy"], "ಸರ್ಕಾರ": ["civil-services"],
    "ಸೇನೆ": ["defence-tech"], "ಹಣ": ["ca", "banking-gov"], "ಬ್ಯಾಂಕ್": ["banking-gov"],
};

export function detectInterestsFromText(inputText) {
    const lower = inputText.toLowerCase();
    const scoreMap = {};
    for (const keyword of Object.keys(INTEREST_MAP)) {
        if (lower.includes(keyword)) {
            for (const careerId of INTEREST_MAP[keyword]) {
                scoreMap[careerId] = (scoreMap[careerId] || 0) + 1;
            }
        }
    }
    return Object.entries(scoreMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([id]) => id);
}

export function looksLikeInterestStatement(inputText) {
    const lower = inputText.toLowerCase().trim();

    // Exclude questions — "should I take coding?" is NOT an interest statement
    const questionStarters = /^(should|is|are|can|will|what|which|how|why|do|does|would|could|when|where|was|were)\b/i;
    if (questionStarters.test(lower)) return false;

    const triggers = [
        "i like", "i love", "i enjoy", "i'm interested", "i am interested",
        "i want to", "i'm passionate", "my hobby", "i prefer", "i'm good at",
        "fascinated by", "drawn to", "i dream of", "i care about",
        "ನನಗೆ ಇಷ್ಟ", "ನನ್ನ ಹವ್ಯಾಸ", "ನಾನು ಬಯಸುತ್ತೇನೆ", "ನನಗೆ ಆಸಕ್ತಿ",
    ];
    return triggers.some(p => lower.includes(p));
}

export function findCareersByIds(careerData, ids) {
    const results = [];
    for (const category of Object.values(careerData)) {
        for (const subcategory of Object.values(category)) {
            for (const career of subcategory) {
                if (ids.includes(career.id)) results.push(career);
            }
        }
    }
    return ids.map(id => results.find(c => c.id === id)).filter(Boolean);
}
