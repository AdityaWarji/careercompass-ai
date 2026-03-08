import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import ScoreCircle from "@/components/ScoreCircle";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export default function ATSScannerPage() {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!jobDesc.trim() || !resumeText.trim()) {
      toast({ title: "Missing input", description: "Please provide both your resume text and job description.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("ats-scanner", {
        body: { resumeText: resumeText.trim(), jobDescription: jobDesc.trim() },
      });
      if (error) throw error;
      setResult(data.result);
    } catch (e: any) {
      console.error(e);
      toast({ title: "Error", description: e.message || "Failed to scan. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="mb-6"><BackButton onClick={result ? () => setResult(null) : undefined} /></div>
      <PageHeader icon={<Search className="h-7 w-7" />} title="ATS Resume Scanner" subtitle="Compare your resume against a job description using AI-powered analysis." />

      {!result && !loading ? (
        <AnimatedSection className="max-w-2xl mx-auto space-y-5">
          <div className="glass-card rounded-2xl p-6">
            <label className="block font-semibold mb-2 text-sm">Paste Your Resume Text</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={6}
              className="w-full rounded-xl bg-muted p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste your resume content here..."
            />
          </div>
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
          <button
            onClick={handleScan}
            disabled={!jobDesc.trim() || !resumeText.trim()}
            className="w-full gradient-btn py-3 rounded-xl font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" /> Scan Resume
          </button>
        </AnimatedSection>
      ) : loading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">Scanning with AI...</h3>
          <p className="text-muted-foreground text-sm">Comparing your resume against the job description</p>
        </motion.div>
      ) : result ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6 mt-4">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="font-display font-semibold text-xl mb-6">ATS Compatibility Score</h3>
            <ScoreCircle score={result.score} size={150} />
            <p className="text-muted-foreground text-sm mt-4">
              {result.score >= 80 ? "Excellent match! Your resume aligns well." : result.score >= 60 ? "Good match, but there's room for improvement." : "Low match. Consider adding missing keywords."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="glass-card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: "hsl(142, 71%, 45%)" }}>
              <h3 className="font-display font-semibold mb-3" style={{ color: "hsl(142, 71%, 45%)" }}>✓ Matched Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((k) => <span key={k} className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 text-sm">{k}</span>)}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: "hsl(25, 95%, 53%)" }}>
              <h3 className="font-display font-semibold mb-3" style={{ color: "hsl(25, 95%, 53%)" }}>✗ Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((k) => <span key={k} className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-700 dark:text-orange-400 text-sm">{k}</span>)}
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4">Optimization Suggestions</h3>
            <div className="space-y-3">
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="w-6 h-6 rounded-lg gradient-btn flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setResult(null)} className="gradient-btn px-6 py-2.5 rounded-xl text-sm font-semibold">
            Scan Another
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}
