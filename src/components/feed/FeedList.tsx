import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, Bookmark, MoreHorizontal, Sparkles } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";

export interface FeedPost {
  id: string;
  author: { name: string; handle: string; avatar: string; verified?: boolean };
  text?: string;
  media?: { src: string; aspect?: string };
  likes: string;
  comments: string;
  reposts: string;
  timestamp: string;
  aiGenerated?: boolean;
}

export const defaultPosts: FeedPost[] = [
  {
    id: "1",
    author: { name: "Nova FX", handle: "@nova.fx", avatar: avatar1, verified: true },
    text: "Tokyo at 3AM hits different 🌃 Le calme avant la tempête créative.",
    media: { src: feed1, aspect: "aspect-[4/5]" },
    likes: "24.3k",
    comments: "1.2k",
    reposts: "892",
    timestamp: "2h",
  },
  {
    id: "2",
    author: { name: "Kira ✦", handle: "@kira.design", avatar: avatar1 },
    text: "Hot take: les meilleures interfaces sont celles qu'on ne remarque pas. L'invisible est le nouveau luxe en design.",
    likes: "8.1k",
    comments: "342",
    reposts: "1.4k",
    timestamp: "3h",
  },
  {
    id: "3",
    author: { name: "Earth Views", handle: "@earth.views", avatar: avatar1 },
    media: { src: feed2, aspect: "aspect-square" },
    likes: "18.7k",
    comments: "432",
    reposts: "2.1k",
    timestamp: "4h",
  },
  {
    id: "4",
    author: { name: "Cyber Lab", handle: "@cyber.lab", avatar: avatar1, verified: true },
    text: "Le futur de la réalité augmentée est là ⚡ On travaille sur quelque chose d'incroyable. Stay tuned.",
    media: { src: feed3, aspect: "aspect-[4/5]" },
    likes: "45.1k",
    comments: "3.4k",
    reposts: "5.6k",
    timestamp: "6h",
  },
];

interface FeedListProps {
  posts: FeedPost[];
}

export default function FeedList({ posts }: FeedListProps) {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {posts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className="chrome-surface p-4"
        >
          <div className="flex gap-3 relative z-10">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-border"
            />
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-foreground truncate">
                  {post.author.name}
                </span>
                {post.author.verified && (
                  <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
                <span className="text-xs text-muted-foreground truncate">{post.author.handle}</span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="font-mono-utility text-[11px] text-muted-foreground flex-shrink-0">{post.timestamp}</span>
                {post.aiGenerated && (
                  <Sparkles size={11} className="text-accent flex-shrink-0" />
                )}
                <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {post.text && (
                <p className="text-[14px] text-foreground leading-[1.5] mt-1.5">{post.text}</p>
              )}

              {post.media && (
                <div className={`relative rounded-xl overflow-hidden mt-3 ${post.media.aspect || "aspect-video"} bg-muted`}>
                  <img src={post.media.src} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between mt-3 max-w-[360px]">
                <ActionBtn icon={MessageCircle} count={post.comments} />
                <ActionBtn icon={Repeat2} count={post.reposts} />
                <ActionBtn icon={Heart} count={post.likes} />
                <ActionBtn icon={Share} />
                <ActionBtn icon={Bookmark} />
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ActionBtn({ icon: Icon, count }: { icon: typeof Heart; count?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 py-1 px-1.5 rounded-lg hover:bg-surface-hover"
    >
      <Icon size={16} strokeWidth={1.6} />
      {count && <span className="font-mono-utility text-[11px]">{count}</span>}
    </motion.button>
  );
}
