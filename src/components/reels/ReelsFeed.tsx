import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { ReelItem } from './ReelItem'

const getReels = async () => {
  const { data } = await supabase.from('reels').select('*')
  return data
}

export const ReelsFeed = () => {
  const { data } = useQuery({
    queryKey: ['reels'],
    queryFn: getReels
  })

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {data?.map(reel => (
        <ReelItem key={reel.id} reel={reel} />
      ))}
    </div>
  )
}
