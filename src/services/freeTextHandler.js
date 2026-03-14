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
        keywords: ['parents', 'family', 'mom', 'dad', 'father', 'mother', 'forcing', 'pressure', 'force me', 'they want', 'my parents want', 'parent pressure', 'nagging', 'mummy', 'daddy', 'ghar wale', 'log kehte', 'society pressure', 'relatives', 'gharwale', 'bade log', 'everyone says', 'people expect'],
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
        keywords: ['money', 'salary', 'earn', 'earning', 'income', 'rich', 'poor', 'paying job', 'highest paying', 'most money', 'financially', 'afford', 'fee', 'expenses', 'loan', 'scholarship', 'paisa', 'kitna milega', 'good package', 'high package', 'package kitna', 'how much can i earn', 'how much do they earn', 'will i earn well'],
        en: `Money is a very valid concern! Here's an honest breakdown:\n\n- **Highest-Paying Fields in India**: CS/AI (8–60+ LPA), Finance/CA (10–40+ LPA), Medicine (6–30+ LPA post-specialization), Law (variable, high at top firms).\n- **Hidden Value**: Some lower-paying starting fields (like research or civil services) offer job security, prestige, and non-monetary benefits that are enormous.\n- **Skill Premium**: Regardless of field, specialization always raises your value. A mid-career CS professional with AI skills can earn 3x a generalist.\n- **Scholarships exist**: For most top programs! Don't let fees stop you from exploring a path — inform yourself first.\n\nDo you want me to show you the salary range for a specific career?`,
        kn: `ಹಣ ಒಂದು ಮಹತ್ವದ ಕಾಳಜಿ! ಪ್ರಾಮಾಣಿಕ ಮಾಹಿತಿ:\n\n- **ಭಾರತದಲ್ಲಿ ಹೆಚ್ಚು ಸಂಬಳ ನೀಡುವ ಕ್ಷೇತ್ರಗಳು**: CS/AI (8–60+ LPA), Finance/CA, ವೈದ್ಯಕೀಯ.\n- **ವಿಶೇಷತೆ ಮುಖ್ಯ**: ಯಾವ ಕ್ಷೇತ್ರವಾದರೂ ಪರಿಣತಿ ನಿಮ್ಮ ಮೌಲ್ಯ ಹೆಚ್ಚಿಸುತ್ತದೆ.\n- **ವಿದ್ಯಾರ್ಥಿ ವೇತನ**: ಹೆಚ್ಚಿನ ಉನ್ನತ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಲಭ್ಯವಿದೆ!`,
        followUp: { en: "Would you like to see the salary range for a specific career you have in mind?", kn: "ನಿಮ್ಮ ಮನಸ್ಸಿನಲ್ಲಿರುವ ಯಾವುದೇ ವೃತ್ತಿಯ ಸಂಬಳ ವ್ಯಾಪ್ತಿ ತೋರಿಸಲೇ?" }
    },

    // ── Job market / employment doubt ─────────────────────────────
    job_market: {
        keywords: ['job market', 'jobs available', 'unemployed', 'unemployment', 'placement', 'hire', 'hiring', 'companies', 'scope', 'future scope', 'job security', 'stable career', 'demand', 'market', 'koi future', 'is it worth it', 'any scope', 'good scope', 'career scope', 'naukri milegi', 'jobs milenge'],
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

    // ── Exam prep strategy ────────────────────────────────────────
    exam_prep_tips: {
        priority: true,
        keywords: ['how to crack', 'crack jee', 'crack neet', 'crack upsc', 'prepare for jee', 'prepare for neet', 'neet preparation', 'jee preparation', 'upsc preparation', 'study tips', 'how to study', 'preparation tips', 'exam strategy', 'study plan', 'revision tips', 'mock test', 'coaching', 'self study'],
        en: `Here are proven strategies to crack competitive exams in India:\n\n**For JEE (Mains & Advanced):**\n- NCERT first — 100% mastery before any coaching material\n- Practice 50+ problems per chapter from DPP sheets or previous papers\n- JEE Mains: target 90%+ for good NITs; Advanced: selective preparation is fine\n\n**For NEET:**\n- Biology is 50% of the paper — don't neglect it for Physics/Chemistry\n- NCERT Biology cover-to-cover is non-negotiable\n- Start mock tests at least 6 months before the exam\n\n**For UPSC:**\n- Newspaper daily (The Hindu/Indian Express) — 1 hour minimum\n- Standard books first (Laxmikanth, Spectrum, NCERT Geography)\n- Answer writing practice from Day 1, not just reading\n\n**Universal tips:**\n- Aim for consistency over intensity — 6 focused hours beats 14 distracted hours\n- Weekly revision > last-minute cramming\n- Sleep 7–8 hours — memory consolidation happens during sleep`,
        kn: `ಭಾರತದ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆ ಕ್ರ್ಯಾಕ್ ಮಾಡಲು ಸಾಬೀತಾದ ತಂತ್ರಗಳು:\n\n- **NCERT ಮೊದಲು**: ಮೂಲ ಪಠ್ಯ 100% ಮಾಸ್ಟರ್ ಮಾಡಿ\n- **ನಿಯಮಿತ ಅಭ್ಯಾಸ**: ಉತ್ಸಾಹಕ್ಕಿಂತ ಸ್ಥಿರತೆ ಮುಖ್ಯ\n- **ಮಾಕ್ ಟೆಸ್ಟ್**: ಪರೀಕ್ಷೆಗಿಂತ 6 ತಿಂಗಳ ಮೊದಲೇ ಶುರು ಮಾಡಿ\n- **ನಿದ್ದೆ**: 7-8 ಗಂಟೆ ನಿದ್ದೆ ಸ್ಮರಣ ಬಲಪಡಿಸುತ್ತದೆ`,
        followUp: { en: "Which exam are you preparing for — JEE, NEET, UPSC, or something else?", kn: "ನೀವು ಯಾವ ಪರೀಕ್ಷೆಗೆ ತಯಾರಿ ನಡೆಸುತ್ತಿದ್ದೀರಿ — JEE, NEET, UPSC, ಅಥವಾ ಬೇರೆ?" }
    },

    // ── Mental health / exam stress ───────────────────────────────
    mental_health_stress: {
        priority: true,
        keywords: ['stressed out', 'stress', 'anxiety', 'anxious', 'panic', 'burnt out', 'burnout', 'depressed', 'depression', 'overwhelmed', 'cant cope', 'can\'t cope', 'mental health', 'feeling low', 'hopeless', 'no motivation', 'lost motivation', 'tired of studying', 'boards pressure', 'exam fear', 'exam anxiety', 'fear of failure', 'scared', 'scared of failing', 'so scared', 'nervous', 'very nervous', 'worried', 'so worried', 'crying', 'want to cry', 'feeling bad', 'feeling horrible', 'feel like giving up', 'giving up', 'too much pressure', 'cant handle', 'yaar help', 'kya karu', 'what do i do', 'i am lost', 'feeling lost'],
        en: `What you're feeling is completely valid — and more students feel this than you'd think.\n\n**Right now:**\n- **Step away for 15 minutes** — go for a walk, drink water, breathe. This isn't procrastination, it's biology.\n- **Talk to someone** — a friend, a teacher, or a counselor. Bottling it up only makes it worse.\n- **iCall helpline (India)**: 9152987821 — free, confidential, professional counseling.\n\n**Longer-term:**\n- Break your study schedule into 45-minute blocks with 10-minute breaks (Pomodoro technique)\n- Write down your worries — externalizing anxiety reduces its mental load\n- One exam result does not define your entire career. Many successful people failed exams they thought were "everything."\n\nYour mental health matters more than any result. You are not behind — you are exactly where you're supposed to be.`,
        kn: `ನೀವು ಅನುಭವಿಸುತ್ತಿರುವುದು ಸಂಪೂರ್ಣ ಮಾನ್ಯ — ಅನೇಕ ವಿದ್ಯಾರ್ಥಿಗಳು ಹೀಗೆ ಅನಿಸುತ್ತದೆ.\n\n- **15 ನಿಮಿಷ ಬಿಡುಗಡೆ**: ನಡೆದಾಡಿ, ನೀರು ಕುಡಿಯಿರಿ, ಉಸಿರು ತೆಗೆಯಿರಿ.\n- **ಮಾತನಾಡಿ**: ಗೆಳೆಯ, ಶಿಕ್ಷಕ, ಅಥವಾ ಸಲಹೆಗಾರರೊಂದಿಗೆ.\n- **iCall helpline**: 9152987821 — ಉಚಿತ ಮತ್ತು ಗೋಪ್ಯ ಸಲಹೆ.\n- ಒಂದು ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶ ನಿಮ್ಮ ಜೀವನ ನಿರ್ಧರಿಸುವುದಿಲ್ಲ.`,
        followUp: { en: "Is this about a specific exam or more of a general feeling of overwhelm? Either way, I'm here.", kn: "ಇದು ನಿರ್ದಿಷ್ಟ ಪರೀಕ್ಷೆ ಬಗ್ಗೆಯೇ ಅಥವಾ ಸಾಮಾನ್ಯ ಒತ್ತಡ ಭಾವನೆಯೇ? ಹೇಗಿದ್ದರೂ ನಾನು ಇಲ್ಲಿದ್ದೇನೆ." }
    },

    // ── Commerce stream doubt ─────────────────────────────────────
    commerce_doubt: {
        keywords: ['commerce worth', 'is commerce good', 'commerce scope', 'bcom', 'b.com', 'bba good', 'bba or bcom', 'commerce career', 'commerce after 12', 'commerce jobs', 'ca or bba', 'scope in commerce', 'commerce without maths', 'commerce with maths'],
        en: `Commerce is one of the strongest streams in India — and massively underestimated!\n\n**Top career paths from Commerce:**\n- **CA (Chartered Accountant)**: One of the highest-paying professional qualifications. Average salary post-articleship: ₹7–25 LPA\n- **BBA → MBA**: Opens management, marketing, HR, and consulting doors\n- **B.Com + CFA/CMA**: Finance and investment analysis roles globally\n- **Company Secretary (CS)**: Corporate law, compliance — a niche with very low competition\n- **Banking/Insurance**: IBPS, SBI PO, LIC AAO — stable, well-paying government jobs\n\n**Commerce with Maths** adds actuarial science, data analytics, and economics research as options.\n\n**Commerce without Maths** still covers CA, CS, BBA, BMS, and most banking exams.`,
        kn: `ವಾಣಿಜ್ಯ ಭಾರತದ ಅತ್ಯಂತ ಶಕ್ತಿಶಾಲಿ ಮತ್ತು ಕಡಿಮೆ ಮೌಲ್ಯ ಮಾಡಲ್ಪಡುವ ವಿಭಾಗ!\n\n- **CA**: ಭಾರತದ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ಮತ್ತು ಹಣಕಾಸು ತರಿಸುವ ಅರ್ಹತೆ\n- **BBA → MBA**: ನಿರ್ವಹಣೆ, ಮಾರ್ಕೆಟಿಂಗ್, HR ಕ್ಷೇತ್ರ ತೆರೆಯುತ್ತದೆ\n- **ಬ್ಯಾಂಕಿಂಗ್/ವಿಮೆ**: ಸ್ಥಿರ ಸರ್ಕಾರಿ ವೃತ್ತಿ\n- ಗಣಿತದ ಜೊತೆ ವಾಣಿಜ್ಯ: Actuarial Science, Data Analytics ಅವಕಾಶ`,
        followUp: { en: "Do you have Maths in your Commerce stream, or without — and which career interests you most?", kn: "ನಿಮ್ಮ ವಾಣಿಜ್ಯದಲ್ಲಿ ಗಣಿತ ಇದೆಯೇ? ಮತ್ತು ಯಾವ ವೃತ್ತಿ ಹೆಚ್ಚು ಆಸಕ್ತಿ ಹುಟ್ಟಿಸುತ್ತದೆ?" }
    },

    // ── Coding / programming interest ─────────────────────────────
    coding_interest: {
        keywords: ['i love coding', 'love programming', 'enjoy coding', 'i like coding', 'spend time coding', 'good at coding', 'coding hobby', 'leetcode', 'hackathon', 'build apps', 'make websites', 'web development', 'app development', 'programming interest', 'i code', 'software interest'],
        en: `That's a fantastic strength to have — coding skills open an enormous number of doors!\n\n**Career paths that reward strong coding:**\n| Path | What you build |\n|---|---|\n| Software Engineer | Products, apps, systems at tech companies |\n| AI/ML Engineer | Intelligent models, recommendation systems |\n| Cybersecurity Analyst | Defenses, ethical hacking |\n| Game Developer | Games, simulations, interactive experiences |\n| Full-Stack Developer | Web apps (front end + back end) |\n| Data Engineer | Pipelines, databases, analytics systems |\n\n**To stand out:** Build 2–3 real projects (not just tutorials), put them on GitHub, and contribute to open-source. That portfolio matters more than your college's ranking.`,
        kn: `ಕೋಡಿಂಗ್ ಅದ್ಭುತ ಕೌಶಲ್ಯ — ಇದು ಅಪಾರ ಅವಕಾಶ ತೆರೆಯುತ್ತದೆ!\n\n- **Software Engineer**: ಉತ್ಪನ್ನ, ಅಪ್ಲಿಕೇಷನ್ ನಿರ್ಮಿಸಿ\n- **AI/ML Engineer**: ಬುದ್ಧಿವಂತ ಮಾದರಿ ಅಭಿವೃದ್ಧಿ\n- **Game Developer**: ಆಟ ಮತ್ತು ಸಿಮ್ಯುಲೇಷನ್\n- **ಸಲಹೆ**: GitHub ನಲ್ಲಿ 2–3 ನಿಜ ಯೋಜನೆ ಹಾಕಿ — ಕಾಲೇಜಿನ ಶ್ರೇಣಿಗಿಂತ ಇದು ಮುಖ್ಯ`,
        followUp: { en: "What kind of things do you enjoy building — websites, apps, games, or something data/AI related?", kn: "ನೀವು ಏನು ನಿರ್ಮಿಸಲು ಇಷ್ಟಪಡುತ್ತೀರಿ — ವೆಬ್‌ಸೈಟ್, ಅಪ್ಲಿಕೇಷನ್, ಆಟ, ಅಥವಾ ಡೇಟಾ/AI?" }
    },

    // ── Creative / design interest ─────────────────────────────────
    creative_interest: {
        keywords: ['i love drawing', 'love art', 'enjoy drawing', 'i like art', 'creative person', 'good at drawing', 'art as career', 'design career', 'want creative job', 'love designing', 'graphic design', 'i sketch', 'painting career', 'creative field', 'love creating', 'visual arts'],
        en: `Being creative is a *massive* professional advantage — and the creative economy is booming!\n\n**High-growth creative careers:**\n- **UI/UX Design**: Designing apps and websites — avg salary ₹6–20 LPA, hugely in demand\n- **Graphic Design**: Brand identity, packaging, advertising for companies and agencies\n- **Animation & VFX**: India's animation industry is growing fast (Bollywood, OTT, gaming)\n- **Illustration**: Book covers, editorial, children's books, merchandise\n- **Fashion Design**: NIFT/NID entrance → fashion houses or your own label\n- **Architecture**: Combines technical drawing + spatial creativity (5-year B.Arch)\n- **Game Art**: Character and environment design for video games\n\n**Key schools**: NID, NIFT, Symbiosis Institute of Design, MIT Institute of Design — all have entrance exams.`,
        kn: `ಸೃಜನಶೀಲತೆ ದೊಡ್ಡ ವೃತ್ತಿ ಅನುಕೂಲ — ಮತ್ತು ಸೃಜನಶೀಲ ಆರ್ಥಿಕತೆ ಏರುತ್ತಿದೆ!\n\n- **UI/UX Design**: ಅಪ್ಲಿಕೇಷನ್ ಮತ್ತು ವೆಬ್‌ಸೈಟ್ ವಿನ್ಯಾಸ — ₹6–20 LPA\n- **Animation & VFX**: Bollywood, OTT, Gaming ಕ್ಷೇತ್ರ ವೇಗ ಬೆಳೆಯುತ್ತಿದೆ\n- **Fashion Design**: NIFT/NID ಪ್ರವೇಶ ಪರೀಕ್ಷೆ\n- **Architecture**: ತಾಂತ್ರಿಕ ಚಿತ್ರಕಲೆ + ಪ್ರಾದೇಶಿಕ ಸೃಜನಶೀಲತೆ`,
        followUp: { en: "Do you enjoy digital design (on a computer) or traditional art — or both? That shapes which path fits best.", kn: "ಡಿಜಿಟಲ್ ವಿನ್ಯಾಸ (ಕಂಪ್ಯೂಟರ್) ಇಷ್ಟ ಅಥವಾ ಸಾಂಪ್ರದಾಯಿಕ ಕಲೆ — ಅಥವಾ ಎರಡೂ?" }
    },

    // ── Sports career ─────────────────────────────────────────────
    sports_career: {
        keywords: ['sports career', 'love sports', 'play cricket', 'play football', 'athlete', 'sports management', 'sports science', 'physical education', 'pe teacher', 'fitness career', 'yoga career', 'sports psychology', 'coaching career', 'sports coaching', 'career in sports', 'sports or studies', 'can i play professionally'],
        en: `Sports is a real, growing career space in India — and it's not limited to playing professionally!\n\n**On-field paths:**\n- Professional athlete (Cricket, Football, Badminton, Athletics) — extremely competitive but very real\n- SAI (Sports Authority of India) selection programs + state-level competitions are the entry route\n\n**Off-field careers (massive and growing):**\n- **Sports Management**: IPL, Pro Kabaddi, ISL teams need managers, event planners, marketers\n- **Sports Science / Physio**: Working with athletes on performance and injury recovery\n- **Sports Journalism / Commentary**: ESPN, Star Sports, Cricinfo always need sharp people\n- **Fitness & Wellness**: Personal training, nutrition coaching — huge post-COVID demand\n- **Physical Education Teacher**: Government + private school PE positions with strong job security\n- **Sports Psychology**: Emerging field, very low competition, high impact\n\n**Key institutes**: LNIPE (Gwalior), NSNIS (Patiala), Manipal — all have specific sports programs.`,
        kn: `ಭಾರತದಲ್ಲಿ ಕ್ರೀಡೆ ನಿಜವಾದ ವೃತ್ತಿ ಅವಕಾಶ — ಕೇವಲ ಆಟದ ಕ್ಷೇತ್ರಕ್ಕೆ ಸೀಮಿತವಲ್ಲ!\n\n- **ಕ್ರೀಡಾ ನಿರ್ವಹಣೆ**: IPL, Pro Kabaddi ತಂಡಗಳಿಗೆ ನಿರ್ವಾಹಕರು ಬೇಕು\n- **ಕ್ರೀಡಾ ವಿಜ್ಞಾನ/ಫಿಜಿಯೋ**: ಕ್ರೀಡಾಪಟುಗಳೊಂದಿಗೆ ಕೆಲಸ\n- **ಶಾರೀರಿಕ ಶಿಕ್ಷಣ ಶಿಕ್ಷಕ**: ಸ್ಥಿರ ಸರ್ಕಾರಿ ಹುದ್ದೆ\n- **ಆರೋಗ್ಯ & ಫಿಟ್‌ನೆಸ್**: ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಪೋಷಣೆ ಸಲಹೆ`,
        followUp: { en: "Are you interested in playing professionally, or more in the management / coaching / science side of sports?", kn: "ವೃತ್ತಿಪರ ಆಟಗಾರನಾಗಬೇಕೇ, ಅಥವಾ ನಿರ್ವಹಣೆ / ತರಬೇತಿ / ಕ್ರೀಡಾ ವಿಜ್ಞಾನ ಭಾಗ ಇಷ್ಟ?" }
    },

    // ── Government job preference ─────────────────────────────────
    government_job: {
        priority: true,
        keywords: ['government job', 'sarkari naukri', 'sarkari job', 'stable job', 'secure job', 'bank po', 'bank exam', 'ssc', 'ssc cgl', 'ibps', 'rrb', 'group d', 'psc', 'state psc', 'civil services', 'ias preparation', 'ips preparation', 'prefer government', 'job security', 'pension', 'central government'],
        en: `Government jobs offer unmatched stability, and India has a wide variety of them!\n\n**Major Government Career Routes:**\n| Exam | Roles | Salary |\n|---|---|---|\n| UPSC CSE | IAS, IPS, IFS | ₹56K–2.5L/month + perks |\n| State PSC | Deputy Collector, DSP | ₹40K–1.5L/month |\n| IBPS PO/SBI PO | Bank Probationary Officer | ₹35K–60K/month |\n| SSC CGL | Tax Inspector, Auditor | ₹30K–70K/month |\n| RRB NTPC/Group D | Railways | ₹20K–45K/month |\n| Defence (NDA/CDS) | Army, Navy, Air Force Officer | ₹60K–2L/month |\n\n**Why government?** Pension, housing allowance, medical benefits, and job security no private company can match.\n\n**Start early**: Many toppers start UPSC prep in 2nd/3rd year of graduation. SSC and banking can be cleared with 6–12 months of focused prep.`,
        kn: `ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಅಸಮಾನ ಸ್ಥಿರತೆ ನೀಡುತ್ತದೆ!\n\n- **UPSC CSE**: IAS, IPS — ₹56K–2.5L/ತಿಂಗಳು + ಸೌಲಭ್ಯ\n- **IBPS PO/SBI PO**: ₹35K–60K/ತಿಂಗಳು\n- **SSC CGL**: ₹30K–70K/ತಿಂಗಳು\n- **Railway (RRB)**: ₹20K–45K/ತಿಂಗಳು\n- **ರಕ್ಷಣಾ ಸೇವೆ (NDA/CDS)**: ₹60K–2L/ತಿಂಗಳು`,
        followUp: { en: "Which type of government job interests you most — administrative (UPSC), banking, defence, or railway?", kn: "ಯಾವ ಸರ್ಕಾರಿ ವೃತ್ತಿ ಹೆಚ್ಚು ಆಸಕ್ತಿ ಹುಟ್ಟಿಸುತ್ತದೆ — ಆಡಳಿತ (UPSC), ಬ್ಯಾಂಕಿಂಗ್, ರಕ್ಷಣೆ, ಅಥವಾ ರೈಲ್ವೇ?" }
    },

    // ── Thank you / positive acknowledgement ──────────────────────
    thank_you: {
        priority: true,
        keywords: ['thank you', 'thanks', 'thank u', 'thx', 'ty', 'grateful', 'appreciate', 'that helped', 'very helpful', 'this is helpful', 'so helpful', 'you explained', 'great answer', 'that was helpful', 'good bot', 'nicely explained'],
        en: `You're very welcome! I'm glad that was helpful.\n\nFeel free to keep exploring — you can ask me about any career, compare two options, or dig into salary, growth, or day-in-life for any field you're curious about.`,
        kn: `ತುಂಬಾ ಸ್ವಾಗತ! ಅದು ಸಹಾಯಕರವಾಗಿದ್ದಕ್ಕೆ ಸಂತೋಷ.\n\nಯಾವ ವೃತ್ತಿ ಬಗ್ಗೆಯಾದರೂ ಕೇಳಿ — ಹೋಲಿಕೆ, ಸಂಬಳ, ಅಥವಾ ದೈನಂದಿನ ಜೀವನ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಲು ಸಿದ್ಧ.`,
        followUp: { en: "Is there anything else you'd like to explore — a career comparison, entrance exam tips, or a specific field?", kn: "ಇನ್ನೇನಾದರೂ ಅನ್ವೇಷಿಸಬೇಕೇ — ವೃತ್ತಿ ಹೋಲಿಕೆ, ಪ್ರವೇಶ ಪರೀಕ್ಷೆ ಸಲಹೆ, ಅಥವಾ ನಿರ್ದಿಷ್ಟ ಕ್ಷೇತ್ರ?" }
    },

    // ── Part-time / distance learning ────────────────────────────
    part_time_study: {
        priority: true,
        keywords: ['work while studying', 'study and work', 'part time study', 'distance education', 'correspondence course', 'ignou', 'online degree', 'evening college', 'working student', 'need to earn', 'study part time', 'distance learning', 'open university', 'can i work and study'],
        en: `Absolutely — studying while working is very common and completely manageable with the right plan!\n\n**Best options for working students in India:**\n- **IGNOU**: India's largest open university — accredited degrees in almost every field, very affordable (₹3K–20K total fees)\n- **Symbiosis CDAC / NMIMS Online**: Quality private online degrees with industry recognition\n- **UGC-approved Online Degrees**: IIT Madras, BITS Pilani, Amity all now offer fully accredited online degrees\n- **CA / CS Articleship**: Combines structured work + study by design — earns a salary while you qualify\n- **Certifications**: Google, AWS, Microsoft, Coursera — many are free or low-cost and highly valued by employers\n\n**Time management tips:**\n- Block 1.5–2 hours daily (early morning works best for most people)\n- Weekends for assignments and revision\n- Choose programs that have recorded lectures, not only live sessions`,
        kn: `ಕೆಲಸ ಮಾಡುತ್ತಾ ಓದಲು ಸಾಧ್ಯ — ಸರಿಯಾದ ಯೋಜನೆ ಇದ್ದರೆ!\n\n- **IGNOU**: ಭಾರತದ ಅತಿದೊಡ್ಡ ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯ — ಶುಲ್ಕ ₹3K–20K ಮಾತ್ರ\n- **IIT Madras / BITS Pilani Online**: UGC ಅನುಮೋದಿತ ಆನ್‌ಲೈನ್ ಡಿಗ್ರಿ\n- **Google, AWS, Coursera**: ಉಚಿತ/ಕಡಿಮೆ ಶುಲ್ಕದ ಉದ್ಯೋಗ-ಮೌಲ್ಯವುಳ್ಳ ಪ್ರಮಾಣ ಪತ್ರ`,
        followUp: { en: "What field are you hoping to study — I can point you to the best distance/online program for it.", kn: "ಯಾವ ಕ್ಷೇತ್ರ ಓದಬೇಕು ಎಂದು ಯೋಚಿಸುತ್ತಿದ್ದೀರಿ? ಅದಕ್ಕೆ ಅತ್ಯುತ್ತಮ ದೂರ/ಆನ್‌ಲೈನ್ ಕಾರ್ಯಕ್ರಮ ತೋರಿಸಲು ಸಾಧ್ಯ." }
    },

    // ── Startup / entrepreneurship ────────────────────────────────
    startup: {
        keywords: ['startup', 'own business', 'entrepreneur', 'self employed', 'business idea', 'freelance', 'want to start', 'start my own', 'be my own boss'],
        en: `Entrepreneurship is exciting and very much possible even right out of college!\n\n**Key things to build now:**\n- **Domain Expertise**: Know your space deeply — don't start a startup just for the sake of it\n- **Network**: Connect with mentors, join college entrepreneurship cells, attend startup events\n- **Start Small**: Many successful companies started as college projects or freelance gigs\n- **Funding Ecosystem**: India has a vibrant ecosystem — NASSCOM iDEA, Startup India, BIRAC for biotech, IIT/IIM incubators\n\n**Honest Reality**: Most startups fail — but the skills you build are incredibly valuable and make you hireable anywhere. The experience itself is never wasted.`,
        kn: `ಉದ್ಯಮಶೀಲತೆ ರೋಮಾಂಚಕ ಮತ್ತು ಕಾಲೇಜಿನಿಂದಲೇ ಸಾಧ್ಯ!\n\n- **ಡೊಮೇನ್ ಪರಿಣತಿ**: ನಿಮ್ಮ ಕ್ಷೇತ್ರ ಆಳವಾಗಿ ತಿಳಿಯಿರಿ\n- **ನೆಟ್‌ವರ್ಕ್**: ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ\n- **ಸಣ್ಣದರಿಂದ ಶುರು**: ಕಾಲೇಜು ಯೋಜನೆ ಅಥವಾ ಫ್ರೀಲಾನ್ಸ್ ಮೂಲಕ ಸಾಧ್ಯ\n- **ಧನಸಹಾಯ**: Startup India, IIT/IIM Incubators ಲಭ್ಯ`,
        followUp: { en: "Do you already have a business idea in mind, or are you still exploring what problem you'd want to solve?", kn: "ಈಗಾಗಲೇ ವ್ಯಾಪಾರ ಯೋಚನೆ ಇದೆಯೇ, ಅಥವಾ ಇನ್ನೂ ಯಾವ ಸಮಸ್ಯೆ ಬಗೆಹರಿಸಬೇಕು ಎಂದು ಅನ್ವೇಷಿಸುತ್ತಿದ್ದೀರಾ?" }
    },
};

