import { useState } from "react";
import { FileText, Upload, CheckCircle, AlertCircle, Lightbulb, ArrowLeft, Home, BookOpen, Award, Briefcase, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
  strengths: ["Strong technical skill set with in-demand technologies", "Relevant industry certifications", "Solid project portfolio demonstrating practical skills"],
  weaknesses: ["Limited professional work experience", "No leadership or mentorship roles mentioned", "Missing soft skills and teamwork section"],
  suggestions: ["Add quantified achievements (e.g., 'Improved efficiency by 30%')", "Include a compelling professional summary at the top", "Add volunteer, leadership, or extracurricular experience", "Expand project descriptions with impact metrics and tech stack"],
};

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
    }, 2500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0] || null);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="page-container">
      {/* Top nav */}
      <div className="flex items-center gap-3 mb-6">
        {result ? (
          <button onClick={handleReset} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : null}
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Home className="h-4 w-4" /> Home
        </Link>
      </div>

      <PageHeader icon={<FileText className="h-7 w-7" />} title="Resume Analyzer" subtitle="Upload your resume and get AI-powered insights, scoring, and improvement suggestions." />

      {/* Upload state */}
      {!file && !analyzing && !result && (
        <AnimatedSection>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative glass-card rounded-3xl p-16 text-center cursor-pointer card-hover border-2 border-dashed border-border hover:border-primary/40 transition-all max-w-2xl mx-auto group"
          >
            <input
              type="file"
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
            <div className="w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Drag & Drop your Resume</h3>
            <p className="text-muted-foreground text-sm mb-4">or click to browse files</p>
            <span className="inline-block px-3 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-medium">PDF format recommended</span>
          </div>
        </AnimatedSection>
      )}

      {/* Analyzing */}
      {analyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <h3 className="font-display font-semibold text-lg mb-2">Analyzing your resume...</h3>
          <p className="text-muted-foreground text-sm">Our AI is extracting skills, experience, and insights</p>
          {file && <p className="text-xs text-muted-foreground mt-3 bg-muted inline-block px-3 py-1 rounded-lg">{file.name}</p>}
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && !analyzing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mt-4">

            {/* Score + File info */}
            <div className="glass-card rounded-3xl p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <ScoreCircle score={result.score} size={160} />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-display font-bold text-2xl mb-1">Resume Score</h3>
                  <p className="text-muted-foreground text-sm mb-4">Based on content quality, keyword density, and structure analysis</p>
                  {file && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium">
                      <FileText className="h-3.5 w-3.5" /> {file.name}
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${result.score >= 80 ? "bg-green-500/10 text-green-600" : result.score >= 60 ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"}`}>
                      {result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good — Needs Improvement" : "Needs Work"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center"><Lightbulb className="h-4 w-4" /></span>
                Detected Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-muted text-accent-foreground text-sm font-medium border border-border/50 hover:shadow-md transition-shadow cursor-default">{s}</span>
                ))}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Education", icon: BookOpen, items: result.education, color: "from-blue-500 to-cyan-500" },
                { title: "Experience", icon: Briefcase, items: result.experience, color: "from-violet-500 to-purple-500" },
                { title: "Projects", icon: FolderOpen, items: result.projects, color: "from-amber-500 to-orange-500" },
              ].map((section) => (
                <div key={section.title} className="glass-card rounded-2xl overflow-hidden card-hover">
                  <div className={`bg-gradient-to-r ${section.color} px-5 py-3 flex items-center gap-2`}>
                    <section.icon className="h-4 w-4 text-primary-foreground" />
                    <h3 className="font-display font-semibold text-sm text-primary-foreground">{section.title}</h3>
                  </div>
                  <div className="p-5 space-y-2">
                    {section.items.map((item) => (
                      <p key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            {result.certifications.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" /> Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.certifications.map((c) => (
                    <span key={c} className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium flex items-center gap-2">
                      <Award className="h-3.5 w-3.5" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: "hsl(142 71% 45%)" }}>
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" style={{ color: "hsl(142 71% 45%)" }} /> Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs" style={{ background: "hsla(142, 71%, 45%, 0.1)", color: "hsl(142 71% 45%)" }}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: "hsl(25 95% 53%)" }}>
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" style={{ color: "hsl(25 95% 53%)" }} /> Weaknesses
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((w) => (
                    <li key={w} className="text-sm text-muted-foreground flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs" style={{ background: "hsla(25, 95%, 53%, 0.1)", color: "hsl(25 95% 53%)" }}>!</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggestions */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30" style={{ background: "radial-gradient(circle, hsla(258, 90%, 62%, 0.15), transparent)" }} />
              <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2 relative">
                <span className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center"><Lightbulb className="h-4 w-4" /></span>
                Improvement Suggestions
              </h3>
              <div className="space-y-3 relative">
                {result.suggestions.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-accent/50 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg gradient-btn flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <p className="text-sm leading-relaxed">{s}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={handleReset} className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-muted text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" /> Analyze Another Resume
              </button>
              <Link to="/ats-scanner" className="flex-1 py-3 rounded-2xl font-semibold text-sm gradient-btn text-center flex items-center justify-center gap-2">
                Run ATS Scan →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
