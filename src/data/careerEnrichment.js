// Enrichment overlay for careerData - adds professional fields without touching careerData.js
const careerEnrichment = {
    "btech-cs-ai": {
        detailedDescription: {
            en: "Computer Science & AI is one of the fastest-growing fields. You'll build software, train AI models, and drive digital transformation across every industry.",
            kn: "ಕಂಪ್ಯೂಟರ್ ವಿಜ್ಞಾನ ಮತ್ತು AI ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ಕ್ಷೇತ್ರ. ನೀವು ಸಾಫ್ಟ್‌ವೇರ್ ನಿರ್ಮಿಸಿ, AI ಮಾಡೆಲ್ ತರಬೇತಿ ನೀಡಿ ಪ್ರತಿ ಉದ್ಯಮವನ್ನು ಡಿಜಿಟಲ್ ಆಗಿ ಪರಿವರ್ತಿಸಬಹುದು."
        },
        futureOutlook: {
            en: "AI/ML roles are projected to grow 40%+ by 2030. India needs 1M+ tech professionals annually.",
            kn: "2030ರ ವೇಳೆಗೆ AI/ML ಪಾತ್ರಗಳು 40%+ ಬೆಳೆಯಲಿವೆ. ಭಾರತಕ್ಕೆ ವಾರ್ಷಿಕ 10 ಲಕ್ಷ+ ತಂತ್ರಜ್ಞಾನ ವೃತ್ತಿಪರರ ಅಗತ್ಯವಿದೆ."
        },
        topCompanies: ["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Startups"],
        relatedCareers: ["btech-core", "pure-science-research"]
    },
    "btech-core": {
        detailedDescription: {
            en: "Core Engineering covers Mechanical, Civil, and Electrical disciplines. You design infrastructure, machines, and power systems that shape the modern world.",
            kn: "ಮೂಲ ಎಂಜಿನಿಯರಿಂಗ್ ಯಾಂತ್ರಿಕ, ಸಿವಿಲ್, ಎಲೆಕ್ಟ್ರಿಕಲ್ ಶಾಖೆಗಳನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ. ನೀವು ಮೂಲಸೌಕರ್ಯ, ಯಂತ್ರ ಮತ್ತು ವಿದ್ಯುತ್ ವ್ಯವಸ್ಥೆ ವಿನ್ಯಾಸ ಮಾಡಬಹುದು."
        },
        futureOutlook: {
            en: "Renewable energy, smart cities, and EV sector are driving massive demand for core engineers.",
            kn: "ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನ, ಸ್ಮಾರ್ಟ್ ನಗರಗಳು ಮತ್ತು EV ಕ್ಷೇತ್ರದಿಂದ ಮೂಲ ಎಂಜಿನಿಯರ್‌ಗಳ ಬೇಡಿಕೆ ಹೆಚ್ಚಿದೆ."
        },
        topCompanies: ["L&T", "BHEL", "TATA Motors", "Siemens", "Adani Green", "NHAI", "ISRO"],
        relatedCareers: ["btech-cs-ai", "iti-trade"]
    },
    "mbbs": {
        detailedDescription: {
            en: "MBBS is the gateway to becoming a doctor. You'll spend 5.5 years mastering human biology, diagnostics, and clinical medicine before specializing.",
            kn: "MBBS ವೈದ್ಯನಾಗಲು ಪ್ರವೇಶದ್ವಾರ. 5.5 ವರ್ಷ ಮಾನವ ಜೀವಶಾಸ್ತ್ರ, ರೋಗನಿರ್ಣಯ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ವೈದ್ಯಕೀಯ ಕಲಿತ ನಂತರ ವಿಶೇಷತೆ ಪಡೆಯಬಹುದು."
        },
        futureOutlook: {
            en: "India has a huge doctor shortage (1:1800 ratio vs WHO's 1:1000). Healthcare demand is booming.",
            kn: "ಭಾರತದಲ್ಲಿ ವೈದ್ಯರ ಕೊರತೆ ಇದೆ. ಆರೋಗ್ಯ ಸೇವಾ ಬೇಡಿಕೆ ತ್ವರಿತಗತಿಯಲ್ಲಿ ಬೆಳೆಯುತ್ತಿದೆ."
        },
        topCompanies: ["AIIMS", "Apollo Hospitals", "Fortis", "Max Healthcare", "Narayana Health"],
        relatedCareers: ["allied-health", "biotech-research"]
    },
    "ca": {
        detailedDescription: {
            en: "Chartered Accountancy is one of India's most prestigious professional qualifications. CAs audit companies, manage taxes, and shape financial decisions.",
            kn: "CA ಭಾರತದ ಅತ್ಯಂತ ಪ್ರತಿಷ್ಠಿತ ವೃತ್ತಿಪರ ವರ್ಗೀಕರಣ. CA ಗಳು ಕಂಪನಿಗಳ ಲೆಕ್ಕಪರಿಶೋಧನೆ ಮತ್ತು ತೆರಿಗೆ ನಿರ್ವಹಿಸುತ್ತಾರೆ."
        },
        futureOutlook: {
            en: "With GST, SEBI regulations, and global compliance needs, CAs are among the most in-demand professionals in India.",
            kn: "GST, SEBI ನಿಯಮಗಳು ಮತ್ತು ಜಾಗತಿಕ ಅನುಸರಣೆ ಅಗತ್ಯಗಳಿಂದ, CA ಗಳು ಭಾರತದಲ್ಲಿ ಹೆಚ್ಚು ಬೇಡಿಕೆಯ ವೃತ್ತಿಪರರಾಗಿದ್ದಾರೆ."
        },
        topCompanies: ["Deloitte", "PwC", "EY", "KPMG", "Big 4 firms", "RBI", "SEBI"],
        relatedCareers: ["actuarial-science", "cs-legal"]
    },
    "law-integrated": {
        detailedDescription: {
            en: "Law gives you the power to argue, defend, and create justice. From corporate boardrooms to courtrooms, legal minds are needed everywhere.",
            kn: "ಕಾನೂನು ನಿಮಗೆ ವಾದ, ರಕ್ಷಣೆ ಮತ್ತು ನ್ಯಾಯ ಸ್ಥಾಪಿಸುವ ಶಕ್ತಿ ನೀಡುತ್ತದೆ. ಕಾರ್ಪೊರೇಟ್ ಸಭಾಂಗಣದಿಂದ ನ್ಯಾಯಾಲಯ ವರೆಗೆ ಕಾನೂನು ತಜ್ಞರ ಅಗತ್ಯವಿದೆ."
        },
        futureOutlook: {
            en: "IP rights, cyber law, and corporate mergers drive massive growth for legal professionals.",
            kn: "IPR, ಸೈಬರ್ ಕಾನೂನು ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ವಿಲೀನಗಳು ಕಾನೂನು ವೃತ್ತಿಪರರಿಗೆ ವ್ಯಾಪಕ ಬೆಳವಣಿಗೆ ನೀಡುತ್ತಿವೆ."
        },
        topCompanies: ["Supreme Court", "AZB & Partners", "Cyril Amarchand", "Khaitan & Co", "Top Law Firms"],
        relatedCareers: ["cs-legal", "socio-public-policy"]
    },
    "civil-services": {
        detailedDescription: {
            en: "The IAS/IPS gives you the authority to shape policy and serve millions of people. It's one of the most respected careers in India.",
            kn: "IAS/IPS ನಿಮಗೆ ನೀತಿ ರೂಪಿಸಿ ಲಕ್ಷಾಂತರ ಜನರಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವ ಅಧಿಕಾರ ನೀಡುತ್ತದೆ. ಭಾರತದ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ವೃತ್ತಿ."
        },
        futureOutlook: {
            en: "The government sector remains the backbone of India. IAS/IPS posts carry immense power, prestige, and job security.",
            kn: "ಸರ್ಕಾರಿ ವಲಯ ಭಾರತದ ಬೆನ್ನೆಲುಬು. IAS/IPS ಹುದ್ದೆ ಅಪಾರ ಅಧಿಕಾರ, ಪ್ರತಿಷ್ಠೆ ಮತ್ತು ನೌಕರಿ ಭದ್ರತೆ ನೀಡುತ್ತದೆ."
        },
        topCompanies: ["Government of India", "State Governments", "UPSC", "IAS/IPS Services"],
        relatedCareers: ["socio-public-policy", "banking-gov"]
    },
    "ui-ux-design": {
        detailedDescription: {
            en: "Design is the language of great products. UI/UX designers shape how billions of people interact with apps, websites, and digital experiences.",
            kn: "ವಿನ್ಯಾಸ ಅತ್ಯುತ್ತಮ ಉತ್ಪನ್ನಗಳ ಭಾಷೆ. UI/UX ಡಿಸೈನರ್‌ಗಳು ಶತಕೋಟಿ ಜನರು apps ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳೊಂದಿಗೆ ಸಂವಹಿಸುವ ರೀತಿಯನ್ನು ರೂಪಿಸುತ್ತಾರೆ."
        },
        futureOutlook: {
            en: "Every product, app, and service needs strong design. Remote-friendly and rapidly expanding.",
            kn: "ಪ್ರತಿ ಉತ್ಪನ್ನ, ಅಪ್ಲಿಕೇಶನ್ ಮತ್ತು ಸೇವೆಗೆ ಉತ್ತಮ ವಿನ್ಯಾಸ ಬೇಕು. ರಿಮೋಟ್-ಸ್ನೇಹಿ ಮತ್ತು ತ್ವರಿತವಾಗಿ ವಿಸ್ತರಿಸುತ್ತಿರುವ ಕ್ಷೇತ್ರ."
        },
        topCompanies: ["Flipkart", "Zomato", "Swiggy", "Adobe", "Razorpay", "Figma", "Canva"],
        relatedCareers: ["btech-cs-ai", "digital-marketing"]
    },
    "digital-marketing": {
        detailedDescription: {
            en: "Digital marketing drives brand growth online. You manage SEO, social media, campaigns, and analytics to help businesses reach millions.",
            kn: "ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಬ್ರ್ಯಾಂಡ್ ಬೆಳವಣಿಗೆ ಚಾಲನೆ ನೀಡುತ್ತದೆ. SEO, ಸೋಷಿಯಲ್ ಮೀಡಿಯಾ ಮತ್ತು ಕ್ಯಾಂಪೇನ್ ನಿರ್ವಹಿಸಿ ಲಕ್ಷಾಂತರ ಜನರನ್ನು ತಲುಪಬಹುದು."
        },
        futureOutlook: {
            en: "India's digital economy is exploding. Every brand needs skilled marketers.",
            kn: "ಭಾರತದ ಡಿಜಿಟಲ್ ಆರ್ಥಿಕತೆ ವಿಸ್ತರಿಸುತ್ತಿದೆ. ಪ್ರತಿ ಬ್ರ್ಯಾಂಡ್‌ಗೆ ಕುಶಲ ಮಾರ್ಕೆಟರ್‌ಗಳ ಅಗತ್ಯ."
        },
        topCompanies: ["Google", "Meta", "HubSpot", "Wavemaker", "Publicis", "Zomato", "Agencies"],
        relatedCareers: ["management-bba", "ui-ux-design"]
    },
    "psychology": {
        detailedDescription: {
            en: "Psychology explores the human mind and behaviour. You can counsel individuals, support HR decisions, or conduct groundbreaking mental health research.",
            kn: "ಮನೋವಿಜ್ಞಾನ ಮಾನವ ಮನಸ್ಸು ಮತ್ತು ನಡವಳಿಕೆ ಅಧ್ಯಯನ. ವ್ಯಕ್ತಿಗಳಿಗೆ ಸಮಾಲೋಚನೆ, HR ಬೆಂಬಲ ಅಥವಾ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಂಶೋಧನೆ ಮಾಡಬಹುದು."
        },
        futureOutlook: {
            en: "Post-pandemic mental health awareness has tripled demand for psychologists in India.",
            kn: "ಮಹಾಮಾರಿಯ ನಂತರ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಜಾಗೃತಿಯಿಂದ ಮನೋವೈದ್ಯರ ಬೇಡಿಕೆ ಮೂರು ಪಟ್ಟು ಹೆಚ್ಚಿದೆ."
        },
        topCompanies: ["NIMHANS", "iCall", "YourDOST", "Vandrevala Foundation", "Corporate HR Depts"],
        relatedCareers: ["allied-health", "socio-public-policy"]
    },
    "management-bba": {
        detailedDescription: {
            en: "BBA/BMS creates tomorrow's business leaders. You study marketing, finance, HR and strategy to manage teams and grow organizations.",
            kn: "BBA/BMS ನಾಳಿನ ವ್ಯವಹಾರ ನಾಯಕರನ್ನು ರೂಪಿಸುತ್ತದೆ. ಮಾರ್ಕೆಟಿಂಗ್, ಹಣಕಾಸು, HR ಕಲಿತು ಸಂಸ್ಥೆಗಳನ್ನು ಮುನ್ನಡೆಸಬಹುದು."
        },
        futureOutlook: {
            en: "India's startup ecosystem and MNCs constantly seek management graduates from top institutions.",
            kn: "ಭಾರತದ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಪರಿಸರ ಮತ್ತು MNC ಗಳು ನಿರಂತರವಾಗಿ ನಿರ್ವಹಣೆ ಪದವೀಧರರನ್ನು ಹುಡುಕುತ್ತವೆ."
        },
        topCompanies: ["Hindustan Unilever", "Amazon", "Deloitte", "Reliance", "Startups"],
        relatedCareers: ["entrepreneurship", "digital-marketing"]
    },
    "defence-tech": {
        detailedDescription: {
            en: "A technical entry into the Defence forces offers honour, adventure, and purpose. You lead soldiers, operate advanced tech, and serve the nation.",
            kn: "ರಕ್ಷಣಾ ಪಡೆಗಳಲ್ಲಿ ತಾಂತ್ರಿಕ ಪ್ರವೇಶ ಗೌರವ, ಸಾಹಸ ಮತ್ತು ಉದ್ದೇಶ ನೀಡುತ್ತದೆ. ಸೈನಿಕರ ನೇತೃತ್ವ ವಹಿಸಿ ರಾಷ್ಟ್ರ ಸೇವೆ ಮಾಡಬಹುದು."
        },
        futureOutlook: {
            en: "India's defence budget is growing rapidly. Technical officers are among the most valued in the armed forces.",
            kn: "ಭಾರತದ ರಕ್ಷಣಾ ಬಜೆಟ್ ತ್ವರಿತವಾಗಿ ಬೆಳೆಯುತ್ತಿದೆ. ತಾಂತ್ರಿಕ ಅಧಿಕಾರಿಗಳು ಸಶಸ್ತ್ರ ಪಡೆಗಳಲ್ಲಿ ಅತ್ಯಂತ ಮೌಲ್ಯಯುತರು."
        },
        topCompanies: ["Indian Army", "Indian Navy", "Indian Air Force", "DRDO", "HAL"],
        relatedCareers: ["btech-core", "civil-services"]
    },
    "pure-science-research": {
        detailedDescription: {
            en: "Pure Science opens the frontier of human knowledge. From discovering new materials to exploring the cosmos, researchers push the boundaries of what's possible.",
            kn: "ಶುದ್ಧ ವಿಜ್ಞಾನ ಮಾನವ ಜ್ಞಾನದ ಗಡಿ ವಿಸ್ತರಿಸುತ್ತದೆ. ಹೊಸ ವಸ್ತುಗಳ ಆವಿಷ್ಕಾರದಿಂದ ಬ್ರಹ್ಮಾಂಡ ಅನ್ವೇಷಣೆ ವರೆಗೆ ಸಂಶೋಧಕರು ಸಾಧ್ಯತೆ ವಿಸ್ತರಿಸುತ್ತಾರೆ."
        },
        futureOutlook: {
            en: "India invests heavily in ISRO, DRDO, and IISc. Research careers with CSIR and DST are growing.",
            kn: "ಭಾರತ ISRO, DRDO ಮತ್ತು IISc ನಲ್ಲಿ ಭಾರಿ ಬಂಡವಾಳ ಹಾಕುತ್ತಿದೆ. CSIR ಮತ್ತು DST ಸಂಶೋಧನಾ ವೃತ್ತಿ ಬೆಳೆಯುತ್ತಿವೆ."
        },
        topCompanies: ["ISRO", "DRDO", "IISc", "TIFR", "CSIR", "IITs"],
        relatedCareers: ["biotech-research", "btech-cs-ai"]
    },
    "allied-health": {
        detailedDescription: {
            en: "Allied Health Sciences cover a spectrum of critical medical support roles. Physiotherapists, lab technicians, and radiology specialists are essential to every hospital.",
            kn: "ಸಹಾಯಕ ಆರೋಗ್ಯ ವಿಜ್ಞಾನ ನಿರ್ಣಾಯಕ ವೈದ್ಯಕೀಯ ಬೆಂಬಲ ಪಾತ್ರಗಳ ವ್ಯಾಪ್ತಿ ಒಳಗೊಳ್ಳುತ್ತದೆ."
        },
        futureOutlook: {
            en: "Healthcare sector to add 5M jobs by 2030. Allied health roles are underpenetrated and high-demand.",
            kn: "2030ರ ವೇಳೆಗೆ ಆರೋಗ್ಯ ವಲಯ 50 ಲಕ್ಷ ಉದ್ಯೋಗ ಸೇರಿಸಲಿದೆ."
        },
        topCompanies: ["Apollo", "Fortis", "Manipal Hospitals", "SRL Diagnostics", "Dr. Lal PathLabs"],
        relatedCareers: ["mbbs", "psychology"]
    },
    "biotech-research": {
        detailedDescription: {
            en: "Biotech combines biology and technology to create life-saving drugs, genetic therapies, and sustainable food. It's the science of the future.",
            kn: "ಜೈವಿಕ ತಂತ್ರಜ್ಞಾನ ಜೀವ ಉಳಿಸುವ ಔಷಧ, ಜೆನೆಟಿಕ್ ಚಿಕಿತ್ಸೆ ರಚಿಸಲು ಜೀವಶಾಸ್ತ್ರ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ಸಂಯೋಜಿಸುತ್ತದೆ."
        },
        futureOutlook: {
            en: "India is the 3rd largest biotech hub globally. Vaccine and biopharmaceutical sectors are booming.",
            kn: "ಭಾರತ ಜಾಗತಿಕವಾಗಿ 3ನೇ ಅತಿದೊಡ್ಡ ಬಯೋಟೆಕ್ ಕೇಂದ್ರ. ಲಸಿಕೆ ಮತ್ತು ಬಯೋಫಾರ್ಮಾ ವಲಯ ಏರುಮುಖದಲ್ಲಿದೆ."
        },
        topCompanies: ["Biocon", "Serum Institute", "Dr. Reddy's", "Cipla", "Novartis India"],
        relatedCareers: ["mbbs", "pure-science-research"]
    },
    "actuarial-science": {
        detailedDescription: {
            en: "Actuaries are the math wizards of the finance world. They model risk, price insurance products, and guide trillion-dollar investment decisions.",
            kn: "ಅಕ್ಚ್ಯುರಿಗಳು ಹಣಕಾಸು ಜಗತ್ತಿನ ಗಣಿತ ತಜ್ಞರು. ಅವರು ಅಪಾಯ ಮಾದರಿ ಮಾಡಿ ವಿಮಾ ಉತ್ಪನ್ನಗಳ ಬೆಲೆ ನಿಗದಿ ಮಾಡುತ್ತಾರೆ."
        },
        futureOutlook: {
            en: "Only ~400 Fellows in India vs demand for thousands. Niche, high-paying, and future-proof.",
            kn: "ಭಾರತದಲ್ಲಿ ಕೇವಲ ~400 ಫೆಲೋಗಳಿವೆ, ಬೇಡಿಕೆ ಸಾವಿರಾರು. ವಿಶೇಷ, ಹೆಚ್ಚು ಸಂಬಳ ಮತ್ತು ಭವಿಷ್ಯ-ಸ್ಥಿರ."
        },
        topCompanies: ["LIC", "HDFC Life", "SBI Life", "Deloitte", "KPMG", "Willis Towers Watson"],
        relatedCareers: ["ca", "banking-gov"]
    },
    "entrepreneurship": {
        detailedDescription: {
            en: "Entrepreneurship means building something from scratch. You identify problems, create solutions, build teams, and drive growth — the ultimate career of freedom.",
            kn: "ಉದ್ಯಮಶೀಲತೆ ಎಂದರೆ ಶೂನ್ಯದಿಂದ ಏನನ್ನಾದರೂ ನಿರ್ಮಿಸುವುದು. ಸಮಸ್ಯೆ ಗುರುತಿಸಿ ಪರಿಹಾರ ರಚಿಸಿ ತಂಡ ಕಟ್ಟಿ ಬೆಳವಣಿಗೆ ಸಾಧಿಸಬಹುದು."
        },
        futureOutlook: {
            en: "India is the 3rd largest startup ecosystem globally. Government initiatives like Startup India provide massive support.",
            kn: "ಭಾರತ ಜಾಗತಿಕ 3ನೇ ಅತಿದೊಡ್ಡ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಪರಿಸರ. ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಇಂಡಿಯಾ ಉಪಕ್ರಮ ವ್ಯಾಪಕ ಬೆಂಬಲ ನೀಡುತ್ತದೆ."
        },
        topCompanies: ["Your own startup!", "Y Combinator Alumni", "Sequoia-backed ventures"],
        relatedCareers: ["management-bba", "digital-marketing"]
    },
    "cs-legal": {
        detailedDescription: {
            en: "A Company Secretary ensures every business stays legally compliant. They are the backbone of corporate governance across all public companies.",
            kn: "ಕಂಪನಿ ಕಾರ್ಯದರ್ಶಿ ಪ್ರತಿ ವ್ಯವಹಾರ ಕಾನೂನಾತ್ಮಕ ಅನುಸರಣೆಯಲ್ಲಿ ಉಳಿಯುವಂತೆ ಖಾತ್ರಿಪಡಿಸುತ್ತಾರೆ."
        },
        futureOutlook: {
            en: "Every listed company must have a qualified CS. High job security and growing demand.",
            kn: "ಪ್ರತಿ ಲಿಸ್ಟೆಡ್ ಕಂಪನಿಯು ಅರ್ಹ CS ಅನ್ನು ಹೊಂದಿರಬೇಕು. ಹೆಚ್ಚಿನ ಉದ್ಯೋಗ ಭದ್ರತೆ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರುವ ಬೇಡಿಕೆ."
        },
        topCompanies: ["NSE", "BSE", "Wipro", "Infosys", "Corporate Law Firms"],
        relatedCareers: ["ca", "law-integrated"]
    },
    "socio-public-policy": {
        detailedDescription: {
            en: "Social scientists and policy analysts shape how societies function. They research, evaluate, and advise governments, NGOs, and international bodies.",
            kn: "ಸಮಾಜ ವಿಜ್ಞಾನಿಗಳು ಮತ್ತು ನೀತಿ ವಿಶ್ಲೇಷಕರು ಸಮಾಜ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ರೀತಿ ರೂಪಿಸುತ್ತಾರೆ."
        },
        futureOutlook: {
            en: "Think tanks, the UN, World Bank, and state governments are expanding policy teams rapidly.",
            kn: "ಥಿಂಕ್ ಟ್ಯಾಂಕ್‌ಗಳು, UN, ವಿಶ್ವ ಬ್ಯಾಂಕ್ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರಗಳು ನೀತಿ ತಂಡಗಳನ್ನು ವಿಸ್ತರಿಸುತ್ತಿವೆ."
        },
        topCompanies: ["NITI Aayog", "World Bank", "UN India", "TISS", "NGO sector"],
        relatedCareers: ["civil-services", "law-integrated"]
    },
    "iti-trade": {
        detailedDescription: {
            en: "ITI and Trade certifications create skilled tradespeople who are the backbone of Indian manufacturing, building, and infrastructure maintenance.",
            kn: "ITI ಮತ್ತು ಟ್ರೇಡ್ ಪ್ರಮಾಣಪತ್ರಗಳು ಭಾರತದ ಉತ್ಪಾದನೆ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ ನಿರ್ವಹಣೆಯ ಬೆನ್ನೆಲುಬಾದ ಕೌಶಲಿಗಳನ್ನು ರಚಿಸುತ್ತದೆ."
        },
        futureOutlook: {
            en: "India's Make in India and Skill India programs are creating millions of skilled trade jobs.",
            kn: "ಭಾರತದ ಮೇಕ್ ಇನ್ ಇಂಡಿಯಾ ಮತ್ತು ಸ್ಕಿಲ್ ಇಂಡಿಯಾ ಕಾರ್ಯಕ್ರಮ ಲಕ್ಷಾಂತರ ಕೌಶಲ ಉದ್ಯೋಗ ರಚಿಸುತ್ತಿವೆ."
        },
        topCompanies: ["BHEL", "L&T", "Tata Steel", "MSME units", "Defence Ordnance Factories"],
        relatedCareers: ["btech-core", "digital-marketing"]
    },
    "banking-gov": {
        detailedDescription: {
            en: "Government banking careers (IBPS/SBI PO) offer stability, prestige, and a structured path to senior management with excellent perks.",
            kn: "ಸರ್ಕಾರಿ ಬ್ಯಾಂಕಿಂಗ್ ವೃತ್ತಿ (IBPS/SBI PO) ಸ್ಥಿರತೆ, ಪ್ರತಿಷ್ಠೆ ಮತ್ತು ಉನ್ನತ ನಿರ್ವಹಣೆಗೆ ಮಾರ್ಗ ನೀಡುತ್ತದೆ."
        },
        futureOutlook: {
            en: "With Jan Dhan, digital banking, and fintech growth, banking professionals remain in high demand.",
            kn: "ಜನ ಧನ, ಡಿಜಿಟಲ್ ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಫಿನ್ ಟೆಕ್ ಬೆಳವಣಿಗೆಯೊಂದಿಗೆ ಬ್ಯಾಂಕಿಂಗ್ ವೃತ್ತಿಪರರಿಗೆ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ ಇದೆ."
        },
        topCompanies: ["SBI", "RBI", "HDFC Bank", "ICICI Bank", "Bank of Baroda", "NABARD"],
        relatedCareers: ["ca", "civil-services"]
    }
};

// Merge enrichment data into careerData at runtime
export function enrichCareerData(careerData) {
    for (const category of Object.values(careerData)) {
        for (const subcategory of Object.values(category)) {
            for (const career of subcategory) {
                const extra = careerEnrichment[career.id];
                if (extra) Object.assign(career, extra);
            }
        }
    }
    return careerData;
}

export default careerEnrichment;
