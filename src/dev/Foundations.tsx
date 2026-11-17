import { useState } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { Monogram } from '../components/Monogram'
import { PhotoFrame } from '../components/PhotoFrame'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { RichText } from '../components/RichText'
import { SectionHeading } from '../components/SectionHeading'
import { Sprig } from '../components/Sprig'
import {
  contact,
  countdown,
  event,
  faq,
  gift,
  hero,
  intro,
  rsvp,
  scripture,
  story,
} from '../content'
import { copyText } from '../lib/copy'
import { getGuestName } from '../lib/guestName'
import { pad2, useCountdown } from '../lib/useCountdown'

/** Temporary Phase 1 review page. Replaced by the real sections in Phase 2. */
export function Foundations() {
  const cd = useCountdown(event.countdownTarget)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const guest = getGuestName()

  const onCopy = async () => {
    setCopyState((await copyText(gift.accountNumber)) ? 'copied' : 'failed')
    window.setTimeout(() => setCopyState('idle'), 2200)
  }

  return (
    <main>
      <Container className="flex flex-col gap-20 section-y">
        <div className="flex flex-col gap-6">
          <Eyebrow tracking="wide">Phase 1 · Foundations</Eyebrow>
          <Monogram
            className="text-[26px] tracking-[0.04em]"
            ampClassName="text-2xl text-sage-600"
          />
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <SectionHeading heading={story.heading} />
            <SectionHeading heading={rsvp.heading} size="display" stack />
            <SectionHeading heading={faq.heading} size="compact" />
          </div>
          <PhotoFrame
            shape="arch"
            ratio="4 / 5.4"
            alt={hero.photo.alt}
            label={hero.photo.label}
            labelStyle="pill"
            ornament
            className="w-full max-w-[460px] justify-self-center"
          />
        </div>

        <div className="flex flex-col items-center gap-8 bg-sage-150 px-5 py-16 text-center">
          <Sprig className="w-40" />
          <blockquote className="m-0 max-w-[980px] font-display text-[clamp(36px,5.4vw,72px)] leading-[1.12] font-light">
            <RichText value={scripture.text} />
          </blockquote>
          <Eyebrow tracking="wider" tone="body">
            {scripture.reference}
          </Eyebrow>
        </div>

        <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-10">
          {story.chapters.map((c, i) => (
            <RevealItem key={c.title} as="article" className={i === 1 ? 'md:pt-16' : undefined}>
              <PhotoFrame ratio="3 / 4" tone={c.tone} alt={c.photo.alt} label={c.photo.label} />
              <p className="mt-5 font-display text-lg text-sage-600 italic">{c.number}</p>
              <h3 className="mt-5 font-display text-[34px] font-normal">{c.title}</h3>
              <p className="mt-5 text-base leading-[1.75] text-forest-800">{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="flex flex-wrap items-center gap-3">
          <Button href={contact.tel} variant="outline-dark">
            {rsvp.call}
          </Button>
          <Button href={contact.whatsapp}>{rsvp.whatsapp}</Button>
          <Button type="submit" size="xl">
            {rsvp.form.submit}
          </Button>
        </div>
      </Container>

      <section className="surface-dark">
        <Container className="flex flex-col gap-12 py-16">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <p className="m-0 font-display text-[30px] font-light italic">{countdown.label}</p>
            <div className="flex flex-wrap gap-[clamp(20px,4vw,56px)]">
              {(
                [
                  [cd.days, countdown.units.days],
                  [cd.hours, countdown.units.hours],
                  [cd.minutes, countdown.units.minutes],
                  [cd.seconds, countdown.units.seconds],
                ] as const
              ).map(([value, unit]) => (
                <div key={unit} className="flex min-w-[72px] flex-col items-center gap-1.5">
                  <span className="font-display text-[56px] leading-none font-light tabular-nums">
                    {pad2(value)}
                  </span>
                  <Eyebrow size="sm" tone="onDark" as="span">
                    {unit}
                  </Eyebrow>
                </div>
              ))}
            </div>
            <Button href={event.googleCalendarUrl} variant="outline-light">
              {countdown.addToCalendar}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="light" size="lg" onClick={onCopy}>
              {copyState === 'copied' ? gift.copied : gift.copy}
            </Button>
            <span className="font-display text-3xl tracking-[0.08em]">
              {gift.accountNumberDisplay}
            </span>
            <span role="status" className="text-sm text-sage-200">
              {copyState === 'failed' ? gift.copyFailed : ''}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <Eyebrow tone="onDark" tracking="wider">
              {intro.greetingPrefix} {guest ?? intro.defaultGuest}
            </Eyebrow>
            <Sprig variant="branch-left" className="w-52 text-sage-500" />
          </div>
        </Container>
      </section>
    </main>
  )
}
