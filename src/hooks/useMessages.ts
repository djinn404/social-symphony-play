import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const useMessages = (spaceId: string) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const channel = supabase.channel(`space-${spaceId}`)

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `space_id=eq.${spaceId}`
        },
        payload => {
          setMessages(prev => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [spaceId])

  return messages
}
