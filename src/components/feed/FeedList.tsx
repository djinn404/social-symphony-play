import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { FeedPostDB } from "@/hooks/useFeed";
import { usePostActions } from "@/hooks/usePostActions";
import CommentSheet from "./CommentSheet";

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

interface FeedListProps {
  posts: FeedPostDB[];
}

export default function FeedList({ posts }: FeedListProps) {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">Aucun post pour l'instant</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Sois le premier à publier !</p>
        </div>
      )}
    </div>
  );
}

function PostCard({ post, index }: { post: FeedPostDB; index: number }) {
  const { liked, bookmarked, reposted, likeCount, commentCount, repostCount, toggleLike, toggleBookmark, toggleRepost } = usePostActions(post.id);
  const [commentOpen, setCommentOpen] = useState(false);

  const displayName = post.profiles?.display_name || post.profiles?.username || "Utilisateur";
  const handle = post.profiles?.username ? `@${post.profiles.username}` : "";
  const avatar = post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { locale: fr, addSuffix: false });

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}
        className="chrome-surface p-4"
      >
        <div className="flex gap-3 relative z-10">
          <img src={avatar} alt={displayName} className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-border" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-semibold text-foreground truncate">{displayName}</span>
              <span className="text-xs text-muted-foreground truncate">{handle}</span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="font-mono-utility text-[11px] text-muted-foreground flex-shrink-0">{timeAgo}</span>
              <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            {post.text && (
              <p className="text-[14px] text-foreground leading-[1.5] mt-1.5">{post.text}</p>
            )}

            {post.image_url && (
              <div className="relative rounded-xl overflow-hidden mt-3 aspect-video bg-muted">
                <img src={post.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center justify-between mt-3 max-w-[360px]">
              <ActionBtn icon={MessageCircle} count={formatCount(commentCount)} onClick={() => setCommentOpen(true)} />
              <ActionBtn icon={Repeat2} count={formatCount(repostCount)} active={reposted} onClick={toggleRepost} />
              <ActionBtn icon={Heart} count={formatCount(likeCount)} active={liked} activeColor="text-red-500" onClick={toggleLike} />
              <ActionBtn icon={Share} />
              <ActionBtn icon={Bookmark} active={bookmarked} activeColor="text-accent" onClick={toggleBookmark} />
            </div>
          </div>
        </div>
      </motion.article>
      <CommentSheet postId={post.id} open={commentOpen} onClose={() => setCommentOpen(false)} />
    </>
  );
}

function ActionBtn({ icon: Icon, count, active, activeColor, onClick }: {
  icon: typeof Heart;
  count?: string;
  active?: boolean;
  activeColor?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 transition-colors duration-200 py-1 px-1.5 rounded-lg hover:bg-surface-hover ${
        active ? (activeColor || "text-accent") : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon size={16} strokeWidth={1.6} fill={active ? "currentColor" : "none"} />
      {count && <span className="font-mono-utility text-[11px]">{count}</span>}
    </motion.button>
  );
}
