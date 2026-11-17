export type RsvpPayload = {
  name: string
  phone: string
  attending: 'yes' | 'no'
  guests: number
  note: string
  website: string
}

const TIMEOUT_MS = 15000
const STORAGE_KEY = 'rsvp:last'

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  if (payload.website) return

  const endpoint = import.meta.env.VITE_RSVP_ENDPOINT
  if (!endpoint) throw new Error('RSVP endpoint is not configured')

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    // text/plain keeps this a "simple" request, so Apps Script needs no CORS preflight.
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!res.ok || !data?.ok) throw new Error(data?.error ?? `RSVP failed (${res.status})`)
  } finally {
    window.clearTimeout(timer)
  }
}

export type SavedRsvp = Omit<RsvpPayload, 'website'>

export function loadSavedRsvp(): SavedRsvp | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedRsvp) : null
  } catch {
    return null
  }
}

export function saveRsvp(rsvp: SavedRsvp) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvp))
  } catch {
    // private mode or storage full: the thank-you still shows for this visit
  }
}
