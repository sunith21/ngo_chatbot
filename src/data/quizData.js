export const quizData = {
    questions: [
        {
            id: 1,
            question: {
                en: "In your free time, what would you rather do?",
                kn: "ನಿಮ್ಮ ಬಿಡುವಿನ ವೇಳೆಯಲ್ಲಿ ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?"
            },
            options: [
                {
                    text: { en: "Solve a complex puzzle or math problem", kn: "ಸಂಕೀರ್ಣ ಒಗಟು ಅಥವಾ ಗಣಿತ ಸಮಸ್ಯೆ ಬಿಡಿಸು" },
                    weights: { Science: 3, Commerce: 1 }
                },
                {
                    text: { en: "Write stories or read about history/culture", kn: "ಕಥೆ ಬರೆ ಅಥವಾ ಇತಿಹಾಸ/ಸಂಸ್ಕೃತಿ ಬಗ್ಗೆ ಓದು" },
                    weights: { Arts: 3 }
                },
                {
                    text: { en: "Plan a business or track pocket money", kn: "ವ್ಯವಹಾರ ಯೋಜಿಸು ಅಥವಾ ಜೇಬು ಹಣ ಲೆಕ್ಕ ಇಡು" },
                    weights: { Commerce: 3 }
                },
                {
                    text: { en: "Sketch, design, or create something artistic", kn: "ಚಿತ್ರ ಬಿಡಿಸು, ವಿನ್ಯಾಸ ಮಾಡು ಅಥವಾ ಕಲಾತ್ಮಕ ವಸ್ತು ರಚಿಸು" },
                    weights: { Arts: 2, Science: 1 }
                }
            ]
        },
        {
            id: 2,
            question: {
                en: "Which subject sounds most interesting to you?",
                kn: "ಯಾವ ವಿಷಯ ನಿಮಗೆ ಹೆಚ್ಚು ಆಸಕ್ತಿದಾಯಕ ಎನಿಸುತ್ತದೆ?"
            },
            options: [
                {
                    text: { en: "Physics or Biology", kn: "ಭೌತಶಾಸ್ತ್ರ ಅಥವಾ ಜೀವಶಾಸ್ತ್ರ" },
                    weights: { Science: 3 }
                },
                {
                    text: { en: "Accountancy or Economics", kn: "ಲೆಕ್ಕಪತ್ರ ಅಥವಾ ಅರ್ಥಶಾಸ್ತ್ರ" },
                    weights: { Commerce: 3 }
                },
                {
                    text: { en: "Politics or Literature", kn: "ರಾಜಕೀಯ ಶಾಸ್ತ್ರ ಅಥವಾ ಸಾಹಿತ್ಯ" },
                    weights: { Arts: 3 }
                },
                {
                    text: { en: "Psychology or Design", kn: "ಮನೋವಿಜ್ಞಾನ ಅಥವಾ ವಿನ್ಯಾಸ" },
                    weights: { Arts: 2, Science: 1 }
                }
            ]
        },
        {
            id: 3,
            question: {
                en: "What kind of work environment do you prefer?",
                kn: "ನೀವು ಯಾವ ರೀತಿಯ ಕೆಲಸದ ವಾತಾವರಣ ಬಯಸುತ್ತೀರಿ?"
            },
            options: [
                {
                    text: { en: "A high-tech lab or research center", kn: "ತಂತ್ರಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ ಅಥವಾ ಸಂಶೋಧನಾ ಕೇಂದ್ರ" },
                    weights: { Science: 3 }
                },
                {
                    text: { en: "A corporate office or stock exchange", kn: "ಕಾರ್ಪೊರೇಟ್ ಕಚೇರಿ ಅಥವಾ ಷೇರು ಮಾರುಕಟ್ಟೆ" },
                    weights: { Commerce: 3 }
                },
                {
                    text: { en: "A creative studio or courtroom", kn: "ಸೃಜನಶೀಲ ಸ್ಟುಡಿಯೊ ಅಥವಾ ನ್ಯಾಯಾಲಯ" },
                    weights: { Arts: 3 }
                },
                {
                    text: { en: "A hospital or clinic", kn: "ಆಸ್ಪತ್ರೆ ಅಥವಾ ಕ್ಲಿನಿಕ್" },
                    weights: { Science: 3 }
                }
            ]
        },
        {
            id: 4,
            question: {
                en: "How do you approach a problem?",
                kn: "ನೀವು ಸಮಸ್ಯೆಯನ್ನು ಹೇಗೆ ಎದುರಿಸುತ್ತೀರಿ?"
            },
            options: [
                {
                    text: { en: "Logical analysis and data", kn: "ತಾರ್ಕಿಕ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ದತ್ತಾಂಶ" },
                    weights: { Science: 3, Commerce: 2 }
                },
                {
                    text: { en: "Understanding people and social impact", kn: "ಜನರನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಮತ್ತು ಸಾಮಾಜಿಕ ಪ್ರಭಾವ" },
                    weights: { Arts: 3 }
                },
                {
                    text: { en: "Efficiency and profit/loss mindset", kn: "ದಕ್ಷತೆ ಮತ್ತು ಲಾಭ/ನಷ್ಟ ಮನೋಭಾವ" },
                    weights: { Commerce: 3 }
                },
                {
                    text: { en: "Intuition and creative experimentation", kn: "ಅಂತಃಪ್ರಜ್ಞೆ ಮತ್ತು ಸೃಜನಶೀಲ ಪ್ರಯೋಗ" },
                    weights: { Arts: 3 }
                }
            ]
        },
        {
            id: 5,
            question: {
                en: "What is your ultimate goal?",
                kn: "ನಿಮ್ಮ ಮುಖ್ಯ ಗುರಿ ಏನು?"
            },
            options: [
                {
                    text: { en: "Innovate and build new things", kn: "ಹೊಸದನ್ನು ಸಂಶೋಧಿಸು ಮತ್ತು ನಿರ್ಮಿಸು" },
                    weights: { Science: 3 }
                },
                {
                    text: { en: "Lead a business or manage finances", kn: "ವ್ಯವಹಾರ ನಡೆಸು ಅಥವಾ ಹಣಕಾಸು ನಿರ್ವಹಿಸು" },
                    weights: { Commerce: 3 }
                },
                {
                    text: { en: "Shape policy or express ideas", kn: "ನೀತಿ ರೂಪಿಸು ಅಥವಾ ಆಲೋಚನೆ ವ್ಯಕ್ತಪಡಿಸು" },
                    weights: { Arts: 3 }
                },
                {
                    text: { en: "Excel in a specialized craft/skill", kn: "ವಿಶೇಷ ಕೌಶಲ್ಯದಲ್ಲಿ ಪ್ರವೀಣನಾಗು" },
                    weights: { Arts: 2, Science: 2, Commerce: 2 }
                }
            ]
        }
    ]
};
