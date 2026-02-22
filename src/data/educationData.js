const educationData = {
    class10: {
        sciencePCM: {
            name: { en: "Science (PCM)", kn: "ವಿಜ್ಞಾನ (ಭೌತ-ರಸಾಯನ-ಗಣಿತ)" },
            subjects: { en: "Physics, Chemistry, Mathematics", kn: "ಭೌತಶಾಸ್ತ್ರ, ರಸಾಯನಶಾಸ್ತ್ರ, ಗಣಿತ" },
            suitableFor: { en: "Students interested in Engineering, Architecture, and Pure Sciences.", kn: "ಎಂಜಿನಿಯರಿಂಗ್, ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಶುದ್ಧ ವಿಜ್ಞಾನಗಳಲ್ಲಿ ಆಸಕ್ತಿ ಇರುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ." },
            flexibility: { en: "High - Allows switching to Commerce or Arts later.", kn: "ಅಧಿಕ - ನಂತರ ವಾಣಿಜ್ಯ ಅಥವಾ ಕಲೆಗೆ ಬದಲಾಯಿಸಲು ಅವಕಾಶ." }
        },
        sciencePCB: {
            name: { en: "Science (PCB)", kn: "ವಿಜ್ಞಾನ (ಭೌತ-ರಸಾಯನ-ಜೀವ)" },
            subjects: { en: "Physics, Chemistry, Biology", kn: "ಭೌತಶಾಸ್ತ್ರ, ರಸಾಯನಶಾಸ್ತ್ರ, ಜೀವಶಾಸ್ತ್ರ" },
            suitableFor: { en: "Students aiming for Medical, Dental, or Life Sciences.", kn: "ವೈದ್ಯಕೀಯ, ದಂತ ಚಿಕಿತ್ಸೆ ಅಥವಾ ಜೀವ ವಿಜ್ಞಾನ ಗುರಿ ಇರುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ." },
            flexibility: { en: "Moderate - Biology focus limits some engineering paths.", kn: "ಮಧ್ಯಮ - ಜೀವಶಾಸ್ತ್ರ ಗಮನ ಕೆಲವು ಎಂಜಿನಿಯರಿಂಗ್ ಮಾರ್ಗಗಳನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ." }
        },
        commerceMaths: {
            name: { en: "Commerce (with Maths)", kn: "ವಾಣಿಜ್ಯ (ಗಣಿತ ಸಹಿತ)" },
            subjects: { en: "Accounts, Business Studies, Economics, Mathematics", kn: "ಲೆಕ್ಕಪತ್ರ, ವ್ಯವಹಾರ ಅಧ್ಯಯನ, ಅರ್ಥಶಾಸ್ತ್ರ, ಗಣಿತ" },
            suitableFor: { en: "Aspiring CA, CS, Analysts, or Finance professionals.", kn: "CA, CS, ವಿಶ್ಲೇಷಕರು ಅಥವಾ ಹಣಕಾಸು ವೃತ್ತಿಪರರಾಗಲು ಆಸಕ್ತಿ ಇರುವವರಿಗೆ." },
            flexibility: { en: "Good - Math opens many management and data roles.", kn: "ಉತ್ತಮ - ಗಣಿತ ಅನೇಕ ನಿರ್ವಹಣೆ ಮತ್ತು ದತ್ತಾಂಶ ಪಾತ್ರಗಳನ್ನು ತೆರೆಯುತ್ತದೆ." }
        },
        commerceNoMaths: {
            name: { en: "Commerce (without Maths)", kn: "ವಾಣಿಜ್ಯ (ಗಣಿತ ರಹಿತ)" },
            subjects: { en: "Accounts, Business Studies, Economics, Information Practices", kn: "ಲೆಕ್ಕಪತ್ರ, ವ್ಯವಹಾರ ಅಧ್ಯಯನ, ಅರ್ಥಶಾಸ್ತ್ರ, ಮಾಹಿತಿ ಅಭ್ಯಾಸ" },
            suitableFor: { en: "Students focused on Law, Management, or standard Business roles.", kn: "ಕಾನೂನು, ನಿರ್ವಹಣೆ ಅಥವಾ ಸಾಮಾನ್ಯ ವ್ಯವಹಾರ ಪಾತ್ರಗಳ ಮೇಲೆ ಗಮನ ಇರುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ." },
            flexibility: { en: "Limited - Might restrict some high-end finance degrees.", kn: "ಸಿಮಿತ - ಕೆಲವು ಉನ್ನತ ಹಣಕಾಸು ಪದವಿಗಳನ್ನು ನಿರ್ಬಂಧಿಸಬಹುದು." }
        },
        arts: {
            name: { en: "Arts & Humanities", kn: "ಕಲೆ ಮತ್ತು ಮಾನವಿಕ" },
            subjects: { en: "History, Political Science, Sociology, Psychology", kn: "ಇತಿಹಾಸ, ರಾಜಕೀಯ ಶಾಸ್ತ್ರ, ಸಮಾಜಶಾಸ್ತ್ರ, ಮನೋವಿಜ್ಞಾನ" },
            suitableFor: { en: "Future Lawyers, Civil Service aspirants, Designers, or Psychologists.", kn: "ಭವಿಷ್ಯದ ವಕೀಲರು, ನಾಗರಿಕ ಸೇವೆ ಆಕಾಂಕ್ಷಿಗಳು, ವಿನ್ಯಾಸಕರು ಅಥವಾ ಮನೋವೈದ್ಯರಿಗೆ." },
            flexibility: { en: "Flexible - Great for diverse creative and administrative fields.", kn: "ಹೊಂದಿಕೊಳ್ಳುವ - ವೈವಿಧ್ಯಮಯ ಸೃಜನಶೀಲ ಮತ್ತು ಆಡಳಿತ ಕ್ಷೇತ್ರಗಳಿಗೆ ಉತ್ತಮ." }
        },
        vocational: {
            name: { en: "Vocational & Skill-based", kn: "ವೃತ್ತಿ ಮತ್ತು ಕೌಶಲ್ಯ ಆಧಾರಿತ" },
            subjects: { en: "Varies by course (e.g., UI/UX, Digital Marketing, Trades)", kn: "ಕೋರ್ಸ್ ಪ್ರಕಾರ ಬದಲಾಗುತ್ತದೆ (ಉದಾ: UI/UX, ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್, ಕುಶಲ ಕರ್ಮ)" },
            suitableFor: { en: "Students wanting job-ready skills or practical technical roles.", kn: "ಉದ್ಯೋಗಕ್ಕೆ ಸಿದ್ಧ ಕೌಶಲ್ಯ ಅಥವಾ ಪ್ರಾಯೋಗಿಕ ತಾಂತ್ರಿಕ ಪಾತ್ರ ಬಯಸುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ." },
            flexibility: { en: "Specific - Focused on specialized industries.", kn: "ನಿರ್ದಿಷ್ಟ - ವಿಶೇಷ ಕೈಗಾರಿಕೆಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕೃತ." }
        }
    },
    class12: {
        sciencePCM: "science.PCM",
        sciencePCB: "science.PCB",
        commerceMaths: "commerce.withMaths",
        commerceNoMaths: "commerce.withoutMaths",
        arts: "arts.humanities",
        vocational: "vocational.technical",
        government: "government.administrative"
    }
};

export default educationData;
