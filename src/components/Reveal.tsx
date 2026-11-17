import { m, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE_GARDEN = [0.2, 0.8, 0.2, 1] as const

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_GARDEN, ...(delay ? { delay } : {}) },
  }),
}

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const viewport = { once: true, margin: '0px 0px -10% 0px' } as const

type Tag = 'div' | 'section' | 'article' | 'header' | 'ul' | 'li' | 'p' | 'span'

type Props = {
  as?: Tag
  className?: string
  id?: string
  children?: ReactNode
}

/** Fades and rises a single block into view once. */
export function Reveal({ as = 'div', delay, ...rest }: Props & { delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain {...rest} />
  }
  const M = m[as] as typeof m.div
  return (
    <M
      variants={item}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    />
  )
}

/** Staggers its `RevealItem` children (0.08s apart) when it scrolls into view. */
export function RevealGroup({ as = 'div', ...rest }: Props) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain {...rest} />
  }
  const M = m[as] as typeof m.div
  return <M variants={group} initial="hidden" whileInView="show" viewport={viewport} {...rest} />
}

export function RevealItem({ as = 'div', ...rest }: Props) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain {...rest} />
  }
  const M = m[as] as typeof m.div
  return <M variants={item} {...rest} />
}
