import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "@/pages/Index";
import ResumeAnalyzer from "@/pages/ResumeAnalyzer";
import ATSScanner from "@/pages/ATSScanner";
import CareerPrediction from "@/pages/CareerPrediction";
import SkillExplorer from "@/pages/SkillExplorer";
import InterviewCoach from "@/pages/InterviewCoach";
import VoiceInterview from "@/pages/VoiceInterview";
import LinkedInAnalyzer from "@/pages/LinkedInAnalyzer";
import CareerRoadmap from "@/pages/CareerRoadmap";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import History from "@/pages/History";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/resume-analyzer", element: <ResumeAnalyzer /> },
  { path: "/ats-scanner", element: <ATSScanner /> },
  { path: "/career-prediction", element: <CareerPrediction /> },
  { path: "/skill-explorer", element: <SkillExplorer /> },
  { path: "/interview-coach", element: <InterviewCoach /> },
  { path: "/voice-interview", element: <VoiceInterview /> },
  { path: "/linkedin-analyzer", element: <LinkedInAnalyzer /> },
  { path: "/career-roadmap", element: <CareerRoadmap /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/history", element: <History /> },
  { path: "*", element: <NotFound /> },
];

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PageTransition>{element}</PageTransition>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}