// ── Exam specific encouraging details for mental health ────────
const EXAM_ADVICE = {
    neet: {
        en: `\n\n**NEET specific advice:** Focus on Biology NCERT — it's 50% of your marks. Don't let Physics anxiety ruin your Bio/Chem flow. You've got this!`,
        kn: `\n\n**NEET ನಿರ್ದಿಷ್ಟ ಸಲಹೆ:** ಜೀವಶಾಸ್ತ್ರ (Biology) NCERT ಮೇಲೆ ಗಮನಹರಿಸಿ — ಇದು ನಿಮ್ಮ ಅಂಕಗಳ 50% ಆಗಿದೆ. ಭೌತಶಾಸ್ತ್ರದ ಆತಂಕ ನಿಮ್ಮ ಮೆಡಿಕಲ್ ಕನಸಿಗೆ ಅಡ್ಡಿಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.`
    },
    jee: {
        en: `\n\n**JEE specific advice:** JEE is about accuracy, not just quantity. Focus on your strong topics first to build momentum. One tough paper doesn't define you!`,
        kn: `\n\n**JEE ನಿರ್ದಿಷ್ಟ ಸಲಹೆ:** JEE ಎಂದರೆ ನಿಖರತೆ. ಆತ್ಮವಿಶ್ವಾಸ ಹೆಚ್ಚಿಸಲು ನಿಮ್ಮ ಬಲವಾದ ವಿಷಯಗಳಿಂದ ಮೊದಲು ಪ್ರಾರಂಭಿಸಿ.`
    },
    upsc: {
        en: `\n\n**UPSC specific advice:** It's a marathon, not a sprint. Consistency is your superpower. Take it one day at a time.`,
        kn: `\n\n**UPSC ನಿರ್ದಿಷ್ಟ ಸಲಹೆ:** ಇದು ಮ್ಯಾರಾಥಾನ್ ಇದ್ದಂತೆ. ಸ್ಥಿರತೆ ಇರಲಿ. ದಿನದಿಂದ ದಿನಕ್ಕೆ ಹೆಜ್ಜೆ ಇಡಿ.`
    },
    boards: {
        en: `\n\n**Board Exam advice:** Boards are quite predictable — previous year papers are your best friend. You'll do much better than you think!`,
        kn: `\n\n**ಬೋರ್ಡ್ ಪರೀಕ್ಷೆ ಸಲಹೆ:** ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. ನೀವು ಅಂದುಕೊಂಡಿದ್ದಕ್ಕಿಂತ ಚೆನ್ನಾಗಿ ಮಾಡುತ್ತೀರಿ!`
    }
};

