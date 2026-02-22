const responses = {
    greeting: {
        en: [
            "Hey there! 😊 Ready to explore some exciting career paths today?",
            "Hi! I'm your career counselor. I'm here to help you figure out your next steps. What's on your mind?",
            "Hello! It's great to see you. Feel free to ask me anything about your career journey!",
            "Hi! I'm here to help you find a path that truly excites you. Where should we start?",
            "I'm doing great, thanks for asking! 😊 I'm here and ready to help you explore careers. What would you like to know?",
            "Doing well! Always happy when a student stops by. 😊 What career questions do you have for me today?"
        ],
        kn: [
            "ನಮಸ್ಕಾರ! 😊 ಇಂದು ಕೆಲವು ರೋಮಾಂಚಕ ವೃತ್ತಿ ಮಾರ್ಗಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
            "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ವೃತ್ತಿ ಸಲಹೆಗಾರ. ನಿಮ್ಮ ಮನಸ್ಸಲ್ಲಿ ಏನಿದೆ?",
            "ಹಲೋ! ನಿಮ್ಮನ್ನು ನೋಡಿ ಸಂತೋಷವಾಯಿತು. ನಿಮ್ಮ ವೃತ್ತಿ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ!",
            "ನಮಸ್ಕಾರ! ನಿಮಗೆ ಹೊಂದುವ ಮಾರ್ಗ ಕಂಡುಹಿಡಿಯಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸೋಣ?",
            "ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದ! 😊 ವೃತ್ತಿ ಬಗ್ಗೆ ಯಾವ ಪ್ರಶ್ನೆಗಳಿವೆ?"
        ]
    },
    help: {
        en: [
            "Happy to help! 😊 I can guide you through career options based on your class and interests. You can also ask me about salaries, growth, or even what a typical day looks like in any field.",
            "Think of me as your guide! Just tell me which class you're in, or what subjects you love, and we'll explore the options together.",
            "I'm here for you! You can click the buttons to move through the steps, or just type a message if you're confused about something."
        ],
        kn: [
            "ಸಹಾಯ ಮಾಡಲು ಸಂತೋಷ! 😊 ನಿಮ್ಮ ತರಗತಿ ಮತ್ತು ಆಸಕ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ ವೃತ್ತಿ ಆಯ್ಕೆಗಳ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ.",
            "ನನ್ನನ್ನು ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶಕ ಎಂದು ಭಾವಿಸಿ! ನೀವು ಯಾವ ತರಗತಿಯಲ್ಲಿದ್ದೀರಿ ಅಥವಾ ಯಾವ ವಿಷಯ ಇಷ್ಟ ಎಂದು ಹೇಳಿ.",
            "ನಿಮಗಾಗಿ ಇದ್ದೇನೆ! ಹೆಜ್ಜೆ ಹೆಜ್ಜೆಯಾಗಿ ಸಾಗಲು ಗುಂಡಿಗಳನ್ನು ಒತ್ತಿ, ಅಥವಾ ಗೊಂದಲವಿದ್ದರೆ ಟೈಪ್ ಮಾಡಿ."
        ]
    },
    doubt_clarification: {
        en: [
            "No worries! 😊 It's completely normal to feel a bit overwhelmed or confused. Let's take it one step at a time.",
            "That's a great question. Exploring careers is a journey, and I'm here to help you clear up any doubts along the way.",
            "It's totally okay to be unsure! Reaching out is the first step to finding clarity. What's bothering you the most?"
        ],
        kn: [
            "ಚಿಂತಿಸಬೇಡಿ! 😊 ಗೊಂದಲ ಅನಿಸುವುದು ಸಹಜ. ಹಂತ ಹಂತವಾಗಿ ಯೋಚಿಸೋಣ.",
            "ಉತ್ತಮ ಪ್ರಶ್ನೆ. ವೃತ್ತಿ ಅನ್ವೇಷಣೆ ಒಂದು ಪ್ರಯಾಣ, ಮತ್ತು ನಾನು ಎಲ್ಲ ಸಂದೇಹಗಳನ್ನು ನಿವಾರಿಸಲು ಇಲ್ಲಿದ್ದೇನೆ.",
            "ಗೊಂದಲ ಇರುವುದು ಸರಿ! ಕೇಳಿದ್ದೇ ಸ್ಪಷ್ಟತೆ ಕಂಡುಕೊಳ್ಳುವ ಮೊದಲ ಹೆಜ್ಜೆ. ಯಾವ ವಿಷಯ ತೊಂದರೆ ನೀಡುತ್ತಿದೆ?"
        ]
    },
    fallback: {
        en: [
            "I'm not quite sure I caught that. That's okay though! You can tell me things like:\n• what class you're in\n• what subjects you enjoy\n• or any career doubts you have",
            "I'm still learning! 😊 Could you try rephrasing that? For example, you can say 'I'm in Class 12' or ask 'What is the salary for an Architect?'",
            "That sounds interesting, but I'm mainly here for career guidance. Why don't you try asking about a specific stream or job you're curious about?",
            "I didn't quite get that, but don't worry. Just tell me what's on your mind regarding your studies or future plans!"
        ],
        kn: [
            "ಅದು ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಪರವಾಗಿಲ್ಲ! ನೀವು ಹೇಳಬಹುದು:\n• ನೀವು ಯಾವ ತರಗತಿಯಲ್ಲಿದ್ದೀರಿ\n• ಯಾವ ವಿಷಯ ಇಷ್ಟ\n• ಯಾವ ವೃತ್ತಿ ಸಂಶಯ ಇದೆ",
            "ನಾನು ಇನ್ನೂ ಕಲಿಯುತ್ತಿದ್ದೇನೆ! 😊 ಬೇರೆ ರೀತಿ ಹೇಳಲು ಪ್ರಯತ್ನಿಸಬಹುದೇ? ಉದಾ: 'ನಾನು 12ನೇ ತರಗತಿಯಲ್ಲಿದ್ದೇನೆ'",
            "ಅದು ಆಸಕ್ತಿದಾಯಕ, ಆದರೆ ನಾನು ಮುಖ್ಯವಾಗಿ ವೃತ್ತಿ ಮಾಹಿತಿಗಾಗಿ ಇದ್ದೇನೆ. ನಿರ್ದಿಷ್ಟ ವಿಭಾಗ ಅಥವಾ ವೃತ್ತಿ ಬಗ್ಗೆ ಕೇಳಿ.",
            "ಅದು ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ, ಆದರೆ ಚಿಂತಿಸಬೇಡಿ. ನಿಮ್ಮ ಓದಿನ ಅಥವಾ ಭವಿಷ್ಯದ ಬಗ್ಗೆ ಹೇಳಿ!"
        ]
    },
    restart: {
        en: [
            "Sure thing! Let's start fresh. 😊 Which class are you currently in?",
            "No problem at all! Let's begin from the top. Are you in Class 10 or 12?",
            "Starting over! Ready when you are. Just let me know which class you're studying in."
        ],
        kn: [
            "ಸರಿ! ಮೊದಲಿನಿಂದ ಪ್ರಾರಂಭಿಸೋಣ. 😊 ನೀವು ಯಾವ ತರಗತಿಯಲ್ಲಿದ್ದೀರಿ?",
            "ಸಮಸ್ಯೆಯಿಲ್ಲ! ಮೊದಲಿನಿಂದ ಪ್ರಾರಂಭಿಸೋಣ. ನೀವು 10ನೇ ತರಗತಿಯಲ್ಲಿದ್ದೀರಾ ಅಥವಾ 12ನೇ ತರಗತಿಯಲ್ಲಿ?",
            "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸುತ್ತಿದ್ದೇನೆ! ನೀವು ಸಿದ್ಧರಾದಾಗ ಹೇಳಿ. ನೀವು ಯಾವ ತರಗತಿ ಓದುತ್ತಿದ್ದೀರಿ?"
        ]
    },
    stay_on_track: {
        en: [
            "No worries, let's get back to our plan! 😊",
            "Anyway, back to your career exploration...",
            "Right, let's continue where we left off."
        ],
        kn: [
            "ಚಿಂತಿಸಬೇಡಿ, ನಮ್ಮ ಯೋಜನೆಗೆ ಮರಳೋಣ! 😊",
            "ಸರಿ, ನಿಮ್ಮ ವೃತ್ತಿ ಅನ್ವೇಷಣೆಗೆ ಮರಳೋಣ...",
            "ಸರಿ, ನಿಂತ ಕಡೆಯಿಂದ ಮುಂದುವರಿಯೋಣ."
        ]
    }
};

export const getRandomResponse = (intent, lang = 'en') => {
    const possibleOptions = responses[intent]?.[lang] || responses[intent]?.['en'] || responses.fallback['en'];
    return possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
};
