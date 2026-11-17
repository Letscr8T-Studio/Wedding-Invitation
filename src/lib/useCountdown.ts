import { useEffect, useMemo, useState } from 'react'

export type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function getCountdown(target: number, now: number): Countdown {
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    done: diff === 0,
  }
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

export function useCountdown(targetIso: string): Countdown {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (Date.now() >= target) return
    let id: number
    const tick = () => {
      const current = Date.now()
      setNow(current)
      if (current < target) id = window.setTimeout(tick, SECOND - (current % SECOND))
    }
    id = window.setTimeout(tick, SECOND - (Date.now() % SECOND))
    return () => window.clearTimeout(id)
  }, [target])

  return getCountdown(target, now)
}
