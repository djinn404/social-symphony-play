import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Sparkles, TrendingUp, Users, Flame, Info } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

const categoryIcons: Record<string, typeof TrendingUp> = {
  trending: TrendingUp,
  communauté: Users,
  créateur: Sparkles,
  viral: Flame,
  info: Info,
};

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-full chrome-glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center px-1 bg-accent text-accent-foreground text-[9px] font-bold rounded-full animate-glow-pulse"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-[320px] max-h-[420px] chrome-surface overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-accent" />
                <span className="text-sm font-semibold text-foreground">Notifications IA</span>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-[11px] text-accent hover:text-accent/80 transition-colors"
                >
                  <CheckCheck size={12} />
                  Tout lire
                </button>
              )}
            </div>

            <div className="overflow-y-auto max-h-[360px] relative z-10">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Bell size={24} className="mb-2 opacity-40" />
                  <p className="text-xs">Aucune notification</p>
                  <p className="text-[10px] mt-0.5">Créez un post pour voir l'IA en action</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const CatIcon = categoryIcons[notif.category] || Info;
                  return (
                    <motion.button
                      key={notif.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => markAsRead(notif.id)}
                      className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-surface-hover transition-colors ${
                        !notif.read ? "bg-accent/5" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        !notif.read ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                      }`}>
                        <CatIcon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[12px] leading-tight ${!notif.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono-utility text-[9px] text-muted-foreground">
                            {new Date(notif.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="text-[9px] text-muted-foreground px-1.5 py-px rounded-md bg-muted">
                            {notif.category}
                          </span>
                          <span className="font-mono-utility text-[9px] text-muted-foreground">
                            {notif.relevance}/10
                          </span>
                        </div>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1" />
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
