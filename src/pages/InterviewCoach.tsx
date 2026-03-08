import { useState } from "react";
import { Brain, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

const allQuestions: { skill: string; question: string; difficulty: Difficulty }[] = [
  { skill: "Python", question: "What is the difference between a list and a tuple in Python?", difficulty: "Beginner" },
  { skill: "Python", question: "Explain decorators and give a use case.", difficulty: "Intermediate" },
  { skill: "Machine Learning", question: "What is overfitting and how do you prevent it?", difficulty: "Beginner" },
  { skill: "Machine Learning", question: "Explain the bias-variance tradeoff.", difficulty: "Intermediate" },
  { skill: "Machine Learning", question: "How does gradient boosting differ from random forests?", difficulty: "Advanced" },
  { skill: "React", question: "What are React hooks and why were they introduced?", difficulty: "Beginner" },
  { skill: "React", question: "Explain the virtual DOM reconciliation process.", difficulty: "Advanced" },
  { skill: "SQL", question: "What is the difference between INNER JOIN and LEFT JOIN?", difficulty: "Beginner" },
  { skill: "Data Analysis", question: "How do you handle missing data in a dataset?", difficulty: "Intermediate" },
  { skill: "TensorFlow", question: "What is a computational graph in TensorFlow?", difficulty: "Advanced" },
];

const diffColors: Record<Difficulty, string> = {
  Beginner: "bg-green-500/10 text-green-700 dark:text-green-400",
  Intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Advanced: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function InterviewCoachPage() {
  const [filter, setFilter] = useState<Difficulty | "All">("All");
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const filtered = filter === "All" ? allQuestions : allQuestions.filter((q) => q.difficulty === filter);

  return (
    <div className="page-container">
      <div className="mb-6"><BackButton /></div>
      <PageHeader icon={<Brain className="h-7 w-7" />} title="AI Interview Coach" subtitle="Practice with AI-generated interview questions tailored to your skills." />

      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="flex flex-wrap gap-2 mb-6">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === d ? "gradient-btn" : "bg-muted text-muted-foreground hover:bg-accent"}`}
            >
              {d}
            </button>
          ))}
        </AnimatedSection>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((q, i) => (
              <motion.div key={q.question} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.05 }} onClick={() => setShowAnswer(showAnswer === i ? null : i)} className="glass-card rounded-2xl p-5 cursor-pointer card-hover">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground font-medium">{q.skill}</span>
                    <p className="font-medium mt-1">{q.question}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${diffColors[q.difficulty]}`}>{q.difficulty}</span>
                </div>
                {showAnswer === i && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-muted-foreground border-t border-border pt-3">
                    Click to reveal model answer — practice answering first!
                  </motion.p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatedSection className="mt-6">
          <button className="gradient-btn px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Generate More Questions
          </button>
        </AnimatedSection>
      </div>
    </div>
  );
}
