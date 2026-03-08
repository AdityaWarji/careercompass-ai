import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ATSKeywordsGridProps {
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function ATSKeywordsGrid({ matchedKeywords, missingKeywords }: ATSKeywordsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Matched */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-card rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
      >
        <div className="px-6 py-4 flex items-center gap-2 bg-green-500/5 border-b border-green-500/10">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <h3 className="font-display font-semibold text-green-600 dark:text-green-400">
            Matched ({matchedKeywords.length})
          </h3>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((k, i) => (
              <motion.span
                key={k}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1.5 rounded-xl text-sm font-medium bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 cursor-default transition-shadow hover:shadow-md hover:shadow-green-500/10"
              >
                {k}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Missing */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-card rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
      >
        <div className="px-6 py-4 flex items-center gap-2 bg-orange-500/5 border-b border-orange-500/10">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <h3 className="font-display font-semibold text-orange-600 dark:text-orange-400">
            Missing ({missingKeywords.length})
          </h3>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((k, i) => (
              <motion.span
                key={k}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1.5 rounded-xl text-sm font-medium bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20 cursor-default transition-shadow hover:shadow-md hover:shadow-orange-500/10"
              >
                {k}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
