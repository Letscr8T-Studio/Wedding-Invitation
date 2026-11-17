import type { Heading } from '../content'
import { cx } from '../lib/cx'

const sizes = {
  section: 'text-[clamp(48px,6vw,88px)] leading-[0.95]',
  display: 'text-[clamp(56px,7vw,104px)] leading-[0.9]',
  compact: 'text-[clamp(44px,5vw,72px)] leading-[0.95]',
} as const

type Props = {
  heading: Heading
  as?: 'h1' | 'h2' | 'h3'
  size?: keyof typeof sizes
  tone?: 'ink' | 'onDark'
  stack?: boolean
  id?: string
  className?: string
}

export function SectionHeading({
  heading,
  as: Tag = 'h2',
  size = 'section',
  tone = 'ink',
  stack = false,
  id,
  className,
}: Props) {
  return (
    <Tag
      id={id}
      className={cx(
        'm-0 font-display font-light',
        tone === 'onDark' ? 'text-ivory' : 'text-forest-900',
        sizes[size],
        className,
      )}
    >
      {heading.roman}{' '}
      <em className={cx('italic', stack && 'block', tone === 'onDark' && 'text-sage-200')}>
        {heading.italic}
      </em>
    </Tag>
  )
}
