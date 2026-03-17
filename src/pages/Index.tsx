import AppLayout from "@/components/layout/AppLayout";
import StoriesBar from "@/components/feed/StoriesBar";
import FeedList from "@/components/feed/FeedList";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <AppLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="flex items-center justify-between h-12 px-4 max-w-xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.04em" }}
          >
            Aura
          </motion.h1>
          <div className="flex items-center gap-1">
            <span className="font-mono-utility text-[11px] text-muted-foreground">
              2.4k en ligne
            </span>
            <span className="w-1.5 h-1.5 bg-online rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Stories */}
      <div className="max-w-xl mx-auto">
        <StoriesBar />
      </div>

      {/* Separator */}
      <div className="h-px bg-border/50 max-w-xl mx-auto" />

      {/* Feed */}
      <div className="py-3 pb-20">
        <FeedList />
      </div>
    </AppLayout>
  );
};

export default Index;
