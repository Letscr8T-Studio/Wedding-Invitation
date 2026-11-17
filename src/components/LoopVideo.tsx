import { useEffect, useRef, useState, type ReactNode } from 'react'
import { canAutoplayLoops } from '../lib/autoplay'

type Props = {
  src: string
  poster: string
  fallback: ReactNode
  className?: string
}

/** Muted loop that loads and plays only while on screen, and only on a good connection. */
export function LoopVideo({ src, poster, fallback, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [allowed] = useState(canAutoplayLoops)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [allowed])

  if (!allowed) return fallback

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  )
}
