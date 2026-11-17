import type { Tone } from '../content'
import { cx } from '../lib/cx'
import { LoopVideo } from './LoopVideo'
import { Sprig } from './Sprig'

const tones: Record<Tone, string> = {
  'sage-100': 'bg-sage-100',
  'sage-150': 'bg-sage-150',
  'sage-200': 'bg-sage-200',
  'sage-300': 'bg-sage-300',
  'sage-400': 'bg-sage-400',
}

const shapes = {
  rect: 'rounded-[4px]',
  arch: 'rounded-[999px_999px_24px_24px]',
} as const

type Props = {
  src?: string | null
  alt: string
  label?: string
  tone?: Tone
  shape?: keyof typeof shapes
  ratio?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  labelStyle?: 'plain' | 'pill'
  ornament?: boolean
  loop?: string | null
  className?: string
}

export function PhotoFrame({
  src,
  alt,
  label,
  tone = 'sage-200',
  shape = 'rect',
  ratio,
  width,
  height,
  priority = false,
  sizes,
  labelStyle = 'plain',
  ornament = false,
  loop,
  className,
}: Props) {
  const frame = cx('relative overflow-hidden', shapes[shape], tones[tone], className)
  const style = ratio ? { aspectRatio: ratio } : undefined

  if (src) {
    return (
      <div className={frame} style={style}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchpriority: 'high' } : {})}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {loop && (
          <LoopVideo
            src={loop}
            poster={src}
            fallback={null}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cx(frame, 'flex items-end', labelStyle === 'pill' ? 'justify-center pb-7' : 'p-5')}
      style={style}
    >
      {ornament && (
        <Sprig
          variant="stem"
          strokeWidth={0.8}
          className="absolute top-[18%] left-1/2 w-[70%] -translate-x-1/2 text-sage-500 opacity-55"
        />
      )}
      {label && (
        <span
          aria-hidden="true"
          className={cx(
            'relative text-[11px] font-normal tracking-[0.24em] text-forest-900 uppercase',
            labelStyle === 'pill' && 'rounded-full bg-ivory/80 px-3.5 py-2 tracking-[0.28em]',
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}
