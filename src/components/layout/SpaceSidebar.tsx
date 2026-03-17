import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface Space {
  id: string;
  name: string;
  color: string;
  online: number;
  hasNotification?: boolean;
}

const spaces: Space[] = [
  { id: "1", name: "Design Hub", color: "hsl(210, 100%, 50%)", online: 342, hasNotification: true },
  { id: "2", name: "Gaming", color: "hsl(280, 70%, 50%)", online: 1204 },
  { id: "3", name: "Music", color: "hsl(340, 80%, 55%)", online: 89 },
  { id: "4", name: "Tech", color: "hsl(160, 60%, 45%)", online: 567, hasNotification: true },
  { id: "5", name: "Art", color: "hsl(30, 90%, 55%)", online: 201 },
];

export default function SpaceSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/explore" || location.pathname === "/videos" || location.pathname === "/profile";

  return (
    <aside className="hidden md:flex flex-col items-center w-[60px] bg-background py-3 gap-1.5 border-r border-border/30">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate("/")}
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-150 ${
          isHome
            ? "bg-accent text-accent-foreground"
            : "bg-surface hover:bg-surface-hover text-muted-foreground hover:text-foreground"
        }`}
      >
        A
      </motion.button>

      <div className="w-5 h-px bg-border/50 my-0.5" />

      {spaces.map((space) => (
        <div key={space.id} className="relative group">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/spaces")}
            className="w-9 h-9 rounded-full hover:rounded-xl flex items-center justify-center text-xs font-semibold bg-surface hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-all duration-150"
          >
            {space.name.charAt(0)}
          </motion.button>
          {space.hasNotification && (
            <span className="absolute -right-0.5 top-0 w-2 h-2 bg-accent rounded-full border-[1.5px] border-background" />
          )}
          <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-card rounded-lg shadow-aura text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 text-foreground">
            {space.name}
            <span className="text-muted-foreground ml-1.5 font-mono-utility">{space.online}</span>
          </div>
        </div>
      ))}

      <motion.button
        whileTap={{ scale: 0.96 }}
        className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-surface transition-all duration-150 mt-0.5"
      >
        <Plus size={16} />
      </motion.button>
    </aside>
  );
}
