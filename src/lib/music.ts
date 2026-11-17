import { music as copy } from '../content'

const MUTED_KEY = 'music:muted'
const VOLUME = 0.55

let audio: HTMLAudioElement | null = null
const holds = new Set<string>()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((listener) => listener())

function element() {
  if (!audio) {
    audio = new Audio(copy.src)
    audio.loop = true
    audio.preload = 'none'
    audio.addEventListener('play', emit)
    audio.addEventListener('pause', emit)
    document.addEventListener('visibilitychange', () =>
      document.hidden ? hold('hidden') : release('hidden'),
    )
  }
  return audio
}

function rememberMuted(muted: boolean) {
  try {
    localStorage.setItem(MUTED_KEY, muted ? '1' : '0')
  } catch {
    // storage blocked: the choice just isn't remembered
  }
}

function isMuted() {
  try {
    return localStorage.getItem(MUTED_KEY) === '1'
  } catch {
    return false
  }
}

function fadeIn(a: HTMLAudioElement, ms: number) {
  a.volume = 0
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms)
    a.volume = VOLUME * t
    if (t < 1 && !a.paused) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function play(fadeMs: number) {
  const a = element()
  void a
    .play()
    .then(() => fadeIn(a, fadeMs))
    .catch(() => {})
}

/** Pause while something else needs the sound (a film, a hidden tab). */
function hold(reason: string) {
  if (!audio || audio.paused) return
  holds.add(reason)
  audio.pause()
}

function release(reason: string) {
  if (!holds.delete(reason) || holds.size > 0 || isMuted()) return
  play(600)
}

export const backgroundMusic = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  isPlaying: () => !!audio && !audio.paused,
  /** Call from inside a tap handler (iOS only allows audio that starts from a gesture). */
  startFromGesture() {
    if (!isMuted()) play(2500)
  },
  toggle() {
    const a = element()
    holds.clear()
    if (a.paused) {
      rememberMuted(false)
      play(800)
    } else {
      rememberMuted(true)
      a.pause()
    }
  },
  hold,
  release,
}
