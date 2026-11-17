import type { HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main'
}

export function Container({ as: Tag = 'div', className, ...rest }: Props) {
  return (
    <Tag
      className={cx('mx-auto w-full max-w-[1280px] px-5 min-[400px]:px-8', className)}
      {...rest}
    />
  )
}
