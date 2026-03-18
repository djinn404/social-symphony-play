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
  { id: "5", name: "glitch", avatar: avatar1, hasNew: false },
  { id: "6", name: "neo.tokyo", avatar: avatar1, hasNew: true },
];

export default function StoriesBar() {
  return (
    <div className="flex gap-3 px-4 py-3 overflow-x-auto">
      {storyUsers.map((user, i) => (
        <motion.button
          key={user.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.97 }}
          className="flex flex-col items-center gap-1.5 flex-shrink-0"
        >
          <div className="relative">
            <div
              className={`w-[56px] h-[56px] rounded-2xl p-[2px] ${
                user.hasNew
                  ? "bg-gradient-to-br from-accent to-accent/30"
                  : "bg-border"
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-[14px] object-cover border-2 border-background"
              />
            </div>
            {user.isLive && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-px bg-live text-primary-foreground dark:text-foreground text-[7px] font-bold uppercase rounded-md tracking-wider">
                Live
              </span>
            )}
            {user.id === "you" && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background">
                +
              </span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground truncate w-[56px] text-center">
            {user.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
