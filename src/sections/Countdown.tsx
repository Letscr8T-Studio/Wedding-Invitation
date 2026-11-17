import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { countdown, event } from '../content'
import { EASE_GARDEN } from '../lib/motion'
import { pad2, useCountdown } from '../lib/useCountdown'

function FlipDigits({ value }: { value: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative block overflow-hidden font-display text-[56px] leading-none font-light lining-nums tabular-nums">
      <span className="invisible">{value}</span>
      <AnimatePresence initial={false}>
        <m.span
          key={value}
          className="absolute inset-0 text-center"
          initial={reduce ? false : { y: '55%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { y: '-55%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_GARDEN }}
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

export function Countdown() {
  const cd = useCountdown(event.countdownTarget)
  const units = [
    [cd.days, countdown.units.days],
    [cd.hours, countdown.units.hours],
    [cd.minutes, countdown.units.minutes],
    [cd.seconds, countdown.units.seconds],
  ] as const

  return (
    <section aria-label={countdown.regionLabel} className="surface-dark">
      <Container className="flex flex-col items-center gap-8 py-11 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="m-0 font-display text-[30px] leading-tight font-light italic">
          {countdown.label}
        </p>

        <div
          role="timer"
          className="grid w-full max-w-[480px] grid-cols-4 gap-[clamp(12px,4vw,56px)] lg:flex lg:w-auto lg:max-w-none"
        >
          {units.map(([value, unit]) => (
            <div key={unit} className="flex min-w-0 flex-col items-center gap-1.5 lg:min-w-[72px]">
              <FlipDigits value={pad2(value)} />
              <span className="text-[11px] font-normal tracking-[0.2em] text-sage-200 uppercase sm:tracking-[0.28em]">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <Button href={event.googleCalendarUrl} variant="outline-light">
            {countdown.addToCalendar}
          </Button>
          <a
            href={`/${event.icsFile}`}
            className="py-1 text-[11px] font-normal tracking-[0.22em] text-sage-200 uppercase underline decoration-hairline-dark underline-offset-4 transition-colors hover:text-ivory hover:decoration-sage-200"
          >
            {countdown.ics}
          </a>
        </div>
      </Container>
    </section>
  )
}
