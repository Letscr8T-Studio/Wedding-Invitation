/** Clipboard copy with a fallback for older Android WebViews (e.g. WhatsApp's in-app browser). */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path
  }
  return legacyCopy(text)
}

function legacyCopy(text: string) {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  Object.assign(field.style, { position: 'fixed', top: '0', opacity: '0', fontSize: '16px' })
  document.body.appendChild(field)
  field.select()
  field.setSelectionRange(0, text.length)
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  document.body.removeChild(field)
  return ok
}
