import { supabase } from '@/lib/supabase'

export const getPosts = async () => {
  const { data } = await supabase
    .from('posts')
    .select(`
      *,
      likes(count),
      comments(count)
    `)

  const now = Date.now()

  return data
    ?.map(post => {
      const likes = post.likes?.length || 0
      const comments = post.comments?.length || 0

      const score =
        likes * 3 +
        comments * 5 +
        (1 / ((now - new Date(post.created_at).getTime()) / 1000 + 1)) * 1000

      return {
        ...post,
        likes_count: likes,
        comments_count: comments,
        score
      }
    })
    .sort((a, b) => b.score - a.score)
}