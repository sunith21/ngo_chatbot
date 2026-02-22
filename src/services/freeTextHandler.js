/**
 * freeTextHandler.js
 *
 * Handles ANY typed free-text input the user sends, regardless of the
 * current chatbot step. Uses keyword-weighted matching to return the
 * most relevant response and a follow-up question to keep the
 * conversation going.
 *
 * Priority: specific match > category match > generic fallback
 */

const TOPIC_RESPONSES = {
    // ── Parental / family pressure ─────────────────────────────────
    parental_pressure: {
        keywords: ['parents', 'family', 'mom', 'dad', 'father', 'mother', 'forcing', 'pressure', 'force me', 'they want', 'my parents want', 'parent pressure', 'nagging'],
        en: `It can be tough when the people who love you the most have a different vision for your future. Here's how to handle it:\n\n- **Have an honest conversation**: Share your interests and show you've thought it through. Facts and passion together are very persuasive.\n- **Find a middle ground**: Many careers blend both interests — e.g., a CS student can pivot into healthcare tech, satisfying both tech and medicine goals.\n- **Seek a mentor**: A third-party voice (teacher, counselor) sometimes helps parents open up to new ideas.\n- **Give it time**: Most parents come around once they see your commitment and a clear plan.\n\nRemember — it's *your* life and you'll be the one living it every single day.`,
        kn: `ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಸುವ ಜನರು ವಿಭಿನ್ನ ದೃಷ್ಟಿಕೋನ ಹೊಂದಿದ್ದಾಗ ಕಷ್ಟವಾಗಬಹುದು. ಇದನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಬಹುದು:\n\n- **ಪ್ರಾಮಾಣಿಕ ಸಂವಾದ**: ನಿಮ್ಮ ಆಸಕ್ತಿ ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ನೀವು ಯೋಚಿಸಿರುವುದನ್ನು ತೋರಿಸಿ.\n- **ಮಧ್ಯಮ ಮಾರ್ಗ ಹುಡುಕಿ**: ಅನೇಕ ವೃತ್ತಿಗಳು ಎರಡೂ ಆಸಕ್ತಿ ಸೇರಿಸುತ್ತವೆ.\n- **ಮಾರ್ಗದರ್ಶಕರನ್ನು ಹುಡುಕಿ**: ಶಿಕ್ಷಕ ಅಥವಾ ಸಲಹೆಗಾರರ ಅಭಿಪ್ರಾಯ ಸಹಾಯ ಮಾಡಬಹುದು.\n- **ಸಮಯ ಕೊಡಿ**: ನಿಮ್ಮ ಬದ್ಧತೆ ಮತ್ತು ಸ್ಪಷ್ಟ ಯೋಜನೆ ಕಂಡಾಗ ಹಲವರು ಬದಲಾಗುತ್ತಾರೆ.`,
        followUp: { en: "What career are your parents pushing you towards, vs what *you* actually want?", kn: "ನಿಮ್ಮ ಪೋಷಕರು ಯಾವ ವೃತ್ತಿ ಸೂಚಿಸುತ್ತಿದ್ದಾರೆ, ಮತ್ತು ನಿಮಗೆ ಏನು ಬೇಕು?" }
    },

    // ── Abroad / international opportunities ──────────────────────
    abroad_opportunities: {
        keywords: ['abroad', 'foreign', 'overseas', 'international', 'usa', 'uk', 'canada', 'germany', 'australia', 'us job', 'migrate', 'immigration', 'work abroad', 'study abroad', 'ms', 'masters abroad'],
        en: `Going abroad is a very achievable goal! Here's what you should know:\n\n- **Study Abroad**: MS in CS, Engineering, or MBA from the US/UK/Canada/Germany can be transformative. GRE/GMAT + IELTS/TOEFL scores are typically required.\n- **Work Visa Routes**: Many countries (Canada, Germany, Australia) have points-based immigration that rewards skilled professionals highly.\n- **Indian Advantages**: Indias strong STEM foundation means Indian graduates are highly recruited globally, especially in tech, finance, and healthcare.\n- **Best Fields for Abroad**: Computer Science, Data Science, Nursing, Pharmacy, Engineering, and Finance.\n- **Timeline**: Most people plan 2–4 years ahead. Start with building your undergrad GPA and relevant experience now.`,
        kn: `ವಿದೇಶಕ್ಕೆ ಹೋಗುವುದು ಸಾಧ್ಯವಾದ ಗುರಿ! ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ವಿಷಯಗಳು:\n\n- **ವಿದೇಶದಲ್ಲಿ ಅಧ್ಯಯನ**: US/UK/Canada/Germany ನಿಂದ MS ಅಥವಾ MBA ಮಾಡಬಹುದು.\n- **ಕೆಲಸದ ವೀಸಾ ಮಾರ್ಗಗಳು**: ಕೆನಡಾ, ಜರ್ಮನಿ, ಆಸ್ಟ್ರೇಲಿಯಾ ಅಂಕ ಆಧಾರಿತ ವಲಸೆ ನೀತಿ ಹೊಂದಿವೆ.\n- **ಭಾರತೀಯ ಅನುಕೂಲ**: ಭಾರತೀಯ STEM ಪದವೀಧರರಿಗೆ ವಿಶ್ವದಾದ್ಯಂತ ಬೇಡಿಕೆ ಇದೆ.`,
        followUp: { en: "Which country or field interests you the most for your career abroad?", kn: "ವಿದೇಶದಲ್ಲಿ ನಿಮಗೆ ಯಾವ ದೇಶ ಅಥವಾ ಕ್ಷೇತ್ರ ಹೆಚ್ಚು ಆಸಕ್ತಿ ಉಂಟು ಮಾಡುತ್ತದೆ?" }
    },

    // ── Salary / money anxiety ─────────────────────────────────────
    salary_anxiety: {
        keywords: ['money', 'salary', 'earn', 'earning', 'income', 'rich', 'poor', 'paying job', 'highest paying', 'most money', 'financially', 'afford', 'fee', 'expenses', 'loan', 'scholarship'],
        en: `Money is a very valid concern! Here's an honest breakdown:\n\n- **Highest-Paying Fields in India**: CS/AI (8–60+ LPA), Finance/CA (10–40+ LPA), Medicine (6–30+ LPA post-specialization), Law (variable, high at top firms).\n- **Hidden Value**: Some lower-paying starting fields (like research or civil services) offer job security, prestige, and non-monetary benefits that are enormous.\n- **Skill Premium**: Regardless of field, specialization always raises your value. A mid-career CS professional with AI skills can earn 3x a generalist.\n- **Scholarships exist**: For most top programs! Don't let fees stop you from exploring a path — inform yourself first.\n\nDo you want me to show you the salary range for a specific career?`,
        kn: `ಹಣ ಒಂದು ಮಹತ್ವದ ಕಾಳಜಿ! ಪ್ರಾಮಾಣಿಕ ಮಾಹಿತಿ:\n\n- **ಭಾರತದಲ್ಲಿ ಹೆಚ್ಚು ಸಂಬಳ ನೀಡುವ ಕ್ಷೇತ್ರಗಳು**: CS/AI (8–60+ LPA), Finance/CA, ವೈದ್ಯಕೀಯ.\n- **ವಿಶೇಷತೆ ಮುಖ್ಯ**: ಯಾವ ಕ್ಷೇತ್ರವಾದರೂ ಪರಿಣತಿ ನಿಮ್ಮ ಮೌಲ್ಯ ಹೆಚ್ಚಿಸುತ್ತದೆ.\n- **ವಿದ್ಯಾರ್ಥಿ ವೇತನ**: ಹೆಚ್ಚಿನ ಉನ್ನತ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಲಭ್ಯವಿದೆ!`,
        followUp: { en: "Would you like to see the salary range for a specific career you have in mind?", kn: "ನಿಮ್ಮ ಮನಸ್ಸಿನಲ್ಲಿರುವ ಯಾವುದೇ ವೃತ್ತಿಯ ಸಂಬಳ ವ್ಯಾಪ್ತಿ ತೋರಿಸಲೇ?" }
    },

    // ── Job market / employment doubt ─────────────────────────────
    job_market: {
        keywords: ['job market', 'jobs available', 'unemployed', 'unemployment', 'placement', 'hire', 'hiring', 'companies', 'scope', 'future scope', 'job security', 'stable career', 'demand', 'market'],
        en: `The job market is definitely something worth thinking about carefully!\n\n- **High-Demand Now**: AI/ML, Cybersecurity, Data Science, Cloud Computing, Digital Health.\n- **Evergreen Stable**: Medicine, Law, Civil Services, Accounting (CA), Teaching.\n- **Growing Fast**: Mental Health (Psychologists), Green Energy (Engineers), E-commerce (Supply Chain).\n- **Smart Approach**: Rather than picking the "hottest" field today, look for the intersection of what you're good at AND what has growth potential.\n\nThe best career is one where you're skilled enough to be in the top 20% — that group is never unemployed.`,
        kn: `ಉದ್ಯೋಗ ಮಾರುಕಟ್ಟೆ ಬಗ್ಗೆ ಯೋಚಿಸುವುದು ಸರಿಯಾದ ನಿರ್ಧಾರ!\n\n- **ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ**: AI/ML, Cybersecurity, Data Science, Cloud.\n- **ಸ್ಥಿರ ವೃತ್ತಿಗಳು**: ವೈದ್ಯಕೀಯ, ಕಾನೂನು, ಸರ್ಕಾರಿ ಸೇವೆ, CA.\n- **ಸ್ಮಾರ್ಟ್ ವಿಧಾನ**: ನಿಮ್ಮ ಕೌಶಲ್ಯ + ಬೆಳವಣಿಗೆ ಸಾಮರ್ಥ್ಯದ ಛೇದಕ ಹುಡುಕಿ.`,
        followUp: { en: "Which field are you most concerned about — do you want me to check its current demand?", kn: "ಯಾವ ಕ್ಷೇತ್ರದ ಬಗ್ಗೆ ಹೆಚ್ಚು ಕಾಳಜಿ ಇದೆ? ಸದ್ಯದ ಬೇಡಿಕೆ ಪರಿಶೀಲಿಸಲೇ?" }
    },

    // ── Peer comparison / confidence issues ───────────────────────
    peer_comparison: {
        keywords: ['my friends', 'classmates', 'peers', 'everyone else', 'falling behind', 'behind', 'average', 'not smart', 'not good enough', 'comparison', 'jealous', 'comparing', 'rank', 'topper'],
        en: `Comparing yourself to others is very natural — but it's also one of the biggest traps. Here's a reality check:\n\n- **Different Timelines**: Some people peak in their 20s; others in their 40s. Neither is wrong.\n- **Survivorship Bias**: The people you see "succeeding" early (toppers, medal winners) represent a tiny fraction. Most people find their path quietly.\n- **Your Unique Combination**: No one else has your exact mix of interests, experiences, and strengths. That's your competitive advantage.\n- **Focus Inward**: Replace "Am I ahead of them?" with "Am I better than I was last month?"\n\nYou're exactly where you need to be. Let's figure out your next step forward!`,
        kn: `ಇತರರನ್ನು ಹೋಲಿಸಿಕೊಳ್ಳುವುದು ಸ್ವಾಭಾವಿಕ, ಆದರೆ ಇದು ದೊಡ್ಡ ಬಲೆ:\n\n- **ವಿಭಿನ್ನ ಸಮಯರೇಖೆ**: ಕೆಲವರು 20ರಲ್ಲಿ, ಕೆಲವರು 40ರಲ್ಲಿ ಉತ್ತಮ ಮಾಡುತ್ತಾರೆ.\n- **ನಿಮ್ಮ ವಿಶಿಷ್ಟ ಸಂಯೋಜನೆ**: ನಿಮ್ಮ ಆಸಕ್ತಿ, ಅನುಭವ ಮತ್ತು ಶಕ್ತಿಯ ಸಂಯೋಜನೆ ಬೇರೆ ಯಾರಿಗೂ ಇಲ್ಲ.\n- **ಒಳಮುಖ ಗಮನ**: "ನಾನು ಕಳೆದ ತಿಂಗಳಿಗಿಂತ ಉತ್ತಮಗೊಂಡಿದ್ದೇನೇ?" ಎಂದು ಕೇಳಿಕೊಳ್ಳಿ.`,
        followUp: { en: "What's *one* thing you feel you're genuinely good at or enjoy doing?", kn: "ನಿಮಗೆ ನಿಜವಾಗಿ ಚೆನ್ನಾಗಿ ಬರುವ ಅಥವಾ ಇಷ್ಟ ಆಗುವ *ಒಂದು* ವಿಷಯ ಏನು?" }
    },

    // ── Arts stream stigma ─────────────────────────────────────────
    arts_stigma: {
        keywords: ['arts bad', 'arts useless', 'arts no scope', 'humanities scope', 'is arts good', 'arts career', 'no future in arts', 'arts stream worth', 'lit', 'literature', 'history career', 'geography career'],
        en: `Arts/Humanities is massively underrated and offers some of the most meaningful careers!\n\n- **High-Paying Arts Careers**: Law (top lawyers earn crores), Psychology (growing 40%+), Civil Services (IAS/IPS), Journalism, Content Strategy.\n- **The Creative Economy is Booming**: UX Writing, Copywriting, Scriptwriting, Game Narrative Design — all are exploding with salaries to match.\n- **Critical Thinking Edge**: Arts students are often better at communication, negotiation, and leadership — skills every company desperately needs.\n- **Cross-disciplinary Power**: A History grad who learns data analysis? Nearly impossible to replace.\n\nScience is about understanding the world. Arts is about understanding *people*. Both are vital.`,
        kn: `ಕಲೆ/ಮಾನವಿಕ ಅತ್ಯಂತ ಕಡಿಮೆ ಮೌಲ್ಯ ನೀಡಲಾಗಿದೆ ಆದರೆ ಅತ್ಯಂತ ಅರ್ಥಪೂರ್ಣ ವೃತ್ತಿ ಅವಕಾಶಗಳಿವೆ!\n\n- **ಹೆಚ್ಚು ಸಂಬಳ ನೀಡುವ ಕಲಾ ವೃತ್ತಿಗಳು**: ಕಾನೂನು, ಮನೋವಿಜ್ಞಾನ, ಸಿವಿಲ್ ಸರ್ವೀಸಸ್, ಪತ್ರಿಕೋದ್ಯಮ.\n- **ಸೃಜನಶೀಲ ಆರ್ಥಿಕತೆ ಏರುತ್ತಿದೆ**: UX Writing, Copywriting, Content Strategy.\n- **ವಿಮರ್ಶಾತ್ಮಕ ಚಿಂತನೆ**: ಕಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಂವಹನ, ಮಾತುಕತೆ ಮತ್ತು ನಾಯಕತ್ವದಲ್ಲಿ ಉತ್ತಮ.`,
        followUp: { en: "Which Arts subjects do you enjoy the most? That's a great starting point for finding your career.", kn: "ಯಾವ ಕಲಾ ವಿಷಯಗಳು ನಿಮಗೆ ಹೆಚ್ಚು ಇಷ್ಟ? ಅದೇ ನಿಮ್ಮ ವೃತ್ತಿ ಹುಡುಕುವ ಆರಂಭ ಬಿಂದು." }
    },

    // ── Engineering / tech specific ───────────────────────────────
    engineering_doubt: {
        keywords: ['engineering good', 'btech worth it', 'is engineering', 'cs good', 'cse scope', 'software good', 'it career', 'ai career', 'machine learning', 'data science career', 'coding career', 'developer career'],
        en: `Engineering (especially CS/AI) remains one of the best career bets in India and globally.\n\n**Why it's still strong:**\n- AI/ML roles are growing 30-40% YoY globally\n- Every industry (healthcare, finance, defense) now has a tech arm\n- Remote work = global job access from Day 1\n\n**Things to be aware of:**\n- Just passing Engineering is not enough — skills, projects, and internships matter more than the degree\n- Tier-1 college vs. Tier-3 college gap is real, but bridge-able with a strong portfolio\n- Specializations (AI, Cybersecurity, Cloud) command 2–3x salary of a generalist\n\nWant me to show you specific CS career paths and their salary ranges?`,
        kn: `ಎಂಜಿನಿಯರಿಂಗ್ (ವಿಶೇಷವಾಗಿ CS/AI) ಭಾರತ ಮತ್ತು ಜಾಗತಿಕವಾಗಿ ಅತ್ಯುತ್ತಮ ವೃತ್ತಿ ಮಾರ್ಗಗಳಲ್ಲಿ ಒಂದಾಗಿ ಉಳಿದಿದೆ.\n\n- AI/ML ಉದ್ಯೋಗಗಳು ವಾರ್ಷಿಕ 30-40% ಬೆಳೆಯುತ್ತಿವೆ\n- ವಿಶೇಷತೆ (AI, Cloud, Cybersecurity) ಸಂಬಳ 2-3x ಹೆಚ್ಚಿಸುತ್ತದೆ\n- ಕೌಶಲ್ಯ ಮತ್ತು ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು ಡಿಗ್ರಿಗಿಂತ ಮುಖ್ಯ`,
        followUp: { en: "Are you more drawn to coding itself, or to the problem-solving and design side of tech?", kn: "ನಿಮಗೆ ಕೋಡಿಂಗ್ ಇಷ್ಟ, ಅಥವಾ ತಂತ್ರಜ್ಞಾನದ ಸಮಸ್ಯೆ-ಪರಿಹಾರ ಮತ್ತು ವಿನ್ಯಾಸ ಭಾಗ?" }
    },

    // ── Medical / NEET specific ────────────────────────────────────
    medical_doubt: {
        keywords: ['neet', 'mbbs', 'doctor', 'medical career', 'medicine', 'mbbs worth', 'long duration', 'is medicine good', 'bds', 'dentist', 'pharmacy'],
        en: `Medicine is one of the most respected and recession-proof careers, though it demands significant commitment.\n\n**The honest picture:**\n- MBBS is 5.5 years + 1 year internship, then MD/MS (3 years) if you want specialization\n- Salary only gets very good post-specialization — but you have a job for life\n- NEET is competitive but crackable with the right preparation strategy (most people who succeed give it 2+ attempts)\n\n**Alternatives if NEET doesn't work out:**\n- BPT (Physiotherapy), B.Sc Nursing, B.Pharm — all part of healthcare, all well-paying\n- MBBS from abroad (Russia, China, Philippines) — valid option, requires FMGE exam to practice in India\n\nIs NEET your primary concern, or the career path itself?`,
        kn: `ವೈದ್ಯಕೀಯ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ಮತ್ತು ಸ್ಥಿರ ವೃತ್ತಿ, ಆದರೆ ಮಹತ್ತರ ಬದ್ಧತೆ ಬೇಕು.\n\n- MBBS 5.5 ವರ್ಷ + ಇಂಟರ್ನ್‌ಶಿಪ್\n- NEET ಸ್ಪರ್ಧಾತ್ಮಕ ಆದರೆ ಯೋಗ್ಯ ತಯಾರಿಯಿಂದ ಸಾಧ್ಯ\n- ಪರ್ಯಾಯ: BPT, B.Sc Nursing, B.Pharm — ಎಲ್ಲವೂ ಉತ್ತಮ ಆರೋಗ್ಯ ಕ್ಷೇತ್ರ ವೃತ್ತಿಗಳು`,
        followUp: { en: "Is NEET your primary worry, or are you unsure if medicine is the right fit for you?", kn: "NEET ಮುಖ್ಯ ಚಿಂತೆಯೇ, ಅಥವಾ ವೈದ್ಯಕೀಯ ಸರಿಯಾದ ಮಾರ್ಗ ಹೌದೇ ಎಂದು ಸಂಶಯವಿದೆಯೇ?" }
    },

    // ── Regional / language / tier-2 city concerns ────────────────
    regional_concerns: {
        keywords: ['small town', 'village', 'rural', 'tier 2', 'tier 3', 'regional', 'local', 'kannada', 'hindi medium', 'state board', 'cbse vs state', 'language barrier', 'english problem', 'communication'],
        en: `Your background — wherever you're from — is not a barrier. Here's why:\n\n- **State Board students** regularly crack JEE, NEET, and UPSC. The exam doesn't care about your board.\n- **Language**: India's top companies today hire for skills. English can be learned — and improving it is simpler than ever (YouTube, apps, practice).\n- **Tier-2/3 cities**: Remote work has made location far less relevant. Many top tech companies hire from anywhere now.\n- **Regional languages as advantage**: Knowing Kannada, Hindi, or regional languages gives you an edge in government jobs, education, and research careers.\n\nWhere you start doesn't define where you finish!`,
        kn: `ನೀವು ಎಲ್ಲಿಂದ ಬಂದರೂ ಅದು ಅಡಚಣೆಯಲ್ಲ:\n\n- ರಾಜ್ಯ ಮಂಡಳಿ ವಿದ್ಯಾರ್ಥಿಗಳು JEE, NEET, UPSC ಕ್ರ್ಯಾಕ್ ಮಾಡುತ್ತಾರೆ.\n- ಇಂಗ್ಲಿಷ್ ಕಲಿಯಬಹುದು — YouTube, Apps ಮೂಲಕ.\n- ರಿಮೋಟ್ ವರ್ಕ್ ಸ್ಥಳ ಕಡಿಮೆ ಪ್ರಸ್ತುತ ಮಾಡಿದೆ.\n- ಕನ್ನಡ/ಹಿಂದಿ ತಿಳಿಯುವುದು ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಮತ್ತು ಶಿಕ್ಷಣ ಕ್ಷೇತ್ರದಲ್ಲಿ ಅನುಕೂಲ.`,
        followUp: { en: "Is there a specific career you're worried isn't accessible because of where you're from?", kn: "ನೀವು ಎಲ್ಲಿಂದ ಎಂಬ ಕಾರಣದಿಂದ ತಲುಪಲು ಸಾಧ್ಯವಿಲ್ಲ ಎಂದು ಚಿಂತೆ ಆಗಿರುವ ನಿರ್ದಿಷ್ಟ ವೃತ್ತಿ ಇದೆಯೇ?" }
    },

    // ── Gap year / taking a break ─────────────────────────────────
    gap_year: {
        keywords: ['gap year', 'taking a break', 'year off', 'drop year', 'dropper', 'repeat year', 'take a year', 'wait a year'],
        en: `A gap year is a completely valid choice — and can be one of the best decisions you make!\n\n**When a gap year makes sense:**\n- You have a clear goal (re-attempt JEE/NEET, prepare for an exam) and a solid plan\n- You're using the time to explore, intern, or build a portfolio\n\n**When to be careful:**\n- A gap year without structure can hurt motivation — make a week-by-week schedule\n- If you don't have a specific goal, a gap year might delay things without benefit\n\n**What it won't do:** It won't close doors to you. Colleges and employers rarely penalize a year gap that was used productively.`,
        kn: `ಒಂದು ವರ್ಷ ಬ್ರೇಕ್ ಸಂಪೂರ್ಣ ಸಮರ್ಪಕ ಆಯ್ಕೆ:\n\n- ಸ್ಪಷ್ಟ ಗುರಿ ಮತ್ತು ಯೋಜನೆ ಇದ್ದರೆ (JEE/NEET ಮರು-ಪ್ರಯತ್ನ) ಉತ್ತಮ\n- ರಚನೆ ಇಲ್ಲದ ವರ್ಷ ಪ್ರೇರಣೆ ಹಾನಿ ಮಾಡಬಹುದು — ವಾರ-ವಾರ ದಿನಚರಿ ಮಾಡಿ\n- ವಿದ್ಯಾಲಯಗಳು ಮತ್ತು ಉದ್ಯೋಗದಾತರು ಉತ್ಪಾದಕ ಅಂತರ ವರ್ಷಕ್ಕೆ ದಂಡ ವಿಧಿಸುವುದಿಲ್ಲ.`,
        followUp: { en: "What's your main goal for the gap year — exam prep, exploration, work experience, or something else?", kn: "ಅಂತರ ವರ್ಷದ ಮುಖ್ಯ ಗುರಿ ಏನು — ಪರೀಕ್ಷೆ ತಯಾರಿ, ಅನ್ವೇಷಣೆ, ಕೆಲಸ, ಅಥವಾ ಬೇರೆ?" }
    },

    // ── Startup / entrepreneurship ────────────────────────────────
    startup: {
        keywords: ['startup', 'own business', 'entrepreneur', 'self employed', 'business idea', 'freelance', 'want to start', 'start my own', 'be my own boss'],
        en: `Entrepreneurship is exciting and very much possible even right out of college!\n\n**Key things to build now:**\n- **Domain Expertise**: Know your space deeply — don't start a startup just for the sake of it\n- **Network**: Connect with mentors, join college entrepreneurship cells, attend startup events\n- **Start Small**: Many successful companies started as college projects or freelance gigs\n- **Funding Ecosystem**: India has a vibrant ecosystem — NASSCOM iDEA, Startup India, BIRAC for biotech, IIT/IIM incubators\n\n**Honest Reality**: Most startups fail — but the skills you build are incredibly valuable and make you hireable anywhere. The experience itself is never wasted.`,
        kn: `ಉದ್ಯಮಶೀಲತೆ ರೋಮಾಂಚಕ ಮತ್ತು ಕಾಲೇಜಿನಿಂದಲೇ ಸಾಧ್ಯ!\n\n- **ಡೊಮೇನ್ ಪರಿಣತಿ**: ನಿಮ್ಮ ಕ್ಷೇತ್ರ ಆಳವಾಗಿ ತಿಳಿಯಿರಿ\n- **ನೆಟ್‌ವರ್ಕ್**: ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ\n- **ಸಣ್ಣದರಿಂದ ಶುರು**: ಕಾಲೇಜು ಯೋಜನೆ ಅಥವಾ ಫ್ರೀಲಾನ್ಸ್ ಮೂಲಕ ಸಾಧ್ಯ\n- **ಧನಸಹಾಯ**: Startup India, IIT/IIM Incubators ಲಭ್ಯ`,
        followUp: { en: "Do you already have a business idea in mind, or are you still exploring what problem you'd want to solve?", kn: "ಈಗಾಗಲೇ ವ್ಯಾಪಾರ ಯೋಚನೆ ಇದೆಯೇ, ಅಥವಾ ಇನ್ನೂ ಯಾವ ಸಮಸ್ಯೆ ಬಗೆಹರಿಸಬೇಕು ಎಂದು ಅನ್ವೇಷಿಸುತ್ತಿದ್ದೀರಾ?" }
    },
};

/**
 * Scores how well a piece of user text matches a given topic.
 * Uses whole-word regex matching to avoid false positives like
 * "fee" matching inside "feel", or "ms" matching inside "compass".
 */
function scoreTopic(text, topic) {
    const lower = text.toLowerCase();
    let score = 0;
    for (const kw of topic.keywords) {
        const escaped = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`\\b${escaped}\\b`);
        if (re.test(lower)) {
            score += kw.split(' ').length; // multi-word keywords score higher
        }
    }
    return score;
}

/**
 * Given any free-text user input, finds the best matching topic
 * and returns { response, followUp } in the right language.
 *
 * Returns null if no good match (score below threshold).
 */
export function handleFreeText(text, lang = 'en') {
    let bestTopic = null;
    let bestScore = 0;

    for (const topic of Object.values(TOPIC_RESPONSES)) {
        const score = scoreTopic(text, topic);
        if (score > bestScore) {
            bestScore = score;
            bestTopic = topic;
        }
    }

    // Minimum threshold — at least one keyword must match
    if (!bestTopic || bestScore === 0) return null;

    return {
        response: bestTopic[lang] || bestTopic.en,
        followUp: bestTopic.followUp?.[lang] || bestTopic.followUp?.en || null,
    };
}
