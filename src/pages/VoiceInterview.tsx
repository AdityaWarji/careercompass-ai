import { useState } from "react";
import { Mic, MicOff, Play } from "lucide-react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ScoreCircle from "@/components/ScoreCircle";

const jobRoles = ["Software Developer", "Data Scientist", "ML Engineer", "Web Developer", "Data Analyst"];
const mockQuestions = [
  "Tell me about yourself and your experience.",
  "What is your greatest technical strength?",
  "Describe a challenging project you worked on.",
  "How do you stay updated with new technologies?",
  "Where do you see yourself in 5 years?",
];

export default function VoiceInterviewPage() {
  const [role, setRole] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [recording, setRecording] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleStart = () => { if (role) setStarted(true); };
  const handleNext = () => {
    if (currentQ < mockQuestions.length - 1) { setCurrentQ(currentQ + 1); setRecording(false); }
    else setCompleted(true);
  };

  const handleReset = () => { setCompleted(false); setStarted(false); setCurrentQ(0); setRole(""); };

  if (completed) {
    return (
      <div className="page-container">
        <div className="mb-6"><BackButton onClick={handleReset} /></div>
        <PageHeader icon={<Mic className="h-7 w-7" />} title="Interview Summary" subtitle={`Mock interview for ${role} completed.`} />
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="font-display font-semibold text-xl mb-6">Overall Performance</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              <ScoreCircle score={75} label="Confidence" />
              <ScoreCircle score={82} label="Answer Quality" />
              <ScoreCircle score={68} label="Clarity" />
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-3">Suggested Improvements</h3>
            <div className="space-y-2">
              {["Use the STAR method for behavioral questions", "Include more specific technical examples", "Slow down your pace for better clarity", "Quantify achievements with numbers and metrics"].map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="w-6 h-6 rounded-lg gradient-btn flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleReset} className="gradient-btn px-6 py-3 rounded-xl text-sm font-semibold">Start New Interview</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="mb-6"><BackButton onClick={started ? () => setStarted(false) : undefined} /></div>
      <PageHeader icon={<Mic className="h-7 w-7" />} title="Voice Mock Interview" subtitle="Practice answering interview questions using your microphone with AI feedback." />

      {!started ? (
        <AnimatedSection className="max-w-lg mx-auto">
          <div className="glass-card rounded-2xl p-6">
            <label className="block font-semibold text-sm mb-3">Select Job Role</label>
            <div className="space-y-2">
              {jobRoles.map((r) => (
                <button key={r} onClick={() => setRole(r)} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${role === r ? "gradient-btn" : "bg-muted hover:bg-accent"}`}>{r}</button>
              ))}
            </div>
            <button onClick={handleStart} disabled={!role} className="w-full mt-4 gradient-btn py-3 rounded-xl font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
              <Play className="h-4 w-4" /> Start Interview
            </button>
          </div>
        </AnimatedSection>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
          <div className="text-center text-sm text-muted-foreground">Question {currentQ + 1} of {mockQuestions.length}</div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-primary)" }} animate={{ width: `${((currentQ + 1) / mockQuestions.length) * 100}%` }} />
          </div>
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="font-display text-xl font-semibold mb-8">{mockQuestions[currentQ]}</p>
            <button onClick={() => setRecording(!recording)} className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${recording ? "bg-destructive animate-pulse" : "gradient-btn"}`}>
              {recording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </button>
            <p className="text-sm text-muted-foreground mt-3">{recording ? "Recording... Click to stop" : "Click to start recording"}</p>
          </div>
          <div className="flex justify-end">
            <button onClick={handleNext} className="gradient-btn px-6 py-2.5 rounded-xl text-sm font-semibold">
              {currentQ < mockQuestions.length - 1 ? "Next Question" : "Finish Interview"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
