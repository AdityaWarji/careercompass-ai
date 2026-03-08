import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import ScoreCircle from "@/components/ScoreCircle";
import AnimatedSection from "@/components/AnimatedSection";

export default function ATSScannerPage() {
  const [jobDesc, setJobDesc] = useState("");
  const [scanned, setScanned] = useState(false);

  const mockATS = {
    score: 65,
    matchedKeywords: ["Python", "Machine Learning", "Data Analysis", "SQL"],
    missingKeywords: ["Agile", "Scrum", "CI/CD", "Kubernetes", "REST APIs"],
    suggestions: [
      "Add measurable achievements (e.g., 'Reduced latency by 40%')",
      "Include industry-specific keywords from the job description",
      "Mention technical tools: Jira, Jenkins, AWS",
      "Use action verbs: Led, Developed, Optimized",
    ],
  };

  return (
    <div className="page-container">
      <PageHeader icon={<Search className="h-7 w-7" />} title="ATS Resume Scanner" subtitle="Check how well your resume matches a job description and optimize for Applicant Tracking Systems." />

      {!scanned ? (
        <AnimatedSection className="max-w-2xl mx-auto space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <label className="block font-semibold mb-2 text-sm">Paste Job Description</label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows={6}
              className="w-full rounded-xl bg-muted p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste the job description here..."
            />
          </div>
          <div className="glass-card rounded-2xl p-6 text-center border-2 border-dashed border-border">
            <p className="text-muted-foreground text-sm mb-4">Upload your resume (PDF)</p>
            <button className="gradient-btn px-6 py-2 rounded-xl text-sm font-semibold">Choose File</button>
          </div>
          <button
            onClick={() => setScanned(true)}
            className="w-full gradient-btn py-3 rounded-xl font-semibold text-sm"
          >
            Scan Resume
          </button>
        </AnimatedSection>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mt-6">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="font-display font-semibold text-xl mb-6">ATS Compatibility Score</h3>
            <ScoreCircle score={mockATS.score} size={150} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-3 text-green-600">✓ Matched Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {mockATS.matchedKeywords.map((k) => <span key={k} className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 text-sm">{k}</span>)}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-3 text-orange-600">✗ Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {mockATS.missingKeywords.map((k) => <span key={k} className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-700 text-sm">{k}</span>)}
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Optimization Suggestions</h3>
            <ul className="space-y-2">
              {mockATS.suggestions.map((s) => <li key={s} className="text-sm text-muted-foreground flex gap-2"><span className="gradient-text">→</span>{s}</li>)}
            </ul>
          </div>
          <button onClick={() => setScanned(false)} className="gradient-btn px-6 py-2.5 rounded-xl text-sm font-semibold">Scan Another</button>
        </motion.div>
      )}
    </div>
  );
}
