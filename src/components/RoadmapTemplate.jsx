import React from "react";
import { getTranslation } from "../utils/translations";

const loc = (field, lang) => {
    if (!field) return "";
    if (typeof field === "object" && (field.en || field.kn)) return field[lang] || field.en || "";
    return field;
};

const Section = ({ title, children }) => (
    <div style={{ marginBottom: "18px" }}>
        <div style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "10px",
        }}>
            {title}
        </div>
        <div style={{ paddingLeft: "4px" }}>{children}</div>
    </div>
);

const Field = ({ label, value }) => {
    if (!value) return null;
    return (
        <div style={{ marginBottom: "8px", fontSize: "13px", lineHeight: "1.6" }}>
            <span style={{ fontWeight: "600", color: "#333" }}>{label}: </span>
            <span style={{ color: "#222" }}>{value}</span>
        </div>
    );
};

export const RoadmapTemplate = ({ userData }) => {
    const { name, selectedClass, selectedStream, career, lang = "en" } = userData;
    const t = (key) => getTranslation(lang, key);
    const careerName = loc(career.name, lang);

    const milestones = [
        `Class ${selectedClass || 12}: Focus on relevant core subjects and score well.`,
        `Year 1-2: Clear entrance exams (${career.entrance?.[0] || "relevant exam"}).`,
        `Year 2-4: Complete ${loc(career.degree, lang) || "undergraduate degree"}.`,
        `Year 3-4: Build portfolio via internships and projects.`,
        `Year 5+: Target roles at leading companies in the field.`,
    ];

    return (
        <div id="roadmap-template" style={{
            width: "794px",
            background: "#fff",
            fontFamily: "'Outfit', 'Inter', sans-serif",
            color: "#111",
            padding: "0",
        }}>
            {/* Header */}
            <div style={{
                background: "#1e1b4b",
                padding: "24px 28px",
                marginBottom: "24px",
            }}>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#a78bfa", marginBottom: "8px" }}>
                    {t("pdfTitle")}
                </div>
                <div style={{ fontSize: "12px", color: "#c8c8e0" }}>
                    {t("pdfGeneratedFor")}: {name || (lang === "en" ? "Aspiring Student" : "ವಿದ್ಯಾರ್ಥಿ")} &nbsp;|&nbsp; {new Date().toLocaleDateString(lang === "kn" ? "kn-IN" : "en-IN")}
                </div>
                <div style={{ fontSize: "11px", color: "#a0a0c0", marginTop: "4px" }}>
                    {t("pdfFooter")}
                </div>
            </div>

            <div style={{ padding: "0 28px 28px" }}>
                {/* Education */}
                <Section title={t("pdfEducationProfile")}>
                    <Field label={t("pdfCurrentClass")} value={t("pdfClass").replace("{cls}", selectedClass || "12")} />
                    <Field label={t("pdfChosenStream")} value={selectedStream || "—"} />
                </Section>

                {/* Target Career */}
                <Section title={t("pdfTargetCareerPath")}>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#4f46e5", marginBottom: "10px" }}>
                        {careerName}
                    </div>
                    {career.degree && (
                        <Field label={lang === "en" ? "Degree" : "ಪದವಿ"} value={loc(career.degree, lang)} />
                    )}
                    {career.detailedDescription && (
                        <Field label={t("pdfAbout")} value={loc(career.detailedDescription, lang)} />
                    )}
                </Section>

                {/* Eligibility */}
                <Section title={t("pdfEligibilityExams")}>
                    {career.eligibility && <Field label={t("pdfEligibility")} value={loc(career.eligibility, lang)} />}
                    {career.entrance && <Field label={t("pdfEntranceExams")} value={career.entrance.join(", ")} />}
                    {career.duration && <Field label={t("pdfDuration")} value={loc(career.duration, lang)} />}
                </Section>

                {/* Career Growth */}
                <Section title={t("pdfCareerGrowth")}>
                    {career.salary && <Field label={t("pdfSalaryRange")} value={career.salary} />}
                    {career.jobGrowth && <Field label={t("pdfJobGrowth")} value={loc(career.jobGrowth, lang)} />}
                    {career.futureOutlook && <Field label={t("pdfFutureOutlook")} value={loc(career.futureOutlook, lang)} />}
                    {career.workLife && <Field label={t("pdfWorkLife")} value={loc(career.workLife, lang)} />}
                </Section>

                {/* Milestones */}
                <Section title={t("pdfMilestones")}>
                    {milestones.map((m, i) => (
                        <div key={i} style={{ fontSize: "13px", color: "#222", marginBottom: "6px", lineHeight: "1.6" }}>
                            {i + 1}. {m}
                        </div>
                    ))}
                </Section>

                {/* Top Companies */}
                {career.topCompanies?.length > 0 && (
                    <Section title={t("pdfTopCompaniesTitle")}>
                        <Field label={t("pdfCompaniesLabel")} value={career.topCompanies.join(" | ")} />
                    </Section>
                )}

                {/* Skills */}
                {career.skills?.length > 0 && (
                    <Section title={t("pdfSkillsTitle")}>
                        <Field label={t("pdfSkillsLabel")} value={career.skills.join(", ")} />
                    </Section>
                )}

                {/* Backup Options */}
                {career.backupOptions?.length > 0 && (
                    <Section title={t("pdfBackupTitle")}>
                        <Field label={t("pdfAlternativesLabel")} value={career.backupOptions.join(", ")} />
                    </Section>
                )}

                {/* Resources */}
                {career.resources?.length > 0 && (
                    <Section title={t("pdfResourcesTitle")}>
                        <Field label={t("pdfResourcesLabel")} value={career.resources.join(", ")} />
                    </Section>
                )}

                {/* Footer */}
                <div style={{
                    background: "#1e1b4b",
                    color: "#c8c8e0",
                    fontSize: "10px",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    marginTop: "16px",
                    textAlign: "center",
                }}>
                    {t("pdfFooter")}
                </div>
            </div>
        </div>
    );
};
