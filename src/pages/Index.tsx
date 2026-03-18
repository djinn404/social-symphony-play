import AppLayout from "@/components/layout/AppLayout";
import StoriesBar from "@/components/feed/StoriesBar";
import FeedList, { defaultPosts, FeedPost } from "@/components/feed/FeedList";
import ComposeModal from "@/components/feed/ComposeModal";
import NotificationBell from "@/components/notifications/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";
import { useNotifications } from "@/contexts/NotificationContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";

const feedTabs = ["Pour vous", "Abonnements"];

const Index = () => {
  const [activeTab, setActiveTab] = useState("Pour vous");
  const [posts, setPosts] = useState<FeedPost[]>(defaultPosts);
  const [composeOpen, setComposeOpen] = useState(false);
  const { notifyNewPost, isLoading } = useNotifications();

  const handlePublish = async (data: { text: string }) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: { name: "You", handle: "@you", avatar: avatar1 },
      text: data.text,
      likes: "0",
      comments: "0",
      reposts: "0",
      timestamp: "À l'instant",
      aiGenerated: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    await notifyNewPost({ id: newPost.id, author: newPost.author, text: newPost.text });
  };

  return (
    <AppLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 chrome-glass border-b border-border">
        <div className="flex items-center justify-between h-12 px-5 max-w-xl mx-auto">
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            Aura
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />
            <div className="flex items-center gap-1.5 px-2 py-1 chrome-glass rounded-full">
              <span className="w-1.5 h-1.5 bg-online rounded-full" />
              <span className="font-mono-utility text-[10px] text-muted-foreground">2.4k</span>
            </div>
          </div>
        </div>

        {/* Feed tabs */}
        <div className="flex max-w-xl mx-auto">
          {feedTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors relative ${
                activeTab === tab ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="feed-tab"
                  className="absolute bottom-0 left-1/3 right-1/3 h-0.5 bg-accent rounded-full"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Stories */}
      <div className="max-w-xl mx-auto">
        <StoriesBar />
      </div>

      {/* Feed */}
      <div className="max-w-xl mx-auto pb-24 px-4">
        <FeedList posts={posts} />
      </div>

      {/* Compose FAB */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => setComposeOpen(true)}
        className="fixed bottom-24 right-5 md:right-8 w-13 h-13 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center chrome-glow z-40 chrome-btn"
        style={{ width: 52, height: 52 }}
      >
        <Edit3 size={20} />
      </motion.button>

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onPublish={handlePublish}
        isLoading={isLoading}
      />
    </AppLayout>
  );
};

export default Index;
