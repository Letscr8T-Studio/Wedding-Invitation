import { useEffect, useRef } from 'react'
import { gallery, type GalleryItem } from '../content'
import { toEmbed } from '../lib/embed'
import { PhotoFrame } from './PhotoFrame'

type Props = {
  items: readonly GalleryItem[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

const SWIPE_THRESHOLD = 50

const iconButton =
  'flex size-12 cursor-pointer items-center justify-center rounded-full border border-hairline-dark text-ivory transition-colors hover:bg-ivory hover:text-forest-900'

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={flip ? 'rotate-180' : undefined}
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

function Media({ item }: { item: GalleryItem }) {
  const embed = item.kind === 'video' ? toEmbed(item.videoUrl) : null

  if (embed?.kind === 'iframe') {
    return (
      <iframe
        src={embed.src}
        title={item.alt}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full max-w-5xl rounded-[4px] border-0 bg-forest-850"
      />
    )
  }
  if (embed?.kind === 'video') {
    return (
      <video
        src={embed.src}
        controls
        autoPlay
        playsInline
        preload="none"
        className="max-h-[78dvh] w-full max-w-5xl rounded-[4px] bg-forest-850"
      />
    )
  }
  if (item.src) {
    return (
      <img
        src={item.src}
        alt={item.alt}
        className="max-h-[78dvh] w-auto max-w-full rounded-[4px] object-contain"
      />
    )
  }
  return (
    <PhotoFrame
      alt={item.alt}
      label={item.kind === 'video' ? gallery.videosPending : item.label}
      tone={item.tone}
      ratio={item.kind === 'video' ? '16 / 9' : '4 / 5'}
      className={item.kind === 'video' ? 'w-full max-w-5xl' : 'h-[70dvh] max-w-full'}
    />
  )
}

export function Lightbox({ items, index, onIndexChange }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const open = index !== null
  const item = open ? items[index] : null
  const total = items.length

  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      dialog.showModal()
    }
    if (!open) {
      if (dialog.open) dialog.close()
      returnFocus.current?.focus()
      returnFocus.current = null
    }
  }, [open])

  const step = (delta: number) => {
    if (index === null) return
    onIndexChange((index + delta + total) % total)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={gallery.lightbox.label}
      onClose={() => onIndexChange(null)}
      onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > SWIPE_THRESHOLD) step(dx < 0 ? 1 : -1)
      }}
      className="lightbox m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-forest-900/96 p-0 text-ivory"
    >
      {item && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 min-[400px]:px-8">
            <p className="m-0 text-xs tracking-[0.28em] text-sage-200 uppercase">
              <span aria-live="polite">{gallery.lightbox.counter(index! + 1, total)}</span>
              <span className="mx-3 text-hairline-dark">·</span>
              {item.label}
            </p>
            <button
              type="button"
              autoFocus
              aria-label={gallery.lightbox.close}
              onClick={() => dialogRef.current?.close()}
              className={iconButton}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-5 pb-6 min-[400px]:px-8"
            onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
          >
            <Media key={item.id} item={item} />
          </div>

          {total > 1 && (
            <div className="flex justify-center gap-3 pb-8">
              <button
                type="button"
                aria-label={gallery.lightbox.previous}
                onClick={() => step(-1)}
                className={iconButton}
              >
                <Chevron />
              </button>
              <button
                type="button"
                aria-label={gallery.lightbox.next}
                onClick={() => step(1)}
                className={iconButton}
              >
                <Chevron flip />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
