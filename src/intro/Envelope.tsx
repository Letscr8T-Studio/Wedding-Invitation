import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Sprig } from '../components/Sprig'
import { couple, intro } from '../content'
import { cx } from '../lib/cx'
import { getGuestName } from '../lib/guestName'
import { markIntroSeen, prefersReducedMotion } from '../lib/intro'

type Phase = 'closed' | 'open' | 'leaving'

const STAGE_W = 320
const STAGE_H = 400
const LEAVE_MS = 700

const ease = 'ease-garden motion-reduce:transition-none'

function useStageScale() {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () =>
      setScale(
        Math.max(
          0.62,
          Math.min(1.2, (window.innerWidth - 40) / STAGE_W, (window.innerHeight - 300) / STAGE_H),
        ),
      )
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

function InviteCard({ open }: { open: boolean }) {
  return (
    <div className="absolute inset-0 z-2 overflow-hidden">
      <div
        className={cx(
          'absolute bottom-20 left-[22px] flex h-[300px] w-[276px] flex-col items-center gap-0.5 rounded-[4px] bg-ivory pt-11 text-center shadow-envelope transition-transform duration-900',
          ease,
          open ? 'translate-y-0 delay-350' : 'translate-y-[175px]',
        )}
      >
        <span className="text-[9px] font-medium tracking-[0.3em] text-forest-700 uppercase">
          {intro.cardEyebrow}
        </span>
        <span className="mt-1 font-display text-[38px] leading-[0.95] font-light text-forest-900">
          {couple.bride}
        </span>
        <span className="font-script text-[26px] leading-none text-sage-500">{couple.amp}</span>
        <span className="font-display text-[38px] leading-[0.95] font-light text-forest-900 italic">
          {couple.groom}
        </span>
        <span className="mt-2.5 text-[11px] font-normal tracking-[0.24em] text-forest-900 uppercase">
          {intro.cardDate}
        </span>
      </div>
    </div>
  )
}

export function Envelope({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('closed')
  const [guest] = useState(() => getGuestName())
  const scale = useStageScale()
  const sealRef = useRef<HTMLButtonElement>(null)
  const enterRef = useRef<HTMLButtonElement>(null)
  const open = phase !== 'closed'

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    sealRef.current?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (phase === 'open') enterRef.current?.focus({ preventScroll: true })
  }, [phase])

  const leave = () => {
    if (phase === 'leaving') return
    markIntroSeen()
    window.scrollTo(0, 0)
    if (prefersReducedMotion()) return onDone()
    setPhase('leaving')
    window.setTimeout(onDone, LEAVE_MS)
  }

  const openEnvelope = () => {
    markIntroSeen()
    setPhase('open')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onKeyDown={(e) => e.key === 'Escape' && leave()}
      className={cx(
        'fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden surface-dark px-7 pt-[clamp(36px,8dvh,72px)] pb-[clamp(28px,6dvh,56px)] transition-opacity duration-700',
        ease,
        phase === 'leaving' && 'pointer-events-none opacity-0',
      )}
    >
      <Sprig
        variant="branch-left"
        strokeWidth={0.8}
        className="pointer-events-none absolute top-[8%] -left-2 w-[min(56%,300px)] text-sage-500 opacity-35"
      />
      <Sprig
        variant="branch-right"
        strokeWidth={0.8}
        className="pointer-events-none absolute -right-2 bottom-[10%] w-[min(56%,300px)] text-sage-500 opacity-35"
      />

      <button
        type="button"
        onClick={leave}
        className="absolute top-3 right-3 min-h-11 cursor-pointer border-0 bg-transparent px-4 text-[11px] font-normal tracking-[0.28em] text-sage-200 uppercase underline-offset-4 hover:underline"
      >
        {intro.skip}
      </button>

      <div className="relative flex flex-col items-center gap-2.5 text-center">
        <span className="text-[11px] font-normal tracking-[0.34em] text-sage-200 uppercase">
          {intro.greetingPrefix} {guest ?? intro.defaultGuest}
        </span>
        <h2 id="intro-title" className="m-0 font-display text-[34px] font-light italic">
          {intro.invited}
        </h2>
      </div>

      <div
        style={{ width: STAGE_W * scale, height: STAGE_H * scale }}
        className="relative shrink-0"
      >
        <div
          className="absolute top-0 left-0 origin-top-left perspective-[1000px]"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
        >
          <div className="absolute bottom-0 left-0 h-[210px] w-full rounded-md bg-sage-300" />

          <div
            aria-hidden="true"
            className={cx(
              'absolute bottom-[100px] left-0 h-[110px] w-full origin-top bg-sage-400 [clip-path:polygon(0_0,100%_0,50%_100%)]',
              'transition-[transform,z-index] [transition-duration:0.6s,0s]',
              ease,
              open ? 'z-1 rotate-x-180 [transition-delay:0s,0.3s]' : 'z-4',
            )}
          />

          <InviteCard open={open} />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 z-3 h-[210px] w-full rounded-md bg-sage-200 [clip-path:polygon(0_0,50%_52%,100%_0,100%_100%,0_100%)]"
          />

          <button
            ref={sealRef}
            type="button"
            onClick={openEnvelope}
            disabled={open}
            aria-label={intro.openLabel}
            className={cx(
              'seal absolute bottom-16 left-[124px] z-5 flex size-[72px] cursor-pointer items-center justify-center rounded-full border-0 bg-sage-600 transition-[opacity,scale] duration-300',
              ease,
              open && 'pointer-events-none scale-60 opacity-0',
            )}
          >
            <span className="font-script text-[26px] leading-none text-ivory">
              {couple.monogram.first}
              {couple.monogram.amp}
              {couple.monogram.second}
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex min-h-[104px] flex-col items-center justify-end gap-4 bg-forest-900">
        {open ? (
          <button
            ref={enterRef}
            type="button"
            onClick={leave}
            className="intro-enter min-h-[52px] cursor-pointer rounded-full border-0 bg-sage-150 pr-8 pl-[calc(32px+0.26em)] text-xs font-medium tracking-[0.26em] text-forest-900 uppercase transition-colors hover:bg-ivory"
          >
            {intro.enter}
          </button>
        ) : (
          <span className="text-xs tracking-[0.28em] text-sage-200 uppercase">{intro.tapHint}</span>
        )}
        <span className="font-display text-base text-sage-200 italic">{intro.verse}</span>
      </div>
    </div>
  )
}
