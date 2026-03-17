import AppLayout from "@/components/layout/AppLayout";
import StoriesBar from "@/components/feed/StoriesBar";
import FeedList from "@/components/feed/FeedList";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";

const feedTabs = ["Pour vous", "Abonnements"];

const Index = () => {
  const [activeTab, setActiveTab] = useState("Pour vous");

  return (
    <AppLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/30">
        <div className="flex items-center justify-between h-11 px-4 max-w-xl mx-auto">
          <h1
            className="text-base font-bold text-foreground"
            style={{ letterSpacing: "-0.04em" }}
          >
            Aura
          </h1>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-online rounded-full" />
            <span className="font-mono-utility text-[10px] text-muted-foreground">2.4k</span>
          </div>
        </div>

        {/* Feed tabs */}
        <div className="flex max-w-xl mx-auto">
          {feedTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-medium transition-colors relative ${
                activeTab === tab ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="feed-tab"
                  className="absolute bottom-0 left-1/3 right-1/3 h-0.5 bg-accent rounded-full"
                  transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Stories */}
      <div className="max-w-xl mx-auto border-b border-border/30">
        <StoriesBar />
      </div>

      {/* Feed */}
      <div className="max-w-xl mx-auto pb-20">
        <FeedList />
      </div>

      {/* Compose FAB */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-20 right-4 md:right-8 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg z-40"
      >
        <Edit3 size={20} />
      </motion.button>
    </AppLayout>
  );
};

export default Index;
