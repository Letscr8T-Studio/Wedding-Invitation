import { couple } from '../content'

/** Square M&E monogram on sage, rendered at the requested pixel size. */
export function Icon({ size }: { size: number }) {
  const { first, amp, second } = couple.monogram
  return (
    <div
      className="flex items-center justify-center bg-sage-200 font-display font-medium text-forest-900"
      style={{ width: size, height: size, fontSize: size * 0.42, letterSpacing: '-0.02em' }}
    >
      <span className="leading-none">
        {first}
        <span
          className="font-script font-normal text-sage-600"
          style={{ fontSize: '1.15em', margin: '0 -0.04em' }}
        >
          {amp}
        </span>
        {second}
      </span>
    </div>
  )
}
