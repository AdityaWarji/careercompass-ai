import { useState } from "react";
import { FileText, Upload, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import ScoreCircle from "@/components/ScoreCircle";
import AnimatedSection from "@/components/AnimatedSection";

const mockResult = {
  score: 78,
  skills: ["Python", "Machine Learning", "React", "SQL", "Data Analysis", "TensorFlow", "Git", "Docker"],
  education: ["B.Tech Computer Science - XYZ University (2020-2024)"],
  experience: ["Software Intern at ABC Corp (6 months)", "Data Analyst at DEF Inc (1 year)"],
  projects: ["Sentiment Analysis Tool", "E-commerce Dashboard", "ML Pipeline Automation"],
  certifications: ["AWS Cloud Practitioner", "Google Data Analytics"],
  strengths: ["Strong technical skill set", "Relevant certifications", "Good project experience"],
  weaknesses: ["Limited work experience", "No leadership roles mentioned", "Missing soft skills section"],
  suggestions: ["Add quantified achievements (e.g., 'Improved efficiency by 30%')", "Include a professional summary", "Add volunteer or leadership experience", "Expand project descriptions with impact metrics"],
};

export default function ResumeAnalyzerPage() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
    }, 2000);
  };

  return (
    <div className="page-container">
      <PageHeader icon={<FileText className="h-7 w-7" />} title="Resume Analyzer" subtitle="Upload your resume and get AI-powered insights, scoring, and improvement suggestions." />

      {!uploaded && (
        <AnimatedSection>
          <div
            onClick={handleUpload}
            className="glass-card rounded-2xl p-12 text-center cursor-pointer card-hover border-2 border-dashed border-border hover:border-primary/50 transition-colors max-w-2xl mx-auto"
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-display font-semibold text-lg mb-2">Drag & Drop your Resume</h3>
            <p className="text-muted-foreground text-sm">or click to browse • PDF format recommended</p>
          </div>
        </AnimatedSection>
      )}

      {analyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your resume with AI...</p>
        </motion.div>
      )}

      <AnimatePresence>
        {result && !analyzing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-8">
            {/* Score */}
            <div className="glass-card rounded-2xl p-8 text-center">
              <h3 className="font-display font-semibold text-xl mb-6">Resume Score</h3>
              <ScoreCircle score={result.score} size={150} />
            </div>

            {/* Skills */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4">Detected Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Education */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3">Education</h3>
                {result.education.map((e) => <p key={e} className="text-sm text-muted-foreground">{e}</p>)}
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3">Experience</h3>
                {result.experience.map((e) => <p key={e} className="text-sm text-muted-foreground mb-1">{e}</p>)}
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3">Projects</h3>
                {result.projects.map((p) => <p key={p} className="text-sm text-muted-foreground mb-1">{p}</p>)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths.map((s) => <li key={s} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-green-500 mt-1">✓</span>{s}</li>)}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-orange-500" /> Weaknesses</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((w) => <li key={w} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-orange-500 mt-1">!</span>{w}</li>)}
                </ul>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Suggestions</h3>
              <ul className="space-y-2">
                {result.suggestions.map((s) => <li key={s} className="text-sm text-muted-foreground flex items-start gap-2"><span className="gradient-text">→</span>{s}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
