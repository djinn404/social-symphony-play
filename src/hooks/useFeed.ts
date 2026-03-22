import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/services/postService'

export const useFeed = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })
}