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
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:left-[76px]">
      <div className="chrome-glass rounded-2xl mx-auto max-w-lg">
        <div className="flex items-center justify-around h-14 px-2">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1"
              >
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-accent/15" : ""
                }`}>
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.6}
                  />
                </div>
                <span
                  className={`text-[9px] transition-colors duration-200 ${
                    isActive ? "text-accent font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
