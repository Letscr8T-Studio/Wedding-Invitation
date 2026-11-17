import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { countdown, event } from '../content'
import { pad2, useCountdown } from '../lib/useCountdown'

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
              <span className="font-display text-[56px] leading-none font-light lining-nums tabular-nums">
                {pad2(value)}
              </span>
              <span className="text-[11px] font-normal tracking-[0.2em] text-sage-200 uppercase sm:tracking-[0.28em]">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <Button href={event.googleCalendarUrl} variant="outline-light">
          {countdown.addToCalendar}
        </Button>
      </Container>
    </section>
  )
}
