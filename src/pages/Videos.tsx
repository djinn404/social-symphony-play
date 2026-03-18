import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Clock, Eye, MoreHorizontal, Filter, LayoutGrid, Smartphone } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";
import AppLayout from "@/components/layout/AppLayout";
import ReelsView from "@/components/videos/ReelsView";
import ThemeToggle from "@/components/ThemeToggle";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  author: { name: string; avatar: string; verified?: boolean };
  duration: string;
  views: string;
  timestamp: string;
  category: string;
}

const categories = ["Pour vous", "Tendances", "Gaming", "Musique", "Tech", "Art", "Éducation"];

const videos: VideoItem[] = [
  { id: "v1", title: "Comment j'ai créé un motion design complet en 48h", thumbnail: feed1, author: { name: "Nova FX", avatar: avatar1, verified: true }, duration: "24:31", views: "124k", timestamp: "il y a 2 jours", category: "Tech" },
  { id: "v2", title: "Les plages volcaniques d'Islande — Documentary 4K", thumbnail: feed2, author: { name: "Earth Views", avatar: avatar1 }, duration: "1:42:08", views: "892k", timestamp: "il y a 1 semaine", category: "Éducation" },
  { id: "v3", title: "Le futur de la réalité augmentée : Guide complet 2026", thumbnail: feed3, author: { name: "Cyber Lab", avatar: avatar1, verified: true }, duration: "3:15:44", views: "2.1M", timestamp: "il y a 3 jours", category: "Tech" },
  { id: "v4", title: "Masterclass Design System — Du concept à la production", thumbnail: feed1, author: { name: "Kira Design", avatar: avatar1 }, duration: "5:28:12", views: "456k", timestamp: "il y a 5 jours", category: "Éducation" },
  { id: "v5", title: "Live coding : On crée une app en 12h non-stop", thumbnail: feed3, author: { name: "Cyber Lab", avatar: avatar1, verified: true }, duration: "12:04:33", views: "1.8M", timestamp: "il y a 1 jour", category: "Tech" },
];

type ViewMode = "list" | "reels";

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("Pour vous");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  if (viewMode === "reels") {
    return <ReelsView onClose={() => setViewMode("list")} />;
  }

  return (
    <AppLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-0 z-40 chrome-glass border-b border-border">
          <div className="flex items-center justify-between px-5 h-12">
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              Vidéos
            </h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="flex items-center chrome-glass rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewMode("reels")}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Smartphone size={14} />
                </button>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 chrome-btn ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "chrome-glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Video list */}
        <div className="flex flex-col gap-4 p-4">
          {videos.map((video, i) => (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="chrome-surface cursor-pointer overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 chrome-glass rounded-lg text-foreground font-mono-utility text-[11px]">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-2xl chrome-glass flex items-center justify-center">
                    <Play size={24} className="text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex gap-3 p-4 relative z-10">
                <img src={video.author.avatar} alt="" className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-medium text-foreground leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[11px] text-muted-foreground">{video.author.name}</span>
                    {video.author.verified && (
                      <svg className="w-3 h-3 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono-utility text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Eye size={10} /> {video.views}
                    </span>
                    <span className="text-muted-foreground text-[10px]">·</span>
                    <span className="font-mono-utility text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Clock size={10} /> {video.timestamp}
                    </span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground self-start mt-1 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
