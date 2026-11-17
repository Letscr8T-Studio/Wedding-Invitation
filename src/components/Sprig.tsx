import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type Variant = 'divider' | 'divider-wide' | 'stem' | 'branch-left' | 'branch-right'

const art: Record<Variant, { viewBox: string; paths: ReactNode }> = {
  divider: {
    viewBox: '0 0 160 40',
    paths: (
      <>
        <path d="M4 20 H156" />
        <path d="M40 20 C 44 10, 54 6, 62 8 C 58 16, 48 20, 40 20Z" />
        <path d="M58 20 C 62 30, 72 34, 80 32 C 76 24, 66 20, 58 20Z" />
        <path d="M80 20 C 84 10, 94 6, 102 8 C 98 16, 88 20, 80 20Z" />
        <path d="M98 20 C 102 30, 112 34, 120 32 C 116 24, 106 20, 98 20Z" />
        <circle cx="80" cy="20" r="2" fill="currentColor" />
      </>
    ),
  },
  'divider-wide': {
    viewBox: '0 0 220 48',
    paths: (
      <>
        <path d="M4 24 H216" />
        <path d="M56 24 C 62 12, 74 7, 84 10 C 79 19, 67 24, 56 24Z" />
        <path d="M80 24 C 86 36, 98 41, 108 38 C 103 29, 91 24, 80 24Z" />
        <path d="M110 24 C 116 12, 128 7, 138 10 C 133 19, 121 24, 110 24Z" />
        <path d="M134 24 C 140 36, 152 41, 162 38 C 157 29, 145 24, 134 24Z" />
        <circle cx="110" cy="24" r="2.5" fill="currentColor" />
      </>
    ),
  },
  stem: {
    viewBox: '0 0 200 260',
    paths: (
      <>
        <path d="M100 250 C 100 180, 96 120, 100 20" />
        <path d="M100 200 C 70 190, 52 170, 48 146 C 74 150, 92 168, 100 200Z" />
        <path d="M100 170 C 130 160, 148 140, 152 116 C 126 120, 108 138, 100 170Z" />
        <path d="M100 136 C 74 128, 60 110, 58 88 C 80 92, 96 110, 100 136Z" />
        <path d="M100 104 C 124 96, 138 80, 140 60 C 120 64, 104 80, 100 104Z" />
        <path d="M100 72 C 84 64, 78 50, 80 36 C 94 42, 100 56, 100 72Z" />
      </>
    ),
  },
  'branch-left': {
    viewBox: '-20 90 210 50',
    paths: (
      <>
        <path d="M-20 120 C 60 140, 120 80, 180 100" />
        <path d="M40 128 C 44 116, 56 110, 66 112 C 62 122, 50 128, 40 128Z" />
        <path d="M90 118 C 96 106, 108 102, 118 106 C 112 116, 100 120, 90 118Z" />
      </>
    ),
  },
  'branch-right': {
    viewBox: '200 690 210 70',
    paths: (
      <>
        <path d="M410 720 C 330 700, 270 760, 210 740" />
        <path d="M350 712 C 346 724, 334 730, 324 728 C 328 718, 340 712, 350 712Z" />
        <path d="M300 722 C 294 734, 282 738, 272 734 C 278 724, 290 720, 300 722Z" />
      </>
    ),
  },
}

type Props = {
  variant?: Variant
  strokeWidth?: number
  className?: string
}

export function Sprig({ variant = 'divider', strokeWidth = 1, className }: Props) {
  const { viewBox, paths } = art[variant]
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      className={cx('h-auto overflow-visible text-sage-600', className)}
    >
      {paths}
    </svg>
  )
}
