import { useState } from "react";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import ScoreCircle from "@/components/ScoreCircle";
import AnimatedSection from "@/components/AnimatedSection";

const mockResult = {
  score: 72,
  skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
  suggestions: [
    "Improve your headline — use keywords recruiters search for",
    "Add a professional summary with quantified achievements",
    "Include at least 3 project descriptions with outcomes",
    "Add certifications and courses to boost credibility",
    "Request recommendations from colleagues and mentors",
    "Use a professional headshot and custom banner image",
  ],
};

export default function LinkedInAnalyzerPage() {
  const [text, setText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="page-container">
      <PageHeader icon={<Linkedin className="h-7 w-7" />} title="LinkedIn Profile Analyzer" subtitle="Paste your LinkedIn profile text and get AI-powered optimization suggestions." />

      {!analyzed ? (
        <AnimatedSection className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-6">
            <label className="block font-semibold text-sm mb-2">Paste Your LinkedIn Profile Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="w-full rounded-xl bg-muted p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Copy and paste your LinkedIn 'About' section, experience, skills, etc."
            />
            <button onClick={() => setAnalyzed(true)} className="mt-4 w-full gradient-btn py-3 rounded-xl font-semibold text-sm">
              Analyze Profile
            </button>
          </div>
        </AnimatedSection>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="font-display font-semibold text-xl mb-6">Profile Strength</h3>
            <ScoreCircle score={mockResult.score} size={150} />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Detected Skills</h3>
            <div className="flex flex-wrap gap-2">
              {mockResult.skills.map((s) => <span key={s} className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium">{s}</span>)}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Optimization Suggestions</h3>
            <ul className="space-y-2">
              {mockResult.suggestions.map((s) => <li key={s} className="text-sm text-muted-foreground flex gap-2"><span className="gradient-text">→</span>{s}</li>)}
            </ul>
          </div>
          <button onClick={() => setAnalyzed(false)} className="gradient-btn px-6 py-2.5 rounded-xl text-sm font-semibold">Analyze Another</button>
        </motion.div>
      )}
    </div>
  );
}
