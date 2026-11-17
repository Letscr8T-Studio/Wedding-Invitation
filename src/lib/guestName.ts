const MAX_LENGTH = 40

export function sanitizeGuestName(raw: string | null | undefined): string | null {
  if (!raw) return null
  const clean = raw
    .normalize('NFKC')
    .replace(/[^\p{L}\p{M}\p{N} '’.&-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_LENGTH)
    .trim()
  return clean || null
}

export function getGuestName(search: string = window.location.search) {
  return sanitizeGuestName(new URLSearchParams(search).get('to'))
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? ''
}
