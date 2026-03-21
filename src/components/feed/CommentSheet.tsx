import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Comment {
  id: string;
  text: string;
  created_at: string;
  profiles: { username: string | null; display_name: string | null; avatar_url: string | null } | null;
}

interface CommentSheetProps {
  postId: string;
  open: boolean;
  onClose: () => void;
}

export default function CommentSheet({ postId, open, onClose }: CommentSheetProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    supabase
      .from("comments")
      .select("*, profiles(username, display_name, avatar_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setComments(data as unknown as Comment[]);
      });
  }, [open, postId]);

  const handleSend = async () => {
    if (!text.trim() || !user) {
      if (!user) toast.error("Connecte-toi pour commenter");
      return;
    }
    setSending(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: user.id, text: text.trim() })
      .select("*, profiles(username, display_name, avatar_url)")
      .single();
    if (!error && data) {
      setComments((prev) => [...prev, data as unknown as Comment]);
      setText("");
    }
    setSending(false);
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
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 max-h-[70vh] bg-card rounded-t-2xl z-50 flex flex-col border-t border-border"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <h3 className="text-sm font-semibold text-foreground">Commentaires</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {comments.length === 0 && (
                <p className="text-center text-muted-foreground text-xs py-8">Aucun commentaire pour l'instant</p>
              )}
              {comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <img
                    src={c.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.id}`}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-foreground">
                        {c.profiles?.display_name || c.profiles?.username || "User"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono-utility">
                        {formatDistanceToNow(new Date(c.created_at), { locale: fr, addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/90 mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-border/30">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={user ? "Ajouter un commentaire..." : "Connecte-toi pour commenter"}
                disabled={!user}
                className="flex-1 bg-muted/50 rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none border border-border focus:border-accent/50 transition-colors"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={!text.trim() || sending}
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40"
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
