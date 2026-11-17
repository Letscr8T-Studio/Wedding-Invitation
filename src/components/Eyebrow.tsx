import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

const tones = {
  muted: 'text-forest-700',
  ink: 'text-forest-900',
  body: 'text-forest-800',
  onDark: 'text-sage-200',
} as const

const sizes = {
  sm: 'text-[11px]',
  md: 'text-xs',
} as const

const trackings = {
  tight: 'tracking-[0.22em]',
  base: 'tracking-[0.28em]',
  wide: 'tracking-[0.32em]',
  wider: 'tracking-[0.34em]',
} as const

type Props = {
  as?: 'p' | 'span' | 'h3' | 'legend' | 'label'
  tone?: keyof typeof tones
  size?: keyof typeof sizes
  tracking?: keyof typeof trackings
  weight?: 'normal' | 'medium'
  className?: string
  htmlFor?: string
  children: ReactNode
}

export function Eyebrow({
  as: Tag = 'p',
  tone = 'muted',
  size = 'md',
  tracking = 'base',
  weight = 'normal',
  className,
  children,
  ...rest
}: Props) {
  return (
    <Tag
      className={cx(
        'm-0 leading-[1.5] uppercase',
        weight === 'medium' ? 'font-medium' : 'font-normal',
        tones[tone],
        sizes[size],
        trackings[tracking],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
