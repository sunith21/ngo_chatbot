/**
 * careerComparisons.js
 *
 * Structured data map for comparative and suitability questions.
 * e.g. "should I take engineering or medical", "will CS suit me", "CS vs CA"
 *
 * Each entry has:
 *   - careers: [id1, id2] — the two careers being compared
 *   - response: rich markdown comparison table
 *   - suitability: personality/interest match guide
 *   - followUp: question to keep conversation going
 */

const careerComparisons = {

    // ── CS / Software vs Medicine ──────────────────────────────────────────────
    'btech-cs-ai_mbbs': {
        careers: ['btech-cs-ai', 'mbbs'],
        keywords: [
            ['cs', 'medical'], ['software', 'doctor'], ['engineering', 'medicine'],
            ['computer science', 'mbbs'], ['it', 'neet'], ['coding', 'doctor'],
            ['tech', 'medical'], ['cs', 'mbbs'], ['engineering', 'medical'],
        ],
        sides: [
            { career: 'btech-cs-ai', hints: ['tech', 'systems', 'coding', 'code', 'software', 'build', 'ai', 'apps', 'computer', 'engineering', 'developer'] },
            { career: 'mbbs', hints: ['patient', 'treating', 'treat', 'doctor', 'medical', 'heal', 'diagnos', 'biology', 'hospital', 'medicine', 'clinical'] },
        ],
        response: `**Computer Science & AI vs Medicine (MBBS)**

| Factor | CS / Software Engineer | Doctor (MBBS) |
|--------|----------------------|---------------|
| **Duration** | 4 years (B.Tech) | 5.5 years + MD/MS (3 years) for specialization |
| **Entrance Exam** | JEE Main / JEE Advanced | NEET-UG |
| **Starting Salary** | 8–15 LPA | 6–12 LPA |
| **Senior Salary** | 40–80+ LPA | 25–60+ LPA (specialist) |
| **Job Security** | High (tech demand booming) | Very High (recession-proof) |
| **Work-Life Balance** | Good (flexible, remote possible) | Tough (night shifts, emergencies) |
| **Growth Path** | Manager → Architect → CTO | MBBS → MD/MS → Specialist |
| **Social Impact** | High (scale through technology) | Very High (direct patient care) |
| **Study Intensity** | High (maths, algorithms) | Extremely High (anatomy, clinical) |
| **Backup Options** | BCA, Data Science bootcamps | BDS, Nursing, Allied Health |`,
        suitability: `**Which suits YOU?**

Choose **CS/Engineering** if you:
- Love maths, logic, and building things
- Want good pay early (8+ LPA at entry)
- Want flexibility & remote work
- Are excited by AI, apps, and tech

Choose **Medicine** if you:
- Want to directly help people every day
- Are okay with a longer study path
- Have strong Biology + patience + empathy
- Want a career that will never go out of demand`,
        followUp: `Which resonates more with you — building tech systems, or diagnosing and treating patients?`,
    },

    // ── Core Engineering vs Medicine ───────────────────────────────────────────
    'btech-core_mbbs': {
        careers: ['btech-core', 'mbbs'],
        keywords: [
            ['mechanical', 'medical'], ['civil', 'doctor'], ['core engineering', 'medicine'],
            ['electrical', 'mbbs'], ['btech', 'neet'], ['engineering', 'doctor'],
        ],
        sides: [
            { career: 'btech-core', hints: ['infrastructure', 'build', 'bridge', 'machine', 'physical', 'construction', 'engineering', 'mechanical', 'civil', 'electrical'] },
            { career: 'mbbs', hints: ['patient', 'treating', 'treat', 'doctor', 'medical', 'heal', 'healthcare', 'biology', 'hospital', 'cure', 'clinical'] },
        ],
        response: `**Core Engineering vs Medicine (MBBS)**

| Factor | Core Engineering | Doctor (MBBS) |
|--------|-----------------|---------------|
| **Duration** | 4 years | 5.5+ years |
| **Entrance** | JEE Main / State CETs | NEET-UG |
| **Starting Salary** | 4–8 LPA | 6–12 LPA |
| **Senior Salary** | 20–30 LPA | 30–60+ LPA (specialist) |
| **Job Security** | Stable (infra, EV boom) | Very High |
| **Work Style** | Site work + office mix | Hospital / clinic |
| **Social Impact** | Build infrastructure | Save lives |
| **Passion Needed** | Physics, mechanics, design | Biology, empathy, patience |`,
        suitability: `**Which suits YOU?**

Choose **Core Engineering** if you:
- Love physics, mechanics, or construction
- Want to build bridges, machines, or power systems
- Prefer field work and practical problem-solving

Choose **Medicine** if you:
- Have strong Biology and love Healthcare
- Want a direct human connection in your work
- Are willing to invest in a longer (but rewarding) path`,
        followUp: `Are you more excited by building physical infrastructure, or by treating and curing people?`,
    },

    // ── CS vs CA ───────────────────────────────────────────────────────────────
    'btech-cs-ai_ca': {
        careers: ['btech-cs-ai', 'ca'],
        keywords: [
            ['cs', 'ca'], ['software', 'chartered accountant'], ['coding', 'ca'],
            ['computer science', 'ca'], ['it', 'finance'], ['tech', 'accounting'],
            ['engineering', 'ca'], ['programming', 'accountant'],
        ],
        sides: [
            { career: 'btech-cs-ai', hints: ['code', 'coding', 'software', 'business problem', 'product', 'tech', 'build', 'developer', 'app'] },
            { career: 'ca', hints: ['audit', 'finance', 'tax', 'accounting', 'numbers', 'financial', 'ca', 'chartered', 'cfo'] },
        ],
        response: `**Computer Science vs Chartered Accountancy (CA)**

| Factor | CS / Software Engineer | CA |
|--------|----------------------|----|
| **Duration** | 4 years (B.Tech) | 4.5–5 years (CA course) |
| **Entrance** | JEE Main | CA Foundation |
| **Starting Salary** | 8–15 LPA | 7–12 LPA |
| **Senior Salary** | 40–80+ LPA | 30–80+ LPA (partner level) |
| **Job Security** | High | Very High |
| **Work Style** | Product teams, remote friendly | Corporate, audit-heavy |
| **Global Demand** | Extremely high | High (ACCA for global) |
| **Skills Required** | Maths, coding, logic | Accounting, law, taxation |
| **Exam Difficulty** | JEE (tough but 1 shot) | CA exams (multi-stage, high fail rate) |`,
        suitability: `**Which suits YOU?**

Choose **CS** if you:
- Love coding, algorithms, and building software
- Want to work in fast-paced tech companies
- Are excited by AI, cloud, or product development

Choose **CA** if you:
- Have a mind for numbers, law, and finance
- Want a professional degree with strong credibility
- Are interested in auditing, taxation, or CFO-level roles`,
        followUp: `Do you see yourself writing code to solve business problems, or auditing companies and managing financial strategy?`,
    },

    // ── Engineering vs Law ─────────────────────────────────────────────────────
    'btech-core_law-integrated': {
        careers: ['btech-core', 'law-integrated'],
        keywords: [
            ['engineering', 'law'], ['btech', 'lawyer'], ['engineering', 'lawyer'],
            ['technical', 'law'], ['engineer', 'advocate'],
        ],
        sides: [
            { career: 'btech-core', hints: ['engineering', 'technical', 'build', 'problem', 'machine', 'construct', 'physics'] },
            { career: 'law-integrated', hints: ['law', 'legal', 'argument', 'court', 'justice', 'advocate', 'lawyer', 'debate', 'contract'] },
        ],
        response: `**Engineering vs Law (BA LLB)**

| Factor | Engineering | Law (BA LLB) |
|--------|-------------|-------------|
| **Duration** | 4 years | 5 years (integrated) |
| **Entrance** | JEE Main / State CETs | CLAT / AILET |
| **Starting Salary** | 4–15 LPA | 6–15 LPA (top firms) |
| **Senior Salary** | 20–40+ LPA | 50+ LPA (top lawyers) |
| **Job Security** | Stable | High |
| **Growth Path** | Engineer → Manager → CTO/Entrepreneur | Associate → Partner → Senior Counsel |
| **Work Style** | Technical, analytical, project-based | Research, argument, courtroom/office |
| **Skills Needed** | Maths, physics, technical thinking | Logic, reading, communication |`,
        suitability: `**Which suits YOU?**

Choose **Engineering** if you:
- Are strong in Maths and Physics
- Like technical problem solving and building things
- Prefer structured corporate or field work

Choose **Law** if you:
- Love debate, argument, and critical reading
- Are passionate about justice or corporate governance
- Enjoy research and can handle long working hours`,
        followUp: `Between engineering problems and legal arguments — which type of challenge energizes you more?`,
    },

    // ── CS vs Engineering ──────────────────────────────────────────────────────
    'btech-cs-ai_btech-core': {
        careers: ['btech-cs-ai', 'btech-core'],
        keywords: [
            ['cs', 'mechanical'], ['software', 'civil'], ['computer science', 'core engineering'],
            ['it', 'electrical'], ['coding', 'engineering'], ['cs', 'core'],
            ['computer', 'mechanical'], ['ai', 'civil'],
        ],
        sides: [
            { career: 'btech-cs-ai', hints: ['code', 'coding', 'software', 'app', 'ai', 'tech', 'computer', 'digital', 'write code', 'build software'] },
            { career: 'btech-core', hints: ['machine', 'physical', 'design', 'civil', 'mechanical', 'construction', 'bridge', 'hardware', 'build system'] },
        ],
        response: `**CS / Software Engineering vs Core Engineering**

| Factor | CS / AI | Core Engineering |
|--------|---------|-----------------|
| **Duration** | 4 years | 4 years |
| **Entrance** | JEE / BITSAT / VITEEE | JEE / State CETs |
| **Starting Salary** | 8–15 LPA | 4–8 LPA |
| **Senior Salary** | 40–80+ LPA | 20–35 LPA |
| **Remote Work** | Very common | Rare (site work) |
| **Job Market** | Explosive growth | Stable, infra-driven |
| **Global Scope** | Very high | Medium |
| **Skills** | Coding, algorithms | Physics, design, mechanics |`,
        suitability: `**Which suits YOU?**

Choose **CS** if you:
- Love coding and want to build apps / AI / tech products
- Want a high-paying early career with remote flexibility
- Are excited by rapid innovation in tech

Choose **Core Engineering** if you:
- Love physics, mechanics, and real-world construction
- Want to work on physical infrastructure (bridges, EVs, factories)
- Prefer hands-on, tangible work over screens`,
        followUp: `Do you get more excited by writing code and building software, or by designing machines and physical systems?`,
    },

    // ── Medicine vs Law ─────────────────────────────────────────────────────────
    'mbbs_law-integrated': {
        careers: ['mbbs', 'law-integrated'],
        keywords: [
            ['doctor', 'lawyer'], ['medical', 'law'], ['medicine', 'legal'],
            ['mbbs', 'llb'], ['doctor', 'advocate'], ['physician', 'law'],
        ],
        sides: [
            { career: 'mbbs', hints: ['hospital', 'patient', 'treating', 'treat', 'heal', 'doctor', 'medical', 'biology', 'clinical', 'medicine'] },
            { career: 'law-integrated', hints: ['court', 'courtroom', 'boardroom', 'legal', 'argue', 'case', 'contract', 'lawyer', 'justice', 'law'] },
        ],
        response: `**Medicine (MBBS) vs Law (BA LLB)**

| Factor | MBBS (Doctor) | Law (BA LLB) |
|--------|--------------|-------------|
| **Duration** | 5.5 years + specialization | 5 years |
| **Entrance** | NEET-UG | CLAT / AILET |
| **Starting Salary** | 6–12 LPA | 6–15 LPA |
| **Senior Salary** | 30–60+ LPA (specialist) | 50+ LPA (top lawyers) |
| **Work Hours** | Very long (incl. night shifts) | Long (60+ hrs in corporate) |
| **Social Respect** | Extremely high | Very High |
| **Skills** | Biology, empathy, clinical | Logic, debate, reading |
| **Job Security** | Very High | High |`,
        suitability: `**Which suits YOU?**

Choose **Medicine** if you:
- Are fascinated by human biology and healthcare
- Want to directly heal and help patients
- Are patient, empathetic, and comfortable with long study

Choose **Law** if you:
- Are sharp at logic, debate, and critical thinking
- Want to fight for justice or corporate governance
- Prefer courtrooms, contracts, and legal strategy`,
        followUp: `Do you see yourself in a hospital treating patients, or in a courtroom/boardroom arguing cases?`,
    },

    // ── CS vs Management ──────────────────────────────────────────────────────
    'btech-cs-ai_management-bba': {
        careers: ['btech-cs-ai', 'management-bba'],
        keywords: [
            ['cs', 'bba'], ['software', 'management'], ['engineering', 'mba'],
            ['tech', 'business'], ['coding', 'management'], ['it', 'bba'],
            ['computer', 'marketing'], ['ai', 'management'],
        ],
        sides: [
            { career: 'btech-cs-ai', hints: ['product', 'build', 'code', 'software', 'technical', 'engineering', 'developer', 'tech'] },
            { career: 'management-bba', hints: ['business', 'team', 'lead', 'strategy', 'management', 'marketing', 'mba', 'bba', 'people', 'communication'] },
        ],
        response: `**CS / Engineering vs Management (BBA/MBA)**

| Factor | CS / Engineering | BBA / Management |
|--------|-----------------|-----------------|
| **Duration** | 4 years | 3 years BBA + 2 years MBA |
| **Entrance** | JEE Main | IPMAT / CAT (for MBA) |
| **Starting Salary** | 8–15 LPA | 4–10 LPA (BBA), 12–30 LPA (IIM MBA) |
| **Senior Salary** | 40–80+ LPA | 30–80+ LPA (top MBA) |
| **Job Market** | Tech companies, product firms | All sectors, consulting, finance |
| **Skills** | Technical, analytical | Communication, strategy, leadership |
| **Remote Work** | Very common | Mixed |`,
        suitability: `**Which suits YOU?**

Choose **CS/Engineering** if you:
- Love technical problem-solving and building products
- Want specialized, high-demand skills
- Are strong in maths and logic

Choose **Management (BBA/MBA)** if you:
- Love leading teams, strategy, and business
- Are strong in communication and people skills
- Want to work across industries and functions

> 💡 **Pro Tip**: Many top CS graduates pursue an MBA later (IIM MBA = 25–80 LPA average!) — the two are complementary, not mutually exclusive.`,
        followUp: `Do you prefer building the product or building the business around it?`,
    },

    // ── CA vs Civil Services ───────────────────────────────────────────────────
    'ca_civil-services': {
        careers: ['ca', 'civil-services'],
        keywords: [
            ['ca', 'ias'], ['chartered accountant', 'upsc'], ['ca', 'civil services'],
            ['finance', 'government'], ['ca', 'ips'], ['accounting', 'civil service'],
        ],
        sides: [
            { career: 'ca', hints: ['corporate', 'boardroom', 'financial', 'finance', 'tax', 'audit', 'ca', 'accounting'] },
            { career: 'civil-services', hints: ['district', 'collector', 'policy', 'government', 'ias', 'ips', 'upsc', 'public service', 'governance', 'civil'] },
        ],
        response: `**Chartered Accountancy (CA) vs Civil Services (UPSC)**

| Factor | CA | Civil Services (IAS/IPS) |
|--------|----|-|
| **Duration** | 4.5–5 years | Graduation + 1–2 years prep |
| **Exam** | CA Foundation → Inter → Final | UPSC Prelims + Mains + Interview |
| **Starting Salary** | 7–12 LPA | 10–14 LPA + perks/accommodation |
| **Senior Salary** | 30–80+ LPA (partner level) | Secretary-level + immense benefits |
| **Prestige** | Very High (corporate) | Extremely High (social) |
| **Job Security** | Very High | Guaranteed (government) |
| **Power & Impact** | Financial decisions at scale | Shape policy for millions |
| **Work Style** | Corporate, office-based | Administration, policy, field |`,
        suitability: `**Which suits YOU?**

Choose **CA** if you:
- Have a sharp mind for numbers, tax, and financial law
- Want high corporate earnings and professional credibility
- Prefer working in the structured corporate world

Choose **Civil Services** if you:
- Want authority and the power to change lives directly
- Are passionate about public service and governance
- Are willing to put in 2+ years of intense UPSC preparation`,
        followUp: `Do you see yourself in a corporate boardroom making financial decisions, or as a District Collector shaping policy on the ground?`,
    },

    // ── Medicine vs Psychology ─────────────────────────────────────────────────
    'mbbs_psychology': {
        careers: ['mbbs', 'psychology'],
        keywords: [
            ['doctor', 'psychologist'], ['mbbs', 'psychology'], ['medicine', 'counseling'],
            ['physician', 'mental health'], ['medical', 'psychology'],
        ],
        sides: [
            { career: 'mbbs', hints: ['physical', 'illness', 'clinical', 'surgery', 'hospital', 'treat', 'emergency', 'mbbs', 'doctor'] },
            { career: 'psychology', hints: ['mind', 'mental', 'counseling', 'counsel', 'behavior', 'emotion', 'therapy', 'psycholog', 'mental health'] },
        ],
        response: `**Medicine (MBBS) vs Psychology**

| Factor | MBBS (Doctor) | Psychology |
|--------|--------------|-----------|
| **Duration** | 5.5 years | 3 years (UG) + 2 years (Masters) |
| **Entrance** | NEET-UG | CUET / University Merit |
| **Starting Salary** | 6–12 LPA | 3–5 LPA |
| **Senior Salary** | 30–60+ LPA | 10–25+ LPA (private practice) |
| **Work Hours** | Very demanding | More balanced |
| **Patient Interaction** | Clinical (physical care) | Counseling (mental care) |
| **Study Depth** | Anatomy, surgery, diagnostics | Behavior, cognition, therapy |`,
        suitability: `**Which suits YOU?**

Choose **MBBS** if you:
- Want to treat physical illness and emergencies
- Are strong in Biology and comfortable with clinical environments
- Can handle long study and demanding work hours

Choose **Psychology** if you:
- Are fascinated by the human mind and behavior
- Want to support people's mental and emotional health
- Prefer counseling, research, or HR over clinical work`,
        followUp: `Are you more drawn to physical medicine (treating illness) or mental health (supporting the mind)?`,
    },

    // ── Engineering vs Defence ─────────────────────────────────────────────────
    'btech-core_defence-tech': {
        careers: ['btech-core', 'defence-tech'],
        keywords: [
            ['engineering', 'army'], ['btech', 'defence'], ['engineering', 'military'],
            ['civil', 'nda'], ['mechanical', 'airforce'], ['tech', 'navy'],
        ],
        sides: [
            { career: 'btech-core', hints: ['suit', 'corporate', 'office', 'civilian', 'industry', 'company', 'entrepreneur', 'flexible'] },
            { career: 'defence-tech', hints: ['uniform', 'army', 'military', 'defence', 'defense', 'troop', 'nda', 'nation', 'serve', 'soldier', 'air force', 'navy'] },
        ],
        response: `**Engineering (B.Tech) vs Defence (Technical Entry)**

| Factor | B.Tech Engineering | Defence (NDA/TES) |
|--------|-------------------|------------------|
| **Duration** | 4 years | 4 years (training) |
| **Entrance** | JEE Main / CETs | NDA Exam / TES Interview |
| **Starting Salary** | 4–15 LPA | 10–14 LPA + perks |
| **Senior Salary** | 25–40 LPA | Colonel+ + pension + housing |
| **Prestige** | High (corporate) | Extremely High (national) |
| **Work Style** | Office / site | Disciplined, postings |
| **Physical Fitness** | Not required | Mandatory |
| **Job Security** | High | Guaranteed |`,
        suitability: `**Which suits YOU?**

Choose **Engineering** if you:
- Want a civilian technical career in industry
- Prefer flexibility, corporate environment, or entrepreneurship

Choose **Defence** if you:
- Are physically fit and love discipline and leadership
- Want to serve the nation with a sense of purpose and pride
- Are excited by an adventurous lifestyle with structured growth`,
        followUp: `Do you see yourself wearing a suit in a corporate office, or a uniform leading troops in the field?`,
    },

    // ── CS vs UI/UX Design ─────────────────────────────────────────────────────
    'btech-cs-ai_ui-ux-design': {
        careers: ['btech-cs-ai', 'ui-ux-design'],
        keywords: [
            ['cs', 'design'], ['programming', 'ux'], ['software', 'ui ux'],
            ['coding', 'designer'], ['computer science', 'design'], ['it', 'ui'],
        ],
        sides: [
            { career: 'btech-cs-ai', hints: ['under the hood', 'work', 'logic', 'code', 'backend', 'algorithm', 'technical', 'software', 'engineering'] },
            { career: 'ui-ux-design', hints: ['beautiful', 'intuitive', 'design', 'visual', 'ux', 'ui', 'user', 'creative', 'art', 'aesthetic'] },
        ],
        response: `**CS / Engineering vs UI/UX Design**

| Factor | CS / Engineering | UI/UX Design |
|--------|-----------------|-------------|
| **Duration** | 4 years | 6 months – 4 years |
| **Entrance** | JEE Main | CEED / NID DAT / Portfolio |
| **Starting Salary** | 8–15 LPA | 5–10 LPA |
| **Senior Salary** | 40–80+ LPA | 20–50+ LPA |
| **Skills** | Code, algorithms, logic | Creativity, empathy, visual thinking |
| **Remote Work** | Very common | Very common |
| **Job Market** | Very large | Growing rapidly |
| **Tools** | VS Code, GitHub, Cloud | Figma, Adobe XD, Prototyping |`,
        suitability: `**Which suits YOU?**

Choose **CS/Engineering** if you:
- Love logical problem-solving and writing code
- Want deep technical expertise in software systems

Choose **UI/UX Design** if you:
- Are creative and love visual storytelling
- Care deeply about how users experience products
- Want to blend psychology, art, and technology

> 💡 **Pro Tip**: The best products come from teams of engineers AND designers. Both skills are highly complementary!`,
        followUp: `Do you get more satisfaction from making something work perfectly under the hood, or making it beautiful and intuitive to use?`,
    },

    // ── PCM vs PCB (Science stream choice) ────────────────────────────────────
    'pcm_pcb': {
        careers: ['btech-cs-ai', 'mbbs'],
        keywords: [
            ['pcm', 'pcb'], ['pcm', 'biology'], ['maths', 'bio'],
            ['jee', 'neet'], ['physics chemistry maths', 'biology'],
            ['science maths', 'science bio'], ['engineering stream', 'medical stream'],
        ],
        sides: [
            { career: 'btech-cs-ai', hints: ['pcm', 'maths', 'jee', 'engineering', 'computer', 'physics', 'coding'] },
            { career: 'mbbs', hints: ['pcb', 'biology', 'bio', 'neet', 'doctor', 'medicine', 'medical', 'health'] },
        ],
        response: `**PCM vs PCB — Which Science Stream to Choose in Class 11?**

| Factor | PCM → Engineering / CS | PCB → Medicine / Biology |
|--------|-----------------------|--------------------------|
| **Subjects** | Physics, Chemistry, Maths | Physics, Chemistry, Biology |
| **Main Entrance** | JEE Main / JEE Advanced | NEET-UG |
| **Top Degree** | B.Tech / B.E. | MBBS / BDS |
| **Course Duration** | 4 years | 5.5 years (MBBS) |
| **Starting Salary** | 6–15 LPA | 6–12 LPA |
| **Senior Salary** | 30–80+ LPA | 25–60+ LPA (specialist) |
| **Career Options** | Engineer, AI developer, Data Scientist | Doctor, Dentist, Pharmacist, Researcher |
| **Competition** | ~11 lakh JEE aspirants | ~22 lakh NEET aspirants |
| **Study Pressure** | Very High (Maths heavy) | Extremely High (vast Biology syllabus) |`,
        suitability: `**Which should YOU pick?**

Choose **PCM** if you:
- Love Maths and logical problem-solving
- Are excited by computers, AI, or engineering
- Want flexible career paths (Engineering, CS, Data Science, even MBA)

Choose **PCB** if you:
- Are fascinated by Biology and the human body
- Dream of becoming a doctor and directly helping patients
- Are ready for a longer but extremely rewarding career

> 💡 **Pro Tip**: You can take **PCM + Biology** (5 subjects) to keep BOTH options open — many students do this!`,
        followUp: `Which subject do you enjoy more right now — Maths or Biology?`,
    },

    // ── BBA vs B.Com ──────────────────────────────────────────────────────────
    'management-bba_bcom': {
        careers: ['management-bba', 'banking-gov'],
        keywords: [
            ['bba', 'bcom'], ['bba', 'b.com'], ['business administration', 'commerce'],
            ['management degree', 'commerce degree'], ['bba', 'commerce'],
            ['management', 'b.com'],
        ],
        sides: [
            { career: 'management-bba', hints: ['bba', 'management', 'business', 'marketing', 'mba', 'strategy', 'lead', 'team'] },
            { career: 'banking-gov', hints: ['bcom', 'b.com', 'commerce', 'accounts', 'finance degree', 'bank', 'taxation'] },
        ],
        response: `**BBA vs B.Com — Commerce After Class 12**

| Factor | BBA (Business Administration) | B.Com (Bachelor of Commerce) |
|--------|-------------------------------|------------------------------|
| **Duration** | 3 years | 3 years |
| **Focus** | Management, marketing, HR, strategy | Accounting, finance, taxation |
| **Further Study** | MBA (IIM = 25–80 LPA!) | CA, CMA, M.Com |
| **Starting Salary** | 3–6 LPA | 2–5 LPA |
| **Senior Salary** | 20–80 LPA (with top MBA) | 15–50 LPA (with CA) |
| **Job Market** | Corporate, startups, consulting | Finance, banking, government |
| **Entrance** | IPMAT / University entrance | Merit-based / CUET |
| **Flexibility** | High — any industry | Moderate — strongest in finance |`,
        suitability: `**Which suits YOU?**

Choose **BBA** if you:
- Love leading teams, business strategy, and communication
- Want to work in corporate, marketing, or startups
- Plan to do an MBA later (especially from IIMs)

Choose **B.Com** if you:
- Are strong in accounts, taxation, and financial concepts
- Want to become a CA, CMA, or work in banking/government
- Prefer deep finance expertise over broad management skills`,
        followUp: `Do you see yourself leading business teams (BBA → MBA), or building deep expertise in finance and taxation (B.Com → CA)?`,
    },

    // ── Nursing vs MBBS ───────────────────────────────────────────────────────
    'allied-health_mbbs': {
        careers: ['allied-health', 'mbbs'],
        keywords: [
            ['nursing', 'mbbs'], ['nursing', 'doctor'], ['nurse', 'doctor'],
            ['bsc nursing', 'mbbs'], ['nursing', 'medicine'], ['gnm', 'mbbs'],
        ],
        sides: [
            { career: 'allied-health', hints: ['nursing', 'nurse', 'care', 'bedside', 'gnm', 'bsc nursing', 'patient care'] },
            { career: 'mbbs', hints: ['doctor', 'mbbs', 'physician', 'diagnose', 'prescribe', 'medicine', 'neet', 'treat illness'] },
        ],
        response: `**Nursing (BSc/GNM) vs Medicine (MBBS)**

| Factor | Nursing (BSc / GNM) | MBBS (Doctor) |
|--------|---------------------|---------------|
| **Duration** | 3–4 years | 5.5 years + optional specialization |
| **Entrance** | State CET / CUET | NEET-UG |
| **Starting Salary** | 2–5 LPA (India), 20–40 LPA (abroad) | 6–12 LPA |
| **Senior Salary** | 8–15 LPA (India), 40–80 LPA (abroad) | 30–60+ LPA (specialist) |
| **Global Demand** | Extremely High (UK, Canada, Australia) | High |
| **Work Hours** | Shift-based | Very long including night shifts |
| **Nature of Work** | Patient care, monitoring, bedside support | Diagnosis, treatment, prescriptions |
| **Study Intensity** | Moderate | Extremely High |`,
        suitability: `**Which suits YOU?**

Choose **Nursing** if you:
- Want close patient interaction with a more manageable course load
- Are considering working abroad (nurses are in massive global demand)
- Want faster, more affordable entry into the healthcare field

Choose **MBBS** if you:
- Want to independently diagnose and treat patients as a doctor
- Can handle 5.5+ years of intense study and clinical rotations
- Aim for the full authority and prestige of being a physician`,
        followUp: `Are you drawn more to hands-on patient care and nursing, or to diagnosing and prescribing as a doctor?`,
    },

    // ── Pharmacy vs MBBS ──────────────────────────────────────────────────────
    'pharmacy_mbbs': {
        careers: ['pharmacy', 'mbbs'],
        keywords: [
            ['pharmacy', 'mbbs'], ['pharma', 'doctor'], ['b.pharm', 'mbbs'],
            ['pharmacy', 'medicine'], ['pharmacist', 'doctor'], ['d.pharm', 'mbbs'],
        ],
        sides: [
            { career: 'pharmacy', hints: ['pharmacy', 'pharma', 'drug', 'pharmacist', 'b.pharm', 'research', 'lab', 'manufacturing'] },
            { career: 'mbbs', hints: ['doctor', 'mbbs', 'hospital', 'patient', 'treat', 'prescribe', 'neet', 'clinical', 'physician'] },
        ],
        response: `**Pharmacy (B.Pharm) vs Medicine (MBBS)**

| Factor | Pharmacy (B.Pharm) | MBBS (Doctor) |
|--------|-------------------|---------------|
| **Duration** | 4 years | 5.5 years |
| **Entrance** | State CET / NEET (some states) | NEET-UG |
| **Starting Salary** | 3–6 LPA | 6–12 LPA |
| **Senior Salary** | 15–40 LPA | 30–60+ LPA (specialist) |
| **Industry Options** | Pharma MNCs, R&D, hospitals, drug stores | Hospitals, clinics, research |
| **Work Style** | Lab / office / production line | Clinical / hospital-based |
| **Competition Level** | Low–Medium | Very High (22 lakh NEET students) |
| **Further Study** | M.Pharm, MBA (Pharma) | MD/MS specialization |`,
        suitability: `**Which suits YOU?**

Choose **Pharmacy** if you:
- Are interested in how drugs work at a molecular level
- Want to work in the pharma industry (R&D, manufacturing, sales)
- Prefer lab or office settings over direct patient contact

Choose **MBBS** if you:
- Want to directly diagnose and treat patients as a doctor
- Can handle intense study and long clinical hours
- Want the highest level of independence inside healthcare`,
        followUp: `Do you prefer working in drug research and the pharma industry, or directly treating patients in a hospital?`,
    },

    // ── Animation / VFX vs CS ─────────────────────────────────────────────────
    'animation-vfx_btech-cs-ai': {
        careers: ['animation-vfx', 'btech-cs-ai'],
        keywords: [
            ['animation', 'software'], ['animation', 'coding'], ['vfx', 'programming'],
            ['animation', 'computer science'], ['animator', 'developer'],
            ['animation', 'cs'], ['vfx', 'engineering'], ['game design', 'cs'],
        ],
        sides: [
            { career: 'animation-vfx', hints: ['animation', 'vfx', 'creative', 'drawing', 'art', 'visual', 'film', 'game', 'design', 'artist', '3d', 'blender', 'maya'] },
            { career: 'btech-cs-ai', hints: ['software', 'coding', 'programming', 'developer', 'engineer', 'tech', 'computer science', 'app', 'logic', 'code'] },
        ],
        response: `**Animation / VFX vs Computer Science (CS / Engineering)**

| Factor | Animation / VFX | CS / Software Engineering |
|--------|-----------------|--------------------------|
| **Duration** | 3–4 years | 4 years (B.Tech) |
| **Entrance** | Portfolio / NID DAT / CEED | JEE Main / BITSAT |
| **Starting Salary** | 3–8 LPA | 8–15 LPA |
| **Senior Salary** | 20–60 LPA (top studios) | 40–80+ LPA |
| **Global Demand** | Very High (Marvel, Disney, gaming) | Extremely High |
| **Work Style** | Studio-based, creative teams | Remote-friendly, product teams |
| **Skills Needed** | Creativity, Blender, Maya, storytelling | Logic, coding, algorithms |
| **Career Paths** | Film VFX, game art, AR/VR, advertising | Developer, AI engineer, product manager |`,
        suitability: `**Which suits YOU?**

Choose **Animation/VFX** if you:
- Are passionate about art, storytelling, and visual effects
- Love movies, video games, or visual design
- Want a creative career in entertainment or advertising

Choose **CS/Engineering** if you:
- Love logical problem-solving and writing code
- Want a fast-growing, high-paying technical career
- Are excited by AI, apps, cloud, or product development

> 💡 **Pro Tip**: Many top game studios want CS engineers who also understand 3D art — both skills are valuable!`,
        followUp: `Do you spend more time drawing and creating visuals, or solving logic problems and writing code?`,
    },

    // ── Journalism vs Law ─────────────────────────────────────────────────────
    'journalism_law-integrated': {
        careers: ['journalism', 'law-integrated'],
        keywords: [
            ['journalism', 'law'], ['media', 'lawyer'], ['journalism', 'llb'],
            ['reporter', 'advocate'], ['mass communication', 'law'],
            ['bjmc', 'clat'], ['journalism', 'legal'], ['news', 'law'],
        ],
        sides: [
            { career: 'journalism', hints: ['journalism', 'media', 'reporter', 'news', 'write', 'writing', 'anchor', 'broadcast', 'storytell'] },
            { career: 'law-integrated', hints: ['law', 'court', 'lawyer', 'legal', 'argue', 'clat', 'justice', 'llb', 'advocate', 'case'] },
        ],
        response: `**Journalism / Mass Communication vs Law (BA LLB)**

| Factor | Journalism / Mass Comm | Law (BA LLB) |
|--------|----------------------|-------------|
| **Duration** | 3–4 years | 5 years (integrated) |
| **Entrance** | CUET / IIMC / Symbiosis | CLAT / AILET |
| **Starting Salary** | 2–6 LPA | 6–15 LPA (top firms) |
| **Senior Salary** | 15–40 LPA (editors, anchors) | 50+ LPA (senior lawyers) |
| **Job Security** | Moderate (media is volatile) | High |
| **Impact** | Inform and influence public opinion | Fight for justice, shape policy |
| **Skills** | Writing, storytelling, current affairs | Logic, research, debate, reading |
| **Top Opportunities** | NDTV, TOI, BBC, digital media | Big law firms, corporate law, judiciary |`,
        suitability: `**Which suits YOU?**

Choose **Journalism** if you:
- Love writing, storytelling, and staying updated on current events
- Want to inform and influence society through media
- Are comfortable in competitive, fast-paced newsroom environments

Choose **Law** if you:
- Love logic, debate, and arguing a case with evidence
- Want a prestigious, well-paying career in courts or corporate law
- Can handle hours of intensive reading, research, and case preparation`,
        followUp: `Do you prefer telling stories to inform society through media, or arguing cases in courts to fight for justice?`,
    },

    // ── Teaching vs Psychology ────────────────────────────────────────────────
    'teaching_psychology': {
        careers: ['teaching', 'psychology'],
        keywords: [
            ['teaching', 'psychology'], ['teacher', 'psychologist'], ['b.ed', 'psychology'],
            ['education', 'counseling'], ['teaching', 'counselor'], ['educator', 'therapist'],
        ],
        sides: [
            { career: 'teaching', hints: ['teach', 'teacher', 'educator', 'school', 'classroom', 'b.ed', 'students', 'education', 'group'] },
            { career: 'psychology', hints: ['psychology', 'counseling', 'therapist', 'mental health', 'behavior', 'mind', 'counsel', 'emotion', 'therapy'] },
        ],
        response: `**Teaching (B.Ed) vs Psychology**

| Factor | Teaching (Degree + B.Ed) | Psychology |
|--------|--------------------------|-----------|
| **Duration** | 4-year degree + 2-year B.Ed | 3-year UG + 2-year Masters |
| **Entrance** | University merit / State TET | CUET / University merit |
| **Starting Salary** | 2–5 LPA (private), 5–8 LPA (govt) | 3–6 LPA |
| **Senior Salary** | 10–20 LPA (professor level) | 10–25 LPA (private practice) |
| **Job Security** | Very High (govt teacher = pension) | Growing (mental health awareness rising) |
| **Work Style** | Classroom, structured timetable | One-on-one sessions, clinical or corporate |
| **Social Impact** | Shape generations of young minds | Support individual mental wellbeing |`,
        suitability: `**Which suits YOU?**

Choose **Teaching** if you:
- Love explaining concepts and guiding groups of students
- Want a stable government job with pension and benefits
- Are patient, organized, and thrive in structured classroom settings

Choose **Psychology** if you:
- Are fascinated by human behavior, emotions, and the mind
- Want to support people's mental and emotional wellbeing
- Prefer one-on-one counseling over classroom group dynamics`,
        followUp: `Do you get more satisfaction from teaching a class of 30 students, or helping one person work through their personal challenges?`,
    },

    // ── BDS vs MBBS ───────────────────────────────────────────────────────────
    'dentistry_mbbs': {
        careers: ['dentistry', 'mbbs'],
        keywords: [
            ['bds', 'mbbs'], ['dentist', 'doctor'], ['dental', 'medicine'],
            ['dentistry', 'mbbs'], ['dental surgeon', 'physician'], ['oral', 'mbbs'],
        ],
        sides: [
            { career: 'dentistry', hints: ['dental', 'dentist', 'bds', 'teeth', 'oral', 'mouth', 'orthodont', 'cosmetic dentist', 'clinic'] },
            { career: 'mbbs', hints: ['doctor', 'mbbs', 'physician', 'hospital', 'medicine', 'treat', 'diagnose', 'specialist', 'surgeon'] },
        ],
        response: `**BDS (Dentistry) vs MBBS (Medicine)**

| Factor | BDS (Dental) | MBBS (Medicine) |
|--------|-------------|----------------|
| **Duration** | 5 years (incl. internship) | 5.5 years (incl. internship) |
| **Entrance** | NEET-UG | NEET-UG |
| **Starting Salary** | 4–8 LPA | 6–12 LPA |
| **Senior Salary** | 15–40 LPA (own clinic) | 30–60+ LPA (specialist) |
| **Specialization** | MDS (Master of Dental Surgery) | MD/MS (any medical branch) |
| **Work Hours** | Regular clinic hours | Very demanding (night shifts) |
| **Setting Up Practice** | Easier — low-cost dental clinic | Harder — needs hospital setup |
| **Competition for Seats** | Lower | Extremely High |`,
        suitability: `**Which suits YOU?**

Choose **BDS** if you:
- Are specifically interested in oral health and dental surgery
- Want better work-life balance with predictable clinic hours
- Plan to set up your own dental practice (relatively affordable)

Choose **MBBS** if you:
- Want to pursue any branch of medicine (heart, brain, child health, etc.)
- Are willing to invest extra years for full specialization
- Want broader career options across all departments of medicine`,
        followUp: `Are you specifically drawn to oral and dental health, or the wider world of general medicine?`,
    },

    // ── Banking / Govt Jobs vs CA ─────────────────────────────────────────────
    'banking-gov_ca': {
        careers: ['banking-gov', 'ca'],
        keywords: [
            ['banking', 'ca'], ['bank job', 'chartered accountant'],
            ['government job', 'ca'], ['sbi po', 'ca exam'],
            ['ibps', 'ca'], ['bank po', 'ca'], ['govt job', 'ca'],
            ['banking exam', 'ca course'], ['stable job', 'ca'],
        ],
        sides: [
            { career: 'banking-gov', hints: ['bank', 'banking', 'government', 'govt', 'sbi', 'ibps', 'rbi', 'stable', 'security', 'pension', 'safe', 'po'] },
            { career: 'ca', hints: ['ca', 'chartered', 'audit', 'tax', 'finance', 'cfo', 'international', 'corporate', 'high salary', 'professional degree'] },
        ],
        response: `**Banking / Govt Jobs vs Chartered Accountancy (CA)**

| Factor | Banking / Govt Job (IBPS/SBI) | CA (Chartered Accountant) |
|--------|-------------------------------|--------------------------|
| **Path** | Graduate → competitive exam | CA Foundation → Inter → Final |
| **Time to Job** | 1–2 years after graduation | 4.5–5 years |
| **Starting Salary** | 5–10 LPA + perks + housing | 7–12 LPA |
| **Senior Salary** | 15–30 LPA (General Manager) | 30–80 LPA (partner level) |
| **Job Security** | Extremely High (government) | Very High |
| **Work Hours** | Structured (9 to 5) | Long (especially during audit season) |
| **Global Scope** | Limited | High (ACCA for global) |
| **Prestige** | High | Very High |`,
        suitability: `**Which suits YOU?**

Choose **Banking / Govt** if you:
- Want job security, a pension, and a balanced personal life
- Prefer structured government benefits and predictable promotions
- Want to clear one exam and settle into a stable career

Choose **CA** if you:
- Want significantly higher earning potential over the long term
- Are okay with multiple tough exams spread across 4–5 years
- Want a globally respected professional qualification`,
        followUp: `Do you prioritize job security and stability, or higher earning potential and professional prestige?`,
    },
};

