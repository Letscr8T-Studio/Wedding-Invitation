import { couple } from '../content'
import { cx } from '../lib/cx'

type Props = {
  className?: string
  ampClassName?: string
}

export function Monogram({ className, ampClassName }: Props) {
  const { first, amp, second } = couple.monogram
  return (
    <span className={cx('font-display', className)}>
      {first}
      <span className={cx('font-script', ampClassName)}>{amp}</span>
      {second}
    </span>
  )
}
