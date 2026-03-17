import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface AuraNotification {
  id: string;
  message: string;
  category: string;
  relevance: number;
  postId: string;
  author: string;
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: AuraNotification[];
  unreadCount: number;
  notifyNewPost: (post: {
    id: string;
    author: { name: string; handle: string };
    text?: string;
    media?: { type?: string };
  }) => Promise<void>;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const defaultContext: NotificationContextType = {
  notifications: [],
  unreadCount: 0,
  notifyNewPost: async () => {},
  markAsRead: () => {},
  markAllRead: () => {},
  isLoading: false,
};

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  return ctx ?? defaultContext;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AuraNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const notifyNewPost = useCallback(async (post: {
    id: string;
    author: { name: string; handle: string };
    text?: string;
    media?: { type?: string };
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("post-notification", {
        body: { post },
      });

      if (error) {
        console.error("Notification error:", error);
        // Fallback notification
        const fallback: AuraNotification = {
          id: `notif-${Date.now()}`,
          message: `📝 ${post.author.name} a publié un nouveau post`,
          category: "communauté",
          relevance: 5,
          postId: post.id,
          author: post.author.name,
          timestamp: new Date().toISOString(),
          read: false,
        };
        setNotifications((prev) => [fallback, ...prev]);
        toast(fallback.message);
        return;
      }

      const notif: AuraNotification = {
        id: `notif-${Date.now()}`,
        message: data.notification,
        category: data.category,
        relevance: data.relevance,
        postId: data.postId,
        author: data.author,
        timestamp: data.timestamp,
        read: false,
      };

      setNotifications((prev) => [notif, ...prev]);
      toast(notif.message, {
        description: `Catégorie: ${notif.category} · Pertinence: ${notif.relevance}/10`,
      });
    } catch (err) {
      console.error("Failed to generate notification:", err);
      toast.error("Erreur de notification");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, notifyNewPost, markAsRead, markAllRead, isLoading }}>
      {children}
    </NotificationContext.Provider>
  );
}
