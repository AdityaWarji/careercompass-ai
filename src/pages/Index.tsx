import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Search, Brain, TrendingUp, Linkedin, ArrowRight, Sparkles, Upload, Target, GraduationCap, Zap, Users, Award, BarChart3, Map, Mic } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const features = [
  { icon: FileText, title: "Resume Analyzer", desc: "AI-powered resume scoring with strengths, weaknesses, and improvement tips.", link: "/resume-analyzer", color: "from-violet-500 to-purple-600" },
  { icon: Search, title: "ATS Scanner", desc: "Optimize your resume for Applicant Tracking Systems with keyword matching.", link: "/ats-scanner", color: "from-blue-500 to-cyan-500" },
  { icon: Brain, title: "AI Interview Coach", desc: "Practice with skill-based questions at beginner to advanced difficulty.", link: "/interview-coach", color: "from-pink-500 to-rose-500" },
  { icon: TrendingUp, title: "Career Prediction", desc: "Discover best-fit roles with AI probability analysis.", link: "/career-prediction", color: "from-amber-500 to-orange-500" },
  { icon: Linkedin, title: "LinkedIn Analyzer", desc: "Boost your LinkedIn profile score and recruiter visibility.", link: "/linkedin-analyzer", color: "from-sky-500 to-blue-600" },
  { icon: Mic, title: "Voice Mock Interview", desc: "Simulate real interviews with voice recording and AI feedback.", link: "/voice-interview", color: "from-emerald-500 to-teal-500" },
];

const steps = [
  { icon: Upload, num: "01", title: "Upload Resume", desc: "Drop your PDF resume and let AI do the rest" },
  { icon: Sparkles, num: "02", title: "AI Analysis", desc: "Advanced NLP extracts skills, experience & insights" },
  { icon: Target, num: "03", title: "Career Insights", desc: "Get personalized career paths and role predictions" },
  { icon: GraduationCap, num: "04", title: "Interview Prep", desc: "Practice with tailored questions and mock interviews" },
];

const stats = [
  { value: "50K+", label: "Resumes Analyzed", icon: FileText },
  { value: "95%", label: "Accuracy Rate", icon: Zap },
  { value: "10K+", label: "Users Hired", icon: Users },
  { value: "200+", label: "Companies Trust Us", icon: Award },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-bg">
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, hsla(258, 90%, 62%, 0.15), transparent)", left: "10%", top: "-10%" }}
            animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, hsla(220, 70%, 55%, 0.12), transparent)", right: "5%", bottom: "0%" }}
            animate={{ y: [0, -25, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, hsla(280, 80%, 55%, 0.1), transparent)", left: "50%", top: "60%" }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground/80 text-sm mb-8"
            >
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span></span>
              Powered by Google Gemini AI
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-primary-foreground mb-8 leading-[1.05] tracking-tight">
              Your AI Career
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                Companion
              </span>
            </h1>

            <p className="text-primary-foreground/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Analyze resumes, predict career paths, prepare for interviews, and close skill gaps — all with one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/resume-analyzer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground font-semibold text-base shadow-[0_8px_30px_-6px_hsla(258,90%,62%,0.5)] hover:shadow-[0_12px_40px_-6px_hsla(258,90%,62%,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Analyze Resume
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-primary-foreground/15 text-primary-foreground/80 font-semibold backdrop-blur-sm hover:bg-primary-foreground/5 hover:border-primary-foreground/25 transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4" />
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="-mt-12 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="glass-card rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent mb-2">
                  <s.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Features</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
              Everything You Need to
              <br />
              <span className="gradient-text">Land Your Dream Job</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Six powerful AI tools designed to accelerate every stage of your career journey.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.08}>
                <Link to={f.link} className="group block glass-card rounded-2xl p-6 card-hover relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, hsla(258, 90%, 62%, 0.03), hsla(220, 70%, 55%, 0.03))` }} />
                  <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 relative">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 relative">
                    Try Now <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Process</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">From upload to career transformation in four simple steps.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.12}>
                <div className="relative text-center group">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                  )}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl glass-card mb-5 group-hover:shadow-[var(--shadow-elevated)] transition-shadow">
                    <s.icon className="h-8 w-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-btn text-xs font-bold flex items-center justify-center shadow-lg">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden gradient-bg p-10 sm:p-16 text-center">
              <div className="absolute inset-0">
                <motion.div
                  className="absolute w-[400px] h-[400px] rounded-full"
                  style={{ background: "radial-gradient(circle, hsla(258, 90%, 62%, 0.2), transparent)", right: "-10%", top: "-20%" }}
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="relative">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Transform Your Career?
                </h2>
                <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">
                  Join thousands of professionals who've accelerated their career growth with AI-powered insights.
                </p>
                <Link
                  to="/resume-analyzer"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-semibold backdrop-blur-sm hover:bg-primary-foreground/15 transition-all"
                >
                  Get Started Free <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
