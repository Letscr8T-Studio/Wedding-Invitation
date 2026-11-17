import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { couple, gift } from '../content'
import { copyText } from '../lib/copy'

type CopyState = 'idle' | 'copied' | 'failed'

const COPIED_MS = 2200

function useCopy(text: string) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    const ok = await copyText(text)
    setState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    if (ok) timer.current = window.setTimeout(() => setState('idle'), COPIED_MS)
  }
  return [state, copy] as const
}

function ChipIcon() {
  return (
    <svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
      strokeWidth="1"
      aria-hidden="true"
      className="stroke-sage-200"
    >
      <rect x="0.5" y="0.5" width="39" height="29" rx="5" />
      <path d="M0 10h14M0 20h14M26 10h14M26 20h14M14 0v30M26 0v30" />
    </svg>
  )
}

function BankCard() {
  const [state, copy] = useCopy(gift.accountNumber)
  const { first, amp, second } = couple.monogram

  return (
    <div className="flex w-[min(100%,480px)] flex-col items-stretch gap-3">
      <div className="relative flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-[20px] surface-dark p-6 shadow-card sm:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[16%] -right-2.5 font-script text-[clamp(170px,50vw,240px)] leading-none text-forest-850 select-none"
        >
          {first}
          {amp}
          {second}
        </span>

        <div className="relative flex items-start justify-between">
          <span className="text-[11px] font-normal tracking-[0.3em] text-sage-200 uppercase">
            {gift.bank}
          </span>
          <ChipIcon />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <span className="font-display text-[clamp(28px,4vw,42px)] leading-none font-normal tracking-[0.08em] lining-nums select-all">
            {gift.accountNumberDisplay}
          </span>
          <span className="text-[13px] tracking-[0.18em] text-sage-100 uppercase">
            {gift.accountName}
          </span>
        </div>

        <div className="relative flex justify-end">
          <Button variant="light" onClick={copy} className="min-w-[13.5rem]">
            {state === 'copied' ? gift.copied : gift.copy}
          </Button>
        </div>
      </div>

      <p role="status" className="m-0 min-h-6 text-center text-sm text-forest-700">
        {state === 'failed' && gift.copyFailed}
        {state === 'copied' && <span className="sr-only">{gift.copiedAnnouncement}</span>}
      </p>
    </div>
  )
}

export function Gift() {
  return (
    <Container
      as="section"
      id="gift"
      aria-labelledby="gift-heading"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-12 section-y md:gap-16"
    >
      <Reveal className="flex flex-col gap-6">
        <SectionHeading id="gift-heading" heading={gift.heading} />
        <p className="m-0 max-w-[460px] text-[17px] leading-[1.75] text-forest-800">{gift.body}</p>
      </Reveal>
      <Reveal delay={0.15} className="flex justify-center">
        <BankCard />
      </Reveal>
    </Container>
  )
}
