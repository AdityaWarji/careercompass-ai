import { Map, BookOpen, Wrench, FolderOpen, Award } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";

const stages = [
  {
    title: "Beginner Stage",
    color: "from-green-500 to-emerald-500",
    items: [
      { icon: BookOpen, label: "Topics", items: ["Python Basics", "Data Structures", "SQL Fundamentals", "Statistics 101"] },
      { icon: Wrench, label: "Tools", items: ["VS Code", "Jupyter Notebook", "Git & GitHub", "PostgreSQL"] },
      { icon: FolderOpen, label: "Projects", items: ["Calculator App", "To-Do List", "Data Cleaning Script", "Basic Dashboard"] },
      { icon: Award, label: "Certifications", items: ["Google Data Analytics", "Python for Everybody"] },
    ],
  },
  {
    title: "Intermediate Stage",
    color: "from-blue-500 to-indigo-500",
    items: [
      { icon: BookOpen, label: "Topics", items: ["Machine Learning", "Deep Learning Basics", "REST APIs", "Cloud Fundamentals"] },
      { icon: Wrench, label: "Tools", items: ["TensorFlow", "Docker", "AWS", "FastAPI"] },
      { icon: FolderOpen, label: "Projects", items: ["Sentiment Analysis", "ML Pipeline", "Full-Stack App", "Data Visualization"] },
      { icon: Award, label: "Certifications", items: ["AWS Cloud Practitioner", "TensorFlow Developer"] },
    ],
  },
  {
    title: "Advanced Stage",
    color: "from-purple-500 to-pink-500",
    items: [
      { icon: BookOpen, label: "Topics", items: ["MLOps", "System Design", "NLP Advanced", "Distributed Computing"] },
      { icon: Wrench, label: "Tools", items: ["Kubernetes", "Apache Spark", "MLflow", "Terraform"] },
      { icon: FolderOpen, label: "Projects", items: ["Production ML System", "Real-time Analytics", "AI SaaS Product", "Open Source Contribution"] },
      { icon: Award, label: "Certifications", items: ["AWS Solutions Architect", "Google Professional ML Engineer"] },
    ],
  },
];

export default function CareerRoadmapPage() {
  return (
    <div className="page-container">
      <PageHeader icon={<Map className="h-7 w-7" />} title="AI Career Roadmap" subtitle="Your personalized learning path from beginner to advanced." />

      <div className="max-w-4xl mx-auto space-y-8">
        {stages.map((stage, si) => (
          <AnimatedSection key={stage.title} delay={si * 0.15}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${stage.color} p-4`}>
                <h3 className="font-display font-bold text-lg text-primary-foreground">{stage.title}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stage.items.map((item) => (
                  <div key={item.label}>
                    <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                      <item.icon className="h-4 w-4 text-primary" /> {item.label}
                    </h4>
                    <ul className="space-y-1">
                      {item.items.map((t) => (
                        <li key={t} className="text-sm text-muted-foreground flex gap-2">• {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
