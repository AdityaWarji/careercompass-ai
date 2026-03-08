import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";

interface ATSSuggestionsProps {
  suggestions: string[];
}

export default function ATSSuggestions({ suggestions }: ATSSuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsla(258, 90%, 62%, 0.06), transparent 40%)" }}
      />

      <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(258, 90%, 62%, 0.15), transparent)" }}
      />

      <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2 relative">
        <span className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center">
          <Lightbulb className="h-4 w-4" />
        </span>
        Optimization Suggestions
        <Sparkles className="h-4 w-4 text-primary/50 ml-1" />
      </h3>

      <div className="space-y-3 relative">
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ x: 4, backgroundColor: "hsla(258, 90%, 62%, 0.05)" }}
            className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 transition-all duration-300 cursor-default border border-transparent hover:border-primary/10"
          >
            <motion.span
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-7 h-7 rounded-lg gradient-btn flex items-center justify-center text-xs font-bold shrink-0"
            >
              {i + 1}
            </motion.span>
            <p className="text-sm leading-relaxed">{s}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