function injectExamAdvice(text, response, lang) {
    const lower = text.toLowerCase();
    if (/\bneet\b/.test(lower)) return response + (EXAM_ADVICE.neet[lang] || EXAM_ADVICE.neet.en);
    if (/\bjee\b/.test(lower)) return response + (EXAM_ADVICE.jee[lang] || EXAM_ADVICE.jee.en);
    if (/\bupsc\b/.test(lower)) return response + (EXAM_ADVICE.upsc[lang] || EXAM_ADVICE.upsc.en);
    if (/\b(boards?|10th|12th|class 10|class 12)\b/.test(lower)) return response + (EXAM_ADVICE.boards[lang] || EXAM_ADVICE.boards.en);
    return response;
}

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
/**
 * Same as handleFreeText but ONLY matches topics flagged with priority: true.
 * Called BEFORE the career resolver so non-career topics aren't intercepted.
 */
export function handlePriorityFreeText(text, lang = 'en') {
    let bestTopic = null;
    let bestScore = 0;

    for (const topic of Object.values(TOPIC_RESPONSES)) {
        if (!topic.priority) continue;
        const score = scoreTopic(text, topic);
        if (score > bestScore) {
            bestScore = score;
            bestTopic = topic;
        }
    }

    if (!bestTopic || bestScore === 0) return null;

    let response = bestTopic[lang] || bestTopic.en;
    // Special handling for mental health — check for specific exam context
    if (bestTopic === TOPIC_RESPONSES.mental_health_stress) {
        response = injectExamAdvice(text, response, lang);
    }

    return {
        response,
        followUp: bestTopic.followUp?.[lang] || bestTopic.followUp?.en || null,
    };
}

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

    let response = bestTopic[lang] || bestTopic.en;
    // Special handling for mental health — check for specific exam context
    if (bestTopic === TOPIC_RESPONSES.mental_health_stress) {
        response = injectExamAdvice(text, response, lang);
    }

    return {
        response,
        followUp: bestTopic.followUp?.[lang] || bestTopic.followUp?.en || null,
    };
}
