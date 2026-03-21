import AppLayout from "@/components/layout/AppLayout";
import StoriesBar from "@/components/feed/StoriesBar";
import FeedList from "@/components/feed/FeedList";
import ComposeModal from "@/components/feed/ComposeModal";
import NotificationBell from "@/components/notifications/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useFeed } from "@/hooks/useFeed";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";

const feedTabs = ["Pour vous", "Abonnements"];

const Index = () => {
  const [activeTab, setActiveTab] = useState("Pour vous");
  const [composeOpen, setComposeOpen] = useState(false);
  const { user, profile } = useAuth();
  const { posts, loading, createPost } = useFeed();

  const handlePublish = async (data: { text: string }) => {
    if (!user) return;
    await createPost(user.id, data.text);
  };

  return (
    <AppLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 chrome-glass border-b border-border">
        <div className="flex items-center justify-between h-12 px-5 max-w-xl mx-auto">
          <h1 className="text-lg font-bold text-foreground tracking-tight">Aura</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />
            {profile && (
              <img
                src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
                alt=""
                className="w-7 h-7 rounded-full object-cover ring-1 ring-border"
              />
            )}
          </div>
        </div>

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

      <div className="max-w-xl mx-auto">
        <StoriesBar />
      </div>

      <div className="max-w-xl mx-auto pb-24 px-4">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : (
          <FeedList posts={posts} />
        )}
      </div>

      {user && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => setComposeOpen(true)}
          className="fixed bottom-24 right-5 md:right-8 w-13 h-13 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center chrome-glow z-40 chrome-btn"
          style={{ width: 52, height: 52 }}
        >
          <Edit3 size={20} />
        </motion.button>
      )}

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onPublish={handlePublish}
        isLoading={false}
      />
    </AppLayout>
  );
};

export default Index;
