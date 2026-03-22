import { supabase } from '@/lib/supabase'

export const addComment = async (postId, content) => {
  const user = await supabase.auth.getUser()

  return supabase.from('comments').insert({
    post_id: postId,
    content,
    user_id: user.data.user?.id
  })
}        
