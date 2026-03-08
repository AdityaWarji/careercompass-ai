import { TrendingUp, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

const roles = [
  { role: "Data Scientist", probability: 92, reason: "Strong Python, ML, and data analysis skills with relevant project experience." },
  { role: "ML Engineer", probability: 85, reason: "TensorFlow expertise and ML pipeline project demonstrate practical ML engineering skills." },
  { role: "Software Developer", probability: 78, reason: "React and full-stack experience with solid programming fundamentals." },
  { role: "AI Engineer", probability: 72, reason: "Combined ML knowledge with software engineering makes you a strong AI engineer candidate." },
  { role: "Data Analyst", probability: 68, reason: "SQL and data analysis skills are well-suited for analyst roles." },
  { role: "Web Developer", probability: 55, reason: "React experience provides a foundation, but more frontend depth needed." },
];

export default function CareerPredictionPage() {
  return (
    <div className="page-container">
      <div className="mb-6"><BackButton /></div>
      <PageHeader icon={<TrendingUp className="h-7 w-7" />} title="Career Prediction" subtitle="Discover the best career roles based on your skills and experience." />

      <div className="max-w-3xl mx-auto space-y-4">
        {roles.slice(0, 3).map((r, i) => (
          <AnimatedSection key={r.role} delay={i * 0.1}>
            <div className="glass-card rounded-2xl p-6 card-hover">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-lg">{r.role}</h3>
                <span className="font-display font-bold text-lg gradient-text">{r.probability}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.probability}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{r.reason}</p>
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection delay={0.4}>
          <h3 className="font-display font-semibold text-lg mt-8 mb-4">Other Potential Roles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {roles.slice(3).map((r) => (
              <div key={r.role} className="glass-card rounded-xl p-4 text-center">
                <p className="font-semibold text-sm mb-1">{r.role}</p>
                <p className="gradient-text font-bold">{r.probability}%</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
