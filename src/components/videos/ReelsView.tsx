import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share, Bookmark, Music2, MoreHorizontal } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";

interface Reel {
  id: string;
  thumbnail: string;
  author: { name: string; avatar: string; verified?: boolean };
  description: string;
  sound: string;
  likes: string;
  comments: string;
  shares: string;
}

const reels: Reel[] = [
  {
    id: "r1",
    thumbnail: feed1,
    author: { name: "Nova FX", avatar: avatar1, verified: true },
    description: "Tokyo at 3AM 🌃 Le calme avant la tempête créative #motiongraphics #tokyo",
    sound: "Nova FX — Original Sound",
    likes: "124k",
    comments: "1.2k",
    shares: "892",
  },
  {
    id: "r2",
    thumbnail: feed2,
    author: { name: "Earth Views", avatar: avatar1 },
    description: "Les plages volcaniques d'Islande sont un autre monde 🌋 #nature #iceland #4k",
    sound: "Ambient — Ocean Waves",
    likes: "892k",
    comments: "12k",
    shares: "45k",
  },
  {
    id: "r3",
    thumbnail: feed3,
    author: { name: "Cyber Lab", avatar: avatar1, verified: true },
    description: "Le futur de la réalité augmentée ⚡ Stay tuned #AR #tech #futur",
    sound: "Cyber Lab — Neon Dreams",
    likes: "2.1M",
    comments: "34k",
    shares: "89k",
  },
  {
    id: "r4",
    thumbnail: feed1,
    author: { name: "Kira Design", avatar: avatar1 },
    description: "Masterclass Design System — Du concept à la production 🎨 #design #ui #ux",
    sound: "Lofi — Study Beats",
    likes: "456k",
    comments: "5.6k",
    shares: "12k",
  },
];

export default function ReelsView({ onClose }: { onClose?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0 || next >= reels.length) return prev;
        return next;
      });
    },
    []
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      goTo(diff > 0 ? 1 : -1);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        goTo(e.deltaY > 0 ? 1 : -1);
      }
    };
    const el = containerRef.current;
    el?.addEventListener("wheel", handleWheel, { passive: true });
    return () => el?.removeEventListener("wheel", handleWheel);
  }, [goTo]);

  const reel = reels[currentIndex];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-black select-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={reel.id}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={reel.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Right actions */}
          <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
            <ActionButton icon={Heart} label={reel.likes} />
            <ActionButton icon={MessageCircle} label={reel.comments} />
            <ActionButton icon={Share} label={reel.shares} />
            <ActionButton icon={Bookmark} />
            <ActionButton icon={MoreHorizontal} />
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-20 left-0 right-16 px-4">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={reel.author.avatar}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-white/80 object-cover"
              />
              <span className="text-white text-sm font-semibold">{reel.author.name}</span>
              {reel.author.verified && (
                <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
              <button className="ml-2 px-3 py-0.5 rounded-md border border-white/60 text-white text-xs font-medium">
                Suivre
              </button>
            </div>
            <p className="text-white/90 text-[13px] leading-snug line-clamp-2">{reel.description}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Music2 size={12} className="text-white/70" />
              <span className="text-white/70 text-[11px] truncate">{reel.sound}</span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1">
            {reels.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon: Icon, label }: { icon: typeof Heart; label?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-0.5"
    >
      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
        <Icon size={20} className="text-white" strokeWidth={1.8} />
      </div>
      {label && <span className="text-white text-[10px] font-medium">{label}</span>}
    </motion.button>
  );
}
