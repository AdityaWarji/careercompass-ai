import { LayoutDashboard, FileText, TrendingUp, BarChart3, Brain, Map, Search } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ScoreCircle from "@/components/ScoreCircle";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const topRoles = [
  { role: "Data Scientist", pct: 92 },
  { role: "ML Engineer", pct: 85 },
  { role: "Software Developer", pct: 78 },
];

const quickLinks = [
  { icon: FileText, label: "Resume Analyzer", to: "/resume-analyzer" },
  { icon: Search, label: "ATS Scanner", to: "/ats-scanner" },
  { icon: Brain, label: "Interview Coach", to: "/interview-coach" },
  { icon: Map, label: "Career Roadmap", to: "/career-roadmap" },
];

export default function DashboardPage() {
  return (
    <div className="page-container">
      <PageHeader icon={<LayoutDashboard className="h-7 w-7" />} title="Dashboard" subtitle="Your career analysis at a glance." />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Score cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedSection>
            <div className="glass-card rounded-2xl p-6 text-center">
              <ScoreCircle score={78} size={100} label="Resume Score" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="glass-card rounded-2xl p-6 text-center">
              <ScoreCircle score={65} size={100} label="ATS Score" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="glass-card rounded-2xl p-6 text-center">
              <ScoreCircle score={72} size={100} label="LinkedIn Score" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold gradient-text mb-1">7</div>
              <div className="text-xs text-muted-foreground">Skills Detected</div>
              <div className="font-display text-3xl font-bold text-orange-500 mt-2">5</div>
              <div className="text-xs text-muted-foreground">Skills to Learn</div>
            </div>
          </AnimatedSection>
        </div>

        {/* Top roles */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Top Career Roles</h3>
            <div className="space-y-3">
              {topRoles.map((r) => (
                <div key={r.role} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-40">{r.role}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-sm font-bold gradient-text w-10 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Quick links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((l, i) => (
            <AnimatedSection key={l.label} delay={i * 0.1}>
              <Link to={l.to} className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 card-hover text-center">
                <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
                  <l.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{l.label}</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
