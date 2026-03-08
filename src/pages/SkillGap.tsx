import { useState } from "react";
import { BarChart3, BookOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

const existingSkills = ["Python", "Machine Learning", "React", "SQL", "Data Analysis", "TensorFlow", "Git"];
const missingSkills = ["SQL Advanced", "Power BI", "Statistics", "Docker", "Cloud Computing", "Kubernetes", "Apache Spark"];

const learningPlan = [
  { skill: "Docker", resource: "Docker for Beginners - Udemy", time: "2 weeks" },
  { skill: "Cloud Computing", resource: "AWS Cloud Practitioner Path", time: "4 weeks" },
  { skill: "Power BI", resource: "Microsoft Power BI Certification", time: "3 weeks" },
  { skill: "Statistics", resource: "Khan Academy Statistics Course", time: "6 weeks" },
  { skill: "Kubernetes", resource: "Kubernetes Fundamentals - Coursera", time: "3 weeks" },
];

export default function SkillGapPage() {
  const [showPlan, setShowPlan] = useState(false);

  return (
    <div className="page-container">
      <PageHeader icon={<BarChart3 className="h-7 w-7" />} title="Skill Gap Analysis" subtitle="Compare your skills with industry requirements and build a learning plan." />

      <div className="max-w-3xl mx-auto space-y-6">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 text-green-600 flex items-center gap-2">✓ Skills You Have</h3>
            <div className="flex flex-wrap gap-2">
              {existingSkills.map((s) => <span key={s} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-700 text-sm font-medium">{s}</span>)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 text-orange-600 flex items-center gap-2">✗ Skills to Learn</h3>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((s) => <span key={s} className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-700 text-sm font-medium">{s}</span>)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <button onClick={() => setShowPlan(!showPlan)} className="gradient-btn px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Generate Learning Plan
          </button>
        </AnimatedSection>

        {showPlan && (
          <AnimatedSection>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">Personalized Learning Plan</h3>
              <div className="space-y-3">
                {learningPlan.map((l, i) => (
                  <div key={l.skill} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                    <span className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{l.skill}</p>
                      <p className="text-xs text-muted-foreground">{l.resource}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">{l.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
