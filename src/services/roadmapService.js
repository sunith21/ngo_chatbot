import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a career roadmap PDF by capturing a DOM element.
 * This approach ensures perfect text shaping for Kannada.
 * 
 * @param {HTMLElement} element - The DOM element to capture (RoadmapTemplate)
 * @param {string} userName - The name of the student for the file name
 */
export const generateRoadmap = async (element, userName) => {
    try {
        if (!element) return;

        // Capture with high scale for better PDF quality
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // If it fits on one page
        if (pdfHeight <= pdf.internal.pageSize.getHeight()) {
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        } else {
            // Multi-page support if needed
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }
        }

        const fileName = userName ? `${userName}_Career_Roadmap.pdf` : "My_Career_Roadmap.pdf";
        pdf.save(fileName);
        return true;
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return false;
    }
};
