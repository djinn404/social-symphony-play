import { motion } from "framer-motion";
import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";
import AppLayout from "@/components/layout/AppLayout";

const trending = [
  { tag: "#DesignSystem", posts: "12.4k posts" },
  { tag: "#Tokyo2026", posts: "8.9k posts" },
  { tag: "#MotionDesign", posts: "5.2k posts" },
  { tag: "#ARFuture", posts: "3.1k posts" },
  { tag: "#CreativeCode", posts: "2.8k posts" },
];

const exploreGrid = [feed1, feed2, feed3, feed2, feed1, feed3, feed3, feed1, feed2];

export default function ExplorePage() {
  const [query, setQuery] = useState("");

  return (
    <AppLayout>
      <div className="pb-20">
        {/* Search */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 px-4 py-2.5 border-b border-border/30">
          <div className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher sur Aura"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* Trending */}
        <div className="px-4 py-3">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
            <TrendingUp size={16} /> Tendances
          </h2>
          <div className="space-y-1">
            {trending.map((t, i) => (
              <motion.button
                key={t.tag}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-surface/50 transition-colors"
              >
                <div>
                  <span className="text-[13px] font-medium text-foreground">{t.tag}</span>
                  <p className="text-[10px] text-muted-foreground font-mono-utility">{t.posts}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">#{i + 1}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border/30 mx-4" />

        {/* Explore grid */}
        <div className="grid grid-cols-3 gap-0.5 p-0.5 mt-1">
          {exploreGrid.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`relative cursor-pointer ${i === 1 ? "row-span-2" : "aspect-square"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
