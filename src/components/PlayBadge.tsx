import { cx } from '../lib/cx'

export function PlayBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex items-center justify-center rounded-full bg-ivory/92 transition-transform duration-500 ease-garden',
        className,
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className="ml-0.5 fill-forest-900">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}
