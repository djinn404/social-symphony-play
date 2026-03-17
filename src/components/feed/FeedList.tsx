import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, Bookmark, MoreHorizontal } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";

interface FeedPost {
  id: string;
  author: { name: string; handle: string; avatar: string; verified?: boolean };
  text?: string;
  media?: { src: string; aspect?: string };
  likes: string;
  comments: string;
  reposts: string;
  timestamp: string;
}

const posts: FeedPost[] = [
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

export default function FeedList() {
  return (
    <div className="flex flex-col divide-y divide-border/30">
      {posts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: i * 0.06 }}
          className="px-4 py-3 hover:bg-surface/30 transition-colors"
        >
          <div className="flex gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
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
                <button className="ml-auto text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Text */}
              {post.text && (
                <p className="text-[14px] text-foreground leading-[1.45] mt-1">
                  {post.text}
                </p>
              )}

              {/* Media */}
              {post.media && (
                <div className={`relative rounded-xl overflow-hidden mt-2.5 ${post.media.aspect || "aspect-video"} bg-surface`}>
                  <img
                    src={post.media.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Actions - X/Twitter style */}
              <div className="flex items-center justify-between mt-2.5 max-w-[360px]">
                <ActionBtn icon={MessageCircle} count={post.comments} hoverColor="text-accent" />
                <ActionBtn icon={Repeat2} count={post.reposts} hoverColor="text-online" />
                <ActionBtn icon={Heart} count={post.likes} hoverColor="text-live" />
                <ActionBtn icon={Share} hoverColor="text-accent" />
                <ActionBtn icon={Bookmark} hoverColor="text-accent" />
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ActionBtn({ icon: Icon, count, hoverColor }: { icon: typeof Heart; count?: string; hoverColor: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`flex items-center gap-1 text-muted-foreground hover:${hoverColor} transition-colors group`}
    >
      <Icon size={16} strokeWidth={1.6} />
      {count && <span className="font-mono-utility text-[11px]">{count}</span>}
    </motion.button>
  );
}
