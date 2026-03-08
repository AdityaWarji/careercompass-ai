import { useState } from "react";
import { Search, Upload, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ATSScoreReveal from "@/components/ats/ATSScoreReveal";
import ATSKeywordsGrid from "@/components/ats/ATSKeywordsGrid";
import ATSSuggestions from "@/components/ats/ATSSuggestions";
import ATSScanningAnimation from "@/components/ats/ATSScanningAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { saveActivity } from "@/lib/saveActivity";
import { sendNotification } from "@/lib/sendNotification";

interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export default function ATSScannerPage() {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [step, setStep] = useState<"upload" | "jobdesc">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    const isBinary = /\.(pdf|doc|docx)$/i.test(f.name);
    if (isBinary) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileBase64((e.target?.result as string).split(",")[1]);
        setFileName(f.name);
        setResumeText("__file_uploaded__");
        setStep("jobdesc");
      };
      reader.readAsDataURL(f);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumeText(e.target?.result as string);
        setStep("jobdesc");
      };
      reader.readAsText(f);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] || null);
  };

  const handleScan = async () => {
    if (!jobDesc.trim() || (!resumeText.trim() && !fileBase64)) {
      toast({ title: "Missing input", description: "Please provide both resume and job description.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const body: Record<string, string> = { jobDescription: jobDesc.trim() };
      if (fileBase64 && fileName) {
        body.fileBase64 = fileBase64;
        body.fileName = fileName;
      } else {
        body.resumeText = resumeText.trim();
      }
      const { data, error } = await supabase.functions.invoke("ats-scanner", { body });
      if (error) throw error;
      setResult(data.result);
      if (user) {
        saveActivity({
          userId: user.id, activityType: "ats_scan", title: "ATS Scan",
          summary: `Score: ${data.result.score}/100 • ${data.result.matchedKeywords?.length || 0} matched, ${data.result.missingKeywords?.length || 0} missing`,
          score: data.result.score, resultData: data.result,
        });
        sendNotification(user.id, "ATS Scan Complete",
          `ATS score: ${data.result.score}/100 — ${data.result.matchedKeywords?.length || 0} keywords matched, ${data.result.missingKeywords?.length || 0} missing.`,
          "analysis", "/ats-scanner"
        );
      }
    } catch (e: any) {
      console.error(e);
      toast({ title: "Error", description: e.message || "Failed to scan.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null); setResumeText(""); setFileBase64(null); setFileName(null);
    setJobDesc(""); setResult(null); setStep("upload");
  };

  return (
    <div className="page-container">
      <div className="mb-6">
        <BackButton onClick={result ? handleReset : step === "jobdesc" ? () => setStep("upload") : undefined} />
      </div>
      <PageHeader icon={<Search className="h-7 w-7" />} title="ATS Resume Scanner" subtitle="Upload your resume, paste a job description, and get AI-powered ATS compatibility analysis." />

      {/* Step indicators */}
      {!result && !loading && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === "upload" ? "gradient-btn" : "bg-accent text-accent-foreground"}`}
            >
              <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold">1</span>
              Upload Resume
            </motion.div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === "jobdesc" ? "gradient-btn" : "bg-muted text-muted-foreground"}`}
            >
              <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold">2</span>
              Job Description
            </motion.div>
          </div>
        </div>
      )}

      {/* Step 1: Upload */}
      <AnimatePresence mode="wait">
        {step === "upload" && !result && !loading && (
          <AnimatedSection key="upload" className="max-w-2xl mx-auto space-y-5">
            <motion.div
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
              onDrop={handleDrop}
              onClick={() => (document.getElementById("ats-file-input") as HTMLInputElement)?.click()}
              whileHover={{ scale: 1.01 }}
              className={`relative glass-card rounded-3xl p-16 text-center cursor-pointer border-2 border-dashed transition-all group ${
                isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/40"
              }`}
            >
              <input id="ats-file-input" type="file" accept=".pdf,.txt,.doc,.docx" className="hidden"
                onChange={(e) => { handleFile(e.target.files?.[0] || null); e.target.value = ""; }} />
              
              {/* Hover flash overlay */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsla(258, 90%, 62%, 0.08), transparent 40%)" }} />

              <motion.div
                className={`w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-5 transition-transform ${isDragging ? "scale-125" : ""}`}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Upload className="h-8 w-8" />
              </motion.div>
              <h3 className="font-display font-semibold text-xl mb-2">{isDragging ? "Drop your file here!" : "Drag & Drop your Resume"}</h3>
              <p className="text-muted-foreground text-sm mb-4">or click to browse files</p>
              <span className="inline-block px-3 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-medium">TXT, PDF, DOC supported</span>
            </motion.div>

            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-3">or paste your resume text directly</p>
              <button onClick={() => setStep("jobdesc")} className="text-sm font-medium text-primary hover:underline">Skip to paste text →</button>
            </div>
          </AnimatedSection>
        )}

        {/* Step 2: Job Description */}
        {step === "jobdesc" && !result && !loading && (
          <AnimatedSection key="jobdesc" className="max-w-2xl mx-auto space-y-5">
            {file && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-4 flex items-center gap-3 group hover:border-primary/20 border border-transparent transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">Resume uploaded</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            )}

            {!file && (
              <div className="glass-card rounded-2xl p-6">
                <label className="block font-semibold mb-2 text-sm">Paste Your Resume Text</label>
                <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={5}
                  className="w-full rounded-xl bg-muted p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Paste your resume content here..." />
              </div>
            )}

            <div className="glass-card rounded-2xl p-6">
              <label className="block font-semibold mb-2 text-sm">Paste Job Description</label>
              <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} rows={6}
                className="w-full rounded-xl bg-muted p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Paste the full job description here..." />
            </div>

            <motion.button
              onClick={handleScan}
              disabled={!jobDesc.trim() || !resumeText.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-btn py-4 rounded-2xl font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" /> Scan for ATS Compatibility
            </motion.button>
          </AnimatedSection>
        )}

        {/* Loading */}
        {loading && <ATSScanningAnimation key="loading" />}

        {/* Results */}
        {result && !loading && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6 mt-4">
            <ATSScoreReveal score={result.score} matchedCount={result.matchedKeywords.length} missingCount={result.missingKeywords.length} />
            <ATSKeywordsGrid matchedKeywords={result.matchedKeywords} missingKeywords={result.missingKeywords} />
            <ATSSuggestions suggestions={result.suggestions} />

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="pt-2">
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-muted text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="h-4 w-4" /> Scan Another Resume
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
