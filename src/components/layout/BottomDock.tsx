import { motion } from "framer-motion";
import { Home, Search, PlusCircle, Inbox, User } from "lucide-react";
import { useState } from "react";

const dockItems = [
  { id: "home", icon: Home, label: "Feed" },
  { id: "search", icon: Search, label: "Explorer" },
  { id: "create", icon: PlusCircle, label: "Créer" },
  { id: "inbox", icon: Inbox, label: "Messages", badge: 12 },
  { id: "profile", icon: User, label: "Profil" },
];

export default function BottomDock() {
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:left-[68px]">
      <div className="backdrop-blur-xl bg-background/80 border-t border-border/50">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-4">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(item.id)}
                className="relative flex flex-col items-center gap-0.5"
              >
                <div className="relative">
                  <Icon
                    size={22}
                    className={`transition-colors duration-150 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 flex items-center justify-center px-1 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
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
