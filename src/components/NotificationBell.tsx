import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, Trash2, BriefcaseBusiness, FileText, Lightbulb, Info, X, ArrowRight, ExternalLink } from "lucide-react";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const typeIcons: Record<string, typeof Info> = {
  job_match: BriefcaseBusiness,
  analysis: FileText,
  tip: Lightbulb,
  info: Info,
};

const typeColors: Record<string, string> = {
  job_match: "from-amber-500 to-orange-500",
  analysis: "from-violet-500 to-purple-600",
  tip: "from-emerald-500 to-teal-500",
  info: "from-blue-500 to-cyan-500",
};

const typeGlows: Record<string, string> = {
  job_match: "hsla(30, 90%, 55%, 0.15)",
  analysis: "hsla(258, 90%, 62%, 0.15)",
  tip: "hsla(160, 70%, 45%, 0.15)",
  info: "hsla(210, 90%, 55%, 0.15)",
};

function NotificationPopup({ notif, onClose }: { notif: Notification; onClose: () => void }) {
  const navigate = useNavigate();
  const Icon = typeIcons[notif.type] || Info;
  const color = typeColors[notif.type] || "from-blue-500 to-cyan-500";
  const glow = typeGlows[notif.type] || "hsla(210, 90%, 55%, 0.15)";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Popup */}
      <motion.div
        className="relative w-full max-w-md rounded-3xl border border-border/50 overflow-hidden"
        style={{ background: "var(--glass-bg)", boxShadow: `0 25px 80px -12px ${glow}, var(--shadow-elevated)` }}
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flash shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.12) 45%, hsla(0,0%,100%,0.04) 50%, transparent 55%)",
          }}
          initial={{ x: "-200%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Glow orb */}
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-8">
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl`}>
                <Icon className="h-8 w-8 text-primary-foreground" />
              </div>
              {/* Pulse ring */}
              <motion.div
                className={`absolute -inset-2 rounded-2xl border-2 border-current opacity-30`}
                style={{ borderColor: glow.replace("0.15", "0.5") }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="font-display text-xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {notif.title}
          </motion.h2>

          {/* Type badge */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
              {notif.type.replace("_", " ")}
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            className="rounded-2xl bg-muted/30 border border-border/30 p-5 mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-foreground/80 leading-relaxed">{notif.message}</p>
          </motion.div>

          {/* Time */}
          <motion.p
            className="text-center text-xs text-muted-foreground/50 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {notif.link && (
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  navigate(notif.link!);
                  onClose();
                }}
                className="flex-1 relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-primary-foreground shadow-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                {/* Button shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.2) 45%, hsla(0,0%,100%,0.05) 50%, transparent 55%)" }}
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10">View Details</span>
                <ExternalLink className="h-3.5 w-3.5 relative z-10" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border/50 font-semibold text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              Dismiss
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NotificationBell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    requestBrowserPermission,
  } = useNotifications();

  useEffect(() => {
    if (user) requestBrowserPermission();
  }, [user]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const handleNotifClick = (notif: Notification) => {
    markAsRead(notif.id);
    setSelectedNotif(notif);
    setOpen(false);
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </motion.span>
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 glass-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <h3 className="font-display font-semibold text-sm">Notifications</h3>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:underline flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-accent/50"
                      title="Mark all as read"
                    >
                      <CheckCheck className="h-3 w-3" /> Read all
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-accent/50"
                      title="Clear all"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="ml-1 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Notification list */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">You'll see job matches & updates here</p>
                  </div>
                ) : (
                  notifications.map((notif, idx) => {
                    const Icon = typeIcons[notif.type] || Info;
                    const color = typeColors[notif.type] || "from-blue-500 to-cyan-500";
                    const glow = typeGlows[notif.type] || "hsla(210, 90%, 55%, 0.15)";

                    return (
                      <motion.button
                        key={notif.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => handleNotifClick(notif)}
                        className={`group w-full text-left px-4 py-3 flex items-start gap-3 transition-all duration-300 border-b border-border/30 last:border-0 relative overflow-hidden ${
                          !notif.is_read ? "bg-primary/5" : "hover:bg-accent/40"
                        }`}
                      >
                        {/* Hover flash effect */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }}
                        />

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 mt-0.5 shadow-md`}
                        >
                          <Icon className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                        <div className="flex-1 min-w-0 relative z-10">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm truncate ${!notif.is_read ? "font-semibold" : "font-medium"}`}>
                              {notif.title}
                            </p>
                            {!notif.is_read && (
                              <motion.span
                                className="w-2 h-2 rounded-full bg-primary shrink-0"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{notif.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] text-muted-foreground/60">
                              {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                            </p>
                            <span className="text-[10px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                              View <ArrowRight className="h-2.5 w-2.5" />
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notification detail popup */}
      <AnimatePresence>
        {selectedNotif && (
          <NotificationPopup
            notif={selectedNotif}
            onClose={() => setSelectedNotif(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
