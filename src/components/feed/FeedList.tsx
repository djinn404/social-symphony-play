import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, Play, Volume2 } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";

interface FeedPost {
  id: string;
  author: { name: string; handle: string; avatar: string; verified?: boolean };
  media: { type: "image" | "video"; src: string; aspect?: string; duration?: string };
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  timestamp: string;
}

const posts: FeedPost[] = [
  {
    id: "1",
    author: { name: "Nova FX", handle: "@nova.fx", avatar: avatar1, verified: true },
    media: { type: "video", src: feed1, aspect: "aspect-[9/16]", duration: "2:34" },
    caption: "Tokyo at 3AM hits different 🌃 #nightlife #cinematic",
    likes: "24.3k",
    comments: "1.2k",
    shares: "892",
    timestamp: "2h",
  },
  {
    id: "2",
    author: { name: "Earth Views", handle: "@earth.views", avatar: avatar1 },
    media: { type: "image", src: feed2, aspect: "aspect-square" },
    caption: "Iceland's black sand beaches from above 🌊",
    likes: "18.7k",
    comments: "432",
    shares: "2.1k",
    timestamp: "4h",
  },
  {
    id: "3",
    author: { name: "Cyber Lab", handle: "@cyber.lab", avatar: avatar1, verified: true },
    media: { type: "video", src: feed3, aspect: "aspect-[9/16]", duration: "0:58" },
    caption: "Le futur de la réalité augmentée est là ⚡",
    likes: "45.1k",
    comments: "3.4k",
    shares: "5.6k",
    timestamp: "6h",
  },
];

export default function FeedList() {
  return (
    <div className="flex flex-col gap-3 px-2 md:px-4 max-w-xl mx-auto">
      {posts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
          className="group relative rounded-2xl bg-card p-3 shadow-aura transition-all hover:shadow-aura-hover"
        >
          {/* Author header */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground truncate">
                  {post.author.name}
                </span>
                {post.author.verified && (
                  <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{post.author.handle}</span>
            </div>
            <span className="font-mono-utility text-[11px] text-muted-foreground">{post.timestamp}</span>
          </div>

          {/* Media */}
          <div className={`relative rounded-xl overflow-hidden ${post.media.aspect || "aspect-video"} bg-surface`}>
            <img
              src={post.media.src}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            {post.media.type === "video" && (
              <>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <Play size={20} className="text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <span className="font-mono-utility text-[11px] text-foreground bg-background/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
                    {post.media.duration}
                  </span>
                  <button className="w-6 h-6 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <Volume2 size={12} className="text-foreground" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-2.5 px-1">
            <div className="flex items-center gap-4">
              <ActionButton icon={Heart} count={post.likes} />
              <ActionButton icon={MessageCircle} count={post.comments} />
              <ActionButton icon={Share2} count={post.shares} />
            </div>
            <motion.button whileTap={{ scale: 0.96 }} className="text-muted-foreground hover:text-foreground transition-colors">
              <Bookmark size={18} />
            </motion.button>
          </div>

          {/* Caption */}
          <p className="text-sm text-foreground mt-2 px-1 leading-relaxed">
            {post.caption}
          </p>
        </motion.article>
      ))}
    </div>
  );
}

function ActionButton({ icon: Icon, count }: { icon: typeof Heart; count: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon size={18} />
      <span className="font-mono-utility text-xs">{count}</span>
    </motion.button>
  );
}
