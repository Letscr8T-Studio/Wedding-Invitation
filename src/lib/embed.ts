export type Embed = { kind: 'iframe'; src: string } | { kind: 'video'; src: string } | null

export function toEmbed(url: string | null): Embed {
  if (!url) return null
  const youtube = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/,
  )
  if (youtube) {
    return {
      kind: 'iframe',
      src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0&playsinline=1`,
    }
  }
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)
  if (drive) return { kind: 'iframe', src: `https://drive.google.com/file/d/${drive[1]}/preview` }
  return { kind: 'video', src: url }
}
