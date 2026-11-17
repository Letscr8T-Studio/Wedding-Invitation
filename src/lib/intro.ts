const KEY = 'seenIntro'

export function shouldShowIntro() {
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // storage blocked: the intro simply shows again on refresh
  }
  document.documentElement.classList.remove('intro')
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
