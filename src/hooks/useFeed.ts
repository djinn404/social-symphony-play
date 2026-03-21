import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface FeedPostDB {
  id: string;
  user_id: string;
  text: string | null;
  image_url: string | null;
  created_at: string;
  profiles: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

export function useFeed() {
  const [posts, setPosts] = useState<FeedPostDB[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(username, display_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setPosts(data as unknown as FeedPostDB[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (userId: string, text: string, imageUrl?: string) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({ user_id: userId, text, image_url: imageUrl || null })
      .select("*, profiles(username, display_name, avatar_url)")
      .single();

    if (!error && data) {
      setPosts((prev) => [data as unknown as FeedPostDB, ...prev]);
    }
    return { data, error };
  };

  return { posts, loading, fetchPosts, createPost };
}
