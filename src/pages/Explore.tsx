import { motion } from "framer-motion";
import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
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
      <div className="pb-24">
        {/* Search */}
        <div className="sticky top-0 z-40 chrome-glass border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 bg-surface-hover rounded-xl px-3.5 py-2.5">
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
        <div className="px-4 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <TrendingUp size={16} className="text-accent" /> Tendances
          </h2>
          <div className="space-y-1">
            {trending.map((t, i) => (
              <motion.button
                key={t.tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-surface-hover transition-colors"
              >
                <div className="text-left">
                  <span className="text-[13px] font-medium text-foreground">{t.tag}</span>
                  <p className="text-[10px] text-muted-foreground font-mono-utility">{t.posts}</p>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono-utility">#{i + 1}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border mx-4" />

        {/* Explore grid */}
        <div className="grid grid-cols-3 gap-1 p-2 mt-2">
          {exploreGrid.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className={`relative cursor-pointer rounded-xl overflow-hidden ${i === 1 ? "row-span-2" : "aspect-square"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
