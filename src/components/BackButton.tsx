import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick || (() => navigate(-1))}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  );
}