/**
 * Given user text, detect if they are asking a comparison/suitability question.
 * Returns the matching comparison entry or null.
 *
 * @param {string} text
 * @returns {{ entry: object, key: string } | null}
 */
export function findComparisonMatch(text) {
    const lower = text.toLowerCase();

    // First check if it's a comparison/suitability question pattern
    const isComparison = /\b(vs|versus|or|better|compare|difference|choose|confused between|which one|both|either)\b/i.test(lower)
        || /\b(should i (take|do|choose|pick|go for|study|pursue))\b/i.test(lower)
        || /\b(which (is|would be|suits|fits) (better|good|right|best))\b/i.test(lower)
        || /\b(torn between|confused about|thinking (between|about)|can't decide|cannot decide)\b/i.test(lower)
        || /\b(help me choose|which should i (pick|take|go for|do|study|pursue))\b/i.test(lower)
        || /\b(what('s| is) (better|the difference|the best))\b/i.test(lower)
        || /\b(between .* and .*)\b/i.test(lower);

    const isSuitability = /\b(suit(s|ed|able)?|fit(s|ted)?|right for me|good for me|meant for me|is .* for me)\b/i.test(lower)
        || /\b(will (i|engineering|medical|cs|law|mbbs|commerce|nursing|pharmacy|animation|teaching|banking|bba|bcom|journalism) suit)\b/i.test(lower)
        || /\b(am i (suited|fit|cut out|made) for)\b/i.test(lower)
        || /\b(is (this|it|that) (right|good|suitable|meant) for (me|someone like me))\b/i.test(lower)
        || /\b(can i (do|pursue|study|become))\b/i.test(lower);

    if (!isComparison && !isSuitability) return null;

    // Personal preference queries ("I love biology but hate...", "I enjoy coding", etc.)
    // are too nuanced for a comparison table — they need AI personalisation.
    // In these cases, disable the single-keyword suitability shortcut so the query
    // can fall through to the AI fast-path. Dual-keyword explicit comparisons still work.
    const isPersonalPreference = /\b(i love|i like|i hate|i dislike|i enjoy|i don'?t like|i am good at|i'm good at|i am interested|i'm interested|i am passionate|i'm passionate|my interest|my hobby|my passion|i prefer|i find)\b/i.test(lower);

    // Match against keyword pairs in each comparison entry
    for (const [key, entry] of Object.entries(careerComparisons)) {
        for (const [kw1, kw2] of entry.keywords) {
            if (lower.includes(kw1) && lower.includes(kw2)) {
                return { entry, key };
            }
            // Single-keyword suitability match (e.g. "will medicine suit me")
            // — disabled for personal preference queries so AI can handle them.
            if (isSuitability && !isPersonalPreference && (lower.includes(kw1) || lower.includes(kw2))) {
                return { entry, key };
            }
        }
    }

    return null;
}

/**
 * Given user text and the key of the last shown comparison, detect which side
 * the user is leaning toward.
 *
 * @param {string} text - Raw user reply
 * @param {string} comparisonKey - Key of the last shown comparison entry
 * @returns {string | null} - Career ID the user leans toward, or null
 */
export function resolveComparisonSide(text, comparisonKey) {
    const entry = careerComparisons[comparisonKey];
    if (!entry?.sides) return null;
    const lower = text.toLowerCase();
    for (const side of entry.sides) {
        if (side.hints.some(h => lower.includes(h))) {
            return side.career;
        }
    }
    return null;
}

export default careerComparisons;
