import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function usePostActions(postId: string) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [repostCount, setRepostCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [likes, comments, reposts] = await Promise.all([
        supabase.from("likes").select("id", { count: "exact", head: true }).eq("post_id", postId),
        supabase.from("comments").select("id", { count: "exact", head: true }).eq("post_id", postId),
        supabase.from("reposts").select("id", { count: "exact", head: true }).eq("post_id", postId),
      ]);
      setLikeCount(likes.count ?? 0);
      setCommentCount(comments.count ?? 0);
      setRepostCount(reposts.count ?? 0);
    };

    const fetchUserState = async () => {
      if (!user) return;
      const [like, bookmark, repost] = await Promise.all([
        supabase.from("likes").select("id").eq("post_id", postId).eq("user_id", user.id).maybeSingle(),
        supabase.from("bookmarks").select("id").eq("post_id", postId).eq("user_id", user.id).maybeSingle(),
        supabase.from("reposts").select("id").eq("post_id", postId).eq("user_id", user.id).maybeSingle(),
      ]);
      setLiked(!!like.data);
      setBookmarked(!!bookmark.data);
      setReposted(!!repost.data);
    };

    fetchCounts();
    fetchUserState();
  }, [postId, user]);

  const toggleLike = useCallback(async () => {
    if (!user) { toast.error("Connecte-toi pour liker"); return; }
    if (liked) {
      await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", user.id);
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      await supabase.from("likes").insert({ post_id: postId, user_id: user.id });
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  }, [liked, postId, user]);

  const toggleBookmark = useCallback(async () => {
    if (!user) { toast.error("Connecte-toi pour enregistrer"); return; }
    if (bookmarked) {
      await supabase.from("bookmarks").delete().eq("post_id", postId).eq("user_id", user.id);
      setBookmarked(false);
    } else {
      await supabase.from("bookmarks").insert({ post_id: postId, user_id: user.id });
      setBookmarked(true);
      toast.success("Post enregistré");
    }
  }, [bookmarked, postId, user]);

  const toggleRepost = useCallback(async () => {
    if (!user) { toast.error("Connecte-toi pour reposter"); return; }
    if (reposted) {
      await supabase.from("reposts").delete().eq("post_id", postId).eq("user_id", user.id);
      setReposted(false);
      setRepostCount((c) => c - 1);
    } else {
      await supabase.from("reposts").insert({ post_id: postId, user_id: user.id });
      setReposted(true);
      setRepostCount((c) => c + 1);
      toast.success("Reposté !");
    }
  }, [reposted, postId, user]);

  return { liked, bookmarked, reposted, likeCount, commentCount, repostCount, toggleLike, toggleBookmark, toggleRepost };
}
