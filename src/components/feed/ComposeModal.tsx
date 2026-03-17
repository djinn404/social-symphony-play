import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Image, Sparkles } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: (post: { text: string }) => void;
  isLoading: boolean;
}

export default function ComposeModal({ open, onClose, onPublish, isLoading }: ComposeModalProps) {
  const [text, setText] = useState("");

  const handlePublish = () => {
    if (!text.trim()) return;
    onPublish({ text: text.trim() });
    setText("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-x-3 top-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-card rounded-2xl shadow-lg z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
              <button
                onClick={handlePublish}
                disabled={!text.trim() || isLoading}
                className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold disabled:opacity-40 transition-opacity flex items-center gap-1.5"
              >
                {isLoading && <Sparkles size={12} className="animate-pulse" />}
                {isLoading ? "Analyse IA..." : "Publier"}
              </button>
            </div>

            {/* Compose area */}
            <div className="flex gap-3 p-4">
              <img src={avatar1} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Quoi de neuf ?"
                  className="w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none resize-none min-h-[120px] leading-relaxed"
                  maxLength={500}
                  autoFocus
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/30">
              <div className="flex gap-2">
                <button className="text-accent hover:text-accent/80 transition-colors">
                  <Image size={18} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-mono-utility text-[10px] ${text.length > 450 ? "text-live" : "text-muted-foreground"}`}>
                  {text.length}/500
                </span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Sparkles size={10} className="text-accent" />
                  <span>Notification IA auto</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
