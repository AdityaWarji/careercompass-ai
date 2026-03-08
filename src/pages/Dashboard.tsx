import { LayoutDashboard, FileText, TrendingUp, Brain, Map, Search, Compass, ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

const quickLinks = [
  { icon: FileText, label: "Resume Analyzer", desc: "Score your resume", to: "/resume-analyzer", color: "from-violet-500 to-purple-600" },
  { icon: Search, label: "ATS Scanner", desc: "Optimize for ATS", to: "/ats-scanner", color: "from-blue-500 to-cyan-500" },
  { icon: Brain, label: "Interview Coach", desc: "Practice questions", to: "/interview-coach", color: "from-pink-500 to-rose-500" },
  { icon: TrendingUp, label: "Career Prediction", desc: "Find best roles", to: "/career-prediction", color: "from-amber-500 to-orange-500" },
  { icon: Compass, label: "Skill Explorer", desc: "Learn new skills", to: "/skill-explorer", color: "from-emerald-500 to-teal-500" },
  { icon: Map, label: "Career Roadmap", desc: "Plan your path", to: "/career-roadmap", color: "from-sky-500 to-blue-600" },
];

export default function DashboardPage() {
  return (
    <div className="page-container">
      <div className="mb-6"><BackButton /></div>
      <PageHeader icon={<LayoutDashboard className="h-7 w-7" />} title="Dashboard" subtitle="Your career analysis hub. Use the tools below to get started." />

      <div className="max-w-5xl mx-auto">
        {/* Welcome card */}
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsla(258, 90%, 62%, 0.3), transparent)" }} />
            <h3 className="font-display font-bold text-2xl mb-2 relative">Welcome to CareerCompass AI</h3>
            <p className="text-muted-foreground text-sm max-w-lg relative">
              Start by analyzing your resume to unlock personalized career insights, skill gap analysis, and interview preparation powered by Gemini AI.
            </p>
            <Link to="/resume-analyzer" className="mt-4 inline-flex items-center gap-2 gradient-btn px-6 py-3 rounded-xl font-semibold text-sm relative">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((l, i) => (
            <AnimatedSection key={l.label} delay={i * 0.08}>
              <Link to={l.to} className="glass-card rounded-2xl p-6 flex items-start gap-4 card-hover group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <l.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base mb-1">{l.label}</h3>
                  <p className="text-muted-foreground text-sm">{l.desc}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
