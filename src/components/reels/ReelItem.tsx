import { useRef, useEffect } from 'react'

export const ReelItem = ({ reel }) => {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) ref.current?.play()
      else ref.current?.pause()
    }, { threshold: 0.8 })

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="h-screen snap-start relative">
      <video
        ref={ref}
        src={reel.video_url}
        className="h-full w-full object-cover"
        muted
        loop
      />

      {/* Overlay */}
      <div className="absolute bottom-10 left-4 text-white">
        <p>@{reel.user_id}</p>
        <p>{reel.description}</p>
      </div>
    </div>
  )
}
