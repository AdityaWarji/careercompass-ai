import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Search, Brain, TrendingUp, Linkedin, Mic, Map, BarChart3, ArrowRight, Star, Upload, Sparkles, Target, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

const features = [
  { icon: FileText, title: "Resume Analyzer", desc: "Get detailed analysis of your resume with AI-powered insights and scoring.", link: "/resume-analyzer" },
  { icon: Search, title: "ATS Scanner", desc: "Check if your resume passes Applicant Tracking Systems with keyword optimization.", link: "/ats-scanner" },
  { icon: Brain, title: "AI Interview Coach", desc: "Practice with AI-generated questions tailored to your skills and experience.", link: "/interview-coach" },
  { icon: TrendingUp, title: "Career Prediction", desc: "Discover the best career paths based on your skills and experience.", link: "/career-prediction" },
  { icon: Linkedin, title: "LinkedIn Analyzer", desc: "Optimize your LinkedIn profile for maximum visibility and recruiter engagement.", link: "/linkedin-analyzer" },
];

const steps = [
  { icon: Upload, title: "Upload Resume", desc: "Upload your resume in PDF format" },
  { icon: Sparkles, title: "AI Analysis", desc: "Our AI processes and analyzes your resume" },
  { icon: Target, title: "Career Insights", desc: "Get personalized career recommendations" },
  { icon: GraduationCap, title: "Interview Prep", desc: "Prepare with tailored interview questions" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Software Engineer at Google", text: "CareerCompass AI helped me identify skill gaps I didn't know I had. Landed my dream job in 3 months!", avatar: "SC" },
  { name: "James Rodriguez", role: "Data Scientist at Meta", text: "The ATS scanner was a game-changer. My resume callback rate increased by 300% after optimizing.", avatar: "JR" },
  { name: "Priya Sharma", role: "ML Engineer at Amazon", text: "The mock interview feature gave me the confidence I needed. Highly recommend for anyone job hunting!", avatar: "PS" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full animate-pulse-glow"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
                background: `radial-gradient(circle, hsla(258, 90%, 62%, ${0.08 - i * 0.01}), transparent)`,
                left: `${10 + i * 18}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/80 text-sm mb-6">
              <Sparkles className="h-4 w-4" /> Powered by Advanced AI
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Your AI Career<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Companion</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Analyze your resume, discover career opportunities, prepare for interviews, and build a smarter career with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/resume-analyzer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Analyze Resume <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-primary-foreground/20 text-primary-foreground/90 font-semibold hover:bg-primary-foreground/5 transition-all"
              >
                Explore Features
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Powerful <span className="gradient-text">AI Features</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to accelerate your career journey, powered by cutting-edge AI.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <Link to={f.link} className="block glass-card rounded-2xl p-6 card-hover group">
                  <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to transform your career trajectory.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.15} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-btn mb-4">
                  <s.icon className="h-7 w-7" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">What Our <span className="gradient-text">Users Say</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 card-hover">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
