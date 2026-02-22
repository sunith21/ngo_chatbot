/**
 * Logic-only guidance engine.
 * No AI used here - only deterministic rules for Indian education context.
 */

const GUIDANCE_RULES = {
    class_10_start: {
        baseResponse: "Since you're in Class 10, the main goal is picking the right stream for Class 11. You can choose Science (PCM/PCB), Commerce (with or without Maths), or Arts.",
        followUp: "Do you have a favorite subject, like Maths, Science, or Social Studies?"
    },
    class_12_start: {
        baseResponse: "In Class 12, it's time to look at undergraduate degrees. Depending on your stream, you can explore Engineering, Medical, CA, Law, or even creative fields.",
        followUp: "Which stream did you take in Class 12?"
    },
    commerce_no_maths: {
        baseResponse: "Commerce without Maths is a great path! You can pursue BBA, Law (BBA LLB), Company Secretary (CS), or even Digital Marketing and Design.",
        followUp: "Are you more interested in business management or something creative like design?"
    },
    science_pcm: {
        baseResponse: "With PCM, you're set for Engineering (B.Tech), Architecture, or Pure Sciences. You can also look at newer fields like Data Science and AI.",
        followUp: "Do you enjoy building things or solving complex problems through code?"
    },
    science_pcb: {
        baseResponse: "PCB opens doors to Medicine (MBBS), Dentistry (BDS), and allied sciences like Physiotherapy or Biotech. You can also explore Psychology.",
        followUp: "Would you prefer treating patients directly or working in research and labs?"
    },
    stream_confusion: {
        baseResponse: "It's normal to feel confused! Many students switch streams later. The key is to look at the subjects you find most engaging.",
        followUp: "If you could only study one subject for the rest of the year, which one would it be?"
    },
    exam_info: {
        baseResponse: "Entrance exams are the standard gateway in India. JEE for Engineering, NEET for Medical, and CLAT for Law are the big ones.",
        followUp: "Is there a specific exam you're worried about or want to know more about?"
    }
};

export function getGuidance(intent, entities, currentStep) {
    let context = "general";

    // Class-based logic
    if (entities.class === "10") context = "class_10_start";
    if (entities.class === "12") context = "class_12_start";

    // Stream-based logic (High priority)
    if (entities.stream === "commerceNoMaths") context = "commerce_no_maths";
    if (entities.stream === "sciencePCM") context = "science_pcm";
    if (entities.stream === "sciencePCB") context = "science_pcb";

    // Intent-based logic
    if (intent === "stream_confusion") context = "stream_confusion";
    if (intent === "exam_doubt") context = "exam_info";

    const rule = GUIDANCE_RULES[context] || {
        baseResponse: "That's an interesting question! Let's explore that path together.",
        followUp: "What's the main thing you want to know about this field?"
    };

    return rule;
}
