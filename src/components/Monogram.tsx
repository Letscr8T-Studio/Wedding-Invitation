import { couple } from '../content'
import { cx } from '../lib/cx'

type Props = {
  className?: string
  ampClassName?: string
  'aria-hidden'?: boolean
}

export function Monogram({ className, ampClassName, ...rest }: Props) {
  const { first, amp, second } = couple.monogram
  return (
    <span className={cx('font-display', className)} {...rest}>
      {first}
      <span className={cx('font-script', ampClassName)}>{amp}</span>
      {second}
    </span>
  )
}
