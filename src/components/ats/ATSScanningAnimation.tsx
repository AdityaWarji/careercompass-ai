import { motion } from "framer-motion";
import { Search, FileText, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  { icon: FileText, label: "Extracting resume content", color: "hsl(var(--primary))" },
  { icon: Search, label: "Matching keywords to job description", color: "hsl(var(--secondary))" },
  { icon: Sparkles, label: "Analyzing ATS compatibility", color: "hsl(258, 90%, 68%)" },
  { icon: CheckCircle, label: "Generating optimization tips", color: "hsl(142, 71%, 45%)" },
];

export default function ATSScanningAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16 max-w-lg mx-auto"
    >
      {/* Document scan visual */}
      <div className="relative w-44 h-56 mx-auto mb-10">
        {/* Document frame */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Fake text lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="mx-4 my-2 h-2 rounded-full bg-muted"
              style={{ width: `${50 + Math.random() * 40}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-1 rounded-full z-10"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--secondary)), transparent)",
            boxShadow: "0 0 20px 4px hsla(258, 90%, 62%, 0.4)",
          }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Corner markers */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-5 h-5 border-primary ${cls}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Glow effect behind document */}
        <motion.div
          className="absolute -inset-8 rounded-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsla(258, 90%, 62%, 0.12), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.h3
        className="font-display font-bold text-xl mb-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scanning your resume...
      </motion.h3>
      <p className="text-muted-foreground text-sm mb-8">AI is analyzing your resume against the job description</p>

      {/* Progress steps */}
      <div className="space-y-3 text-left">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 1.0 }}
              className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 group hover:border-primary/30 transition-colors"
            >
              <motion.div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${step.color}15` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: i * 1.0 + 0.5, duration: 0.5 }}
              >
                <Icon className="h-4 w-4" style={{ color: step.color }} />
              </motion.div>
              <span className="text-sm font-medium">{step.label}</span>
              <motion.div
                className="ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: step.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, backgroundColor: step.color }}
                transition={{ delay: i * 1.0 + 0.8, duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 1.0 + 0.9 }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <motion.div className="mt-8 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-primary)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
