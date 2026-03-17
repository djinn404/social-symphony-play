import { motion } from "framer-motion";
import { Home, Search, Play, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const dockItems = [
  { id: "home", path: "/", icon: Home, label: "Feed" },
  { id: "explore", path: "/explore", icon: Search, label: "Explorer" },
  { id: "videos", path: "/videos", icon: Play, label: "Vidéos" },
  { id: "spaces", path: "/spaces", icon: MessageCircle, label: "Espaces" },
  { id: "profile", path: "/profile", icon: User, label: "Profil" },
];

export default function BottomDock() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:left-[68px]">
      <div className="backdrop-blur-xl bg-background/80 border-t border-border/30">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-4">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-0.5"
              >
                <Icon
                  size={21}
                  className={`transition-colors duration-150 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.6}
                />
                <span
                  className={`text-[10px] transition-colors duration-150 ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute -top-0.5 w-5 h-0.5 bg-foreground rounded-full"
                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
