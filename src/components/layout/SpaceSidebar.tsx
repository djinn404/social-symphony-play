import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

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
  const [activeSpace, setActiveSpace] = useState<string | null>(null);

  return (
    <aside className="hidden md:flex flex-col items-center w-[68px] bg-background py-3 gap-2 border-r border-border/50">
      {/* Home / Aura logo */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setActiveSpace(null)}
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-150 ${
          activeSpace === null
            ? "bg-accent text-accent-foreground rounded-xl"
            : "bg-surface hover:bg-surface-hover text-muted-foreground hover:text-foreground shadow-aura hover:shadow-aura-hover"
        }`}
      >
        A
      </motion.button>

      <div className="w-6 h-px bg-border my-1" />

      {/* Spaces */}
      {spaces.map((space) => (
        <div key={space.id} className="relative group">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveSpace(space.id)}
            className={`w-10 h-10 flex items-center justify-center text-xs font-semibold transition-all duration-150 ${
              activeSpace === space.id
                ? "rounded-xl"
                : "rounded-full hover:rounded-xl shadow-aura hover:shadow-aura-hover"
            }`}
            style={{
              backgroundColor: activeSpace === space.id ? space.color : undefined,
              color: activeSpace === space.id ? "#fff" : undefined,
            }}
          >
            {activeSpace !== space.id && (
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {space.name.charAt(0)}
              </span>
            )}
            {activeSpace === space.id && space.name.charAt(0)}
          </motion.button>

          {space.hasNotification && (
            <span className="absolute -right-0.5 top-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background" />
          )}

          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card rounded-lg shadow-aura text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            <span className="text-foreground">{space.name}</span>
            <span className="text-muted-foreground ml-2 font-mono-utility">{space.online} en ligne</span>
          </div>
        </div>
      ))}

      <motion.button
        whileTap={{ scale: 0.96 }}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface hover:bg-surface-hover text-muted-foreground hover:text-accent shadow-aura hover:shadow-aura-hover transition-all duration-150 mt-1"
      >
        <Plus size={18} />
      </motion.button>
    </aside>
  );
}
