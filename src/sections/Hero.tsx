import { m, useReducedMotion, type Variants } from 'motion/react'
import { useState } from 'react'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { PhotoFrame } from '../components/PhotoFrame'
import { couple, hero } from '../content'
import { EASE_GARDEN } from '../lib/motion'

const column: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const names: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: '0.3em' },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_GARDEN } },
}

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_GARDEN } },
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 pt-[18px]">
      <Eyebrow as="span" size="sm">
        {label}
      </Eyebrow>
      <span className="font-display text-[34px] leading-[1.15] font-normal">{value}</span>
    </div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  // Behind the envelope the portrait isn't visible yet, so it shouldn't compete with the intro.
  const [introShowing] = useState(() => !ready)
  const state = ready || reduce ? 'show' : 'hidden'
  const initial = reduce ? false : 'hidden'

  return (
    <Container
      as="section"
      id="top"
      aria-label={couple.monogram.label}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-16 pt-14 pb-24 sm:pt-[72px]"
    >
      <m.div
        variants={column}
        initial={initial}
        animate={state}
        className="@container flex flex-col gap-7"
      >
        <m.div variants={fade}>
          <Eyebrow tracking="wide">{hero.eyebrow}</Eyebrow>
        </m.div>

        <m.h1
          variants={names}
          className="m-0 font-display text-[clamp(72px,10vw,156px)] leading-[0.86] font-light tracking-[-0.02em] text-forest-900"
        >
          <m.span variants={rise} className="block">
            {couple.bride}
          </m.span>
          <m.span
            variants={rise}
            className="block pl-[0.9em] font-script text-[0.55em] leading-[1.1] tracking-normal text-sage-500"
          >
            {couple.amp}
          </m.span>
          <m.span variants={rise} className="block italic">
            {couple.groom}
          </m.span>
        </m.h1>

        <m.p
          variants={fade}
          className="m-0 max-w-[440px] font-display text-2xl leading-[1.4] text-forest-800 italic"
        >
          {hero.line}
        </m.p>

        <m.div
          variants={fade}
          className="mt-2 flex flex-wrap items-center gap-x-[18px] border-t border-hairline pt-2"
        >
          <Fact label={hero.dateLabel} value={hero.date} />
          <span
            aria-hidden="true"
            className="mt-[18px] hidden h-[52px] w-px bg-hairline @min-[480px]:block"
          />
          <Fact label={hero.placeLabel} value={hero.place} />
        </m.div>
      </m.div>

      <div className="flex justify-center">
        <div className="relative w-[min(88%,460px)]">
          <m.div
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0 }}
            animate={state === 'show' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE_GARDEN }}
            className="absolute top-[6%] -right-[7%] -bottom-[4%] left-[10%] rounded-[999px_999px_24px_24px] border border-sage-300 sm:-right-[12%]"
          />
          <m.div
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={state === 'show' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.6, ease: EASE_GARDEN }}
          >
            <PhotoFrame
              shape="arch"
              ratio="4 / 5.4"
              src={hero.photo.src}
              alt={hero.photo.alt}
              label={hero.photo.label}
              labelStyle="pill"
              width={920}
              height={1242}
              sizes="(min-width: 1024px) 460px, 88vw"
              priority={!introShowing}
              ornament
              className="w-full"
            />
          </m.div>
          <m.p
            initial={reduce ? false : { opacity: 0, rotate: -20, scale: 0.9 }}
            animate={
              state === 'show'
                ? { opacity: 1, rotate: -8, scale: 1 }
                : { opacity: 0, rotate: -20, scale: 0.9 }
            }
            transition={{ duration: 1, delay: 0.9, ease: EASE_GARDEN }}
            className="absolute bottom-10 -left-[7%] m-0 flex size-[112px] flex-col items-center justify-center rounded-full bg-forest-900 text-center text-ivory shadow-seal sm:-left-[12%] sm:size-[132px]"
          >
            <span className="font-script text-[26px] leading-none sm:text-[30px]">
              {hero.seal.script}
            </span>
            <span className="text-[10px] font-normal tracking-[0.3em] uppercase">
              {hero.seal.caption}
            </span>
          </m.p>
        </div>
      </div>
    </Container>
  )
}
