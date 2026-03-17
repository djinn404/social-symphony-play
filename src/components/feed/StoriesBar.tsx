import { motion } from "framer-motion";
import avatar1 from "@/assets/avatar-1.jpg";

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  hasNew: boolean;
  isLive?: boolean;
}

const storyUsers: StoryUser[] = [
  { id: "you", name: "Votre story", avatar: avatar1, hasNew: false },
  { id: "1", name: "nova.fx", avatar: avatar1, hasNew: true, isLive: true },
  { id: "2", name: "synthwave", avatar: avatar1, hasNew: true },
  { id: "3", name: "pixel.art", avatar: avatar1, hasNew: true },
  { id: "4", name: "dark.mode", avatar: avatar1, hasNew: true },
  { id: "5", name: "glitch.lab", avatar: avatar1, hasNew: false },
  { id: "6", name: "neo.tokyo", avatar: avatar1, hasNew: true },
  { id: "7", name: "cyber.punk", avatar: avatar1, hasNew: false },
];

export default function StoriesBar() {
  return (
    <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
      {storyUsers.map((user, i) => (
        <motion.button
          key={user.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
          whileTap={{ scale: 0.96 }}
          className="flex flex-col items-center gap-1.5 flex-shrink-0"
        >
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full p-[2px] ${
                user.hasNew
                  ? "bg-gradient-to-br from-accent to-accent/50"
                  : "bg-border"
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-2 border-background"
              />
            </div>
            {user.isLive && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-live text-foreground text-[8px] font-bold uppercase rounded tracking-wider">
                Live
              </span>
            )}
            {user.id === "you" && (
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold border-2 border-background">
                +
              </span>
            )}
          </div>
          <span className="text-[11px] text-muted-foreground truncate w-14 text-center">
            {user.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
