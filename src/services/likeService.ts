import { supabase } from '@/lib/supabase'

export const likePost = async (postId: string) => {
  const user = await supabase.auth.getUser()

  return supabase.from('likes').insert({
    post_id: postId,
    user_id: user.data.user?.id
  })
}