import { useAuth } from "@/contexts/AuthContext";

export default function GreetingBadge() {
  const { user } = useAuth();
  if (!user) return null;

  const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User";

  return (
    <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
      Hi, <span className="text-foreground font-semibold">{name}</span> 👋
    </span>
  );
}
