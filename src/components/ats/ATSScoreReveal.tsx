import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

interface ATSScoreRevealProps {
  score: number;
  matchedCount: number;
  missingCount: number;
}

export default function ATSScoreReveal({ score, matchedCount, missingCount }: ATSScoreRevealProps) {
  const motionScore = useMotionValue(0);
  const displayed = useTransform(motionScore, (v) => Math.round(v));
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const controls = animate(motionScore, score, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = displayed.on("change", (v) => setCurrentScore(v));
    return () => { controls.stop(); unsub(); };
  }, [score]);

  const size = 200;
  const strokeWidth = 10;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;

  const getScoreColor = (s: number) => {
    if (s >= 80) return { color: "hsl(142, 71%, 45%)", label: "Excellent", badge: "✓ ATS Optimized", bg: "bg-green-500/10 text-green-600" };
    if (s >= 60) return { color: "hsl(38, 92%, 50%)", label: "Good", badge: "⚠ Needs Tuning", bg: "bg-amber-500/10 text-amber-600" };
    return { color: "hsl(0, 84%, 60%)", label: "Low", badge: "✗ Needs Work", bg: "bg-red-500/10 text-red-600" };
  };

  const info = getScoreColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden group"
    >
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsla(258, 90%, 62%, 0.08), transparent 40%)` }}
      />
      
      {/* Decorative pulse rings */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${info.color}22, transparent)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex flex-col sm:flex-row items-center gap-8 relative">
        {/* Score Circle */}
        <div className="relative" style={{ width: size, height: size }}>
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full"
            style={{ border: `2px solid ${info.color}33` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <svg width={size} height={size} className="-rotate-90">
            {/* Background track */}
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
            {/* Animated score arc */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={info.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - (score / 100) * circ }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: `drop-shadow(0 0 8px ${info.color}66)` }}
            />
            {/* Shimmer effect */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth - 4}
              strokeLinecap="round"
              strokeDasharray={`8 ${circ}`}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              opacity={0.15}
            />
          </svg>

          {/* Center score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="font-display font-black text-5xl"
              style={{ color: info.color }}
            >
              {currentScore}
            </motion.span>
            <span className="text-xs font-medium text-muted-foreground mt-1">out of 100</span>
          </div>
        </div>

        {/* Info panel */}
        <div className="flex-1 text-center sm:text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-display font-bold text-2xl mb-1">ATS Compatibility</h3>
            <p className="text-muted-foreground text-sm">
              {score >= 80 ? "Your resume is highly optimized for this position." :
               score >= 60 ? "Good match with room for keyword improvements." :
               "Significant optimization needed for this job posting."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${info.bg}`}>{info.badge}</span>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/5 border border-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">{matchedCount} matched</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{missingCount} missing</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
