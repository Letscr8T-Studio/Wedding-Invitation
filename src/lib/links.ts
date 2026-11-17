export function whatsappLink(intlNumber: string, text?: string) {
  const base = `https://wa.me/${intlNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
