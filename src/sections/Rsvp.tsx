import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { contact, rsvp } from '../content'
import { cx } from '../lib/cx'
import { firstName, getGuestName } from '../lib/guestName'
import { loadSavedRsvp, saveRsvp, submitRsvp, type SavedRsvp } from '../lib/rsvp'

type Status = 'idle' | 'sending' | 'error' | 'sent'

const { form: copy } = rsvp

const labelClass = 'text-[11px] font-medium tracking-[0.24em] text-forest-900 uppercase'
const fieldClass =
  'w-full rounded-md border border-sage-200 bg-white px-4 text-base text-forest-900 placeholder:text-forest-700/70 transition-colors focus:border-sage-600'

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  )
}

function Choice({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        'min-h-12 cursor-pointer rounded-full border px-5 text-sm transition-colors duration-300',
        pressed
          ? 'border-forest-900 bg-forest-900 text-ivory'
          : 'border-sage-200 bg-white text-forest-900 hover:border-sage-600',
      )}
    >
      {children}
    </button>
  )
}

function emptyForm(): SavedRsvp {
  return { name: getGuestName() ?? '', phone: '', attending: 'yes', guests: 1, note: '' }
}

function Contact() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading id="rsvp-heading" heading={rsvp.heading} size="display" stack />
      <p className="m-0 max-w-[420px] text-[17px] leading-[1.75] text-forest-800">{rsvp.intro}</p>
      <div className="mt-2 flex flex-col gap-3 border-t border-sage-300 pt-4">
        <span className="pt-4 text-[11px] font-medium tracking-[0.28em] uppercase">
          {rsvp.contactEyebrow}
        </span>
        <span className="font-display text-4xl leading-tight lining-nums">
          {contact.phoneDisplay}
        </span>
        <span className="text-[15px] text-forest-800">{contact.name}</span>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button href={contact.tel} variant="outline-dark">
            {rsvp.call}
          </Button>
          <Button href={contact.whatsapp}>{rsvp.whatsapp}</Button>
        </div>
      </div>
    </div>
  )
}

function ThankYou({
  data,
  focusOnMount,
  onEdit,
}: {
  data: SavedRsvp
  focusOnMount: boolean
  onEdit: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focusOnMount) headingRef.current?.focus()
  }, [focusOnMount])
  const first = firstName(data.name)

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="m-0 font-script text-[64px] leading-none font-normal text-sage-600 outline-none"
      >
        {rsvp.thanks.script}
      </h3>
      <p className="m-0 max-w-[360px] font-display text-[26px] leading-snug italic">
        {data.attending === 'no' ? rsvp.thanks.declines(first) : rsvp.thanks.accepts(first)}
      </p>
      <Button variant="outline-dark" onClick={onEdit} className="mt-3">
        {rsvp.thanks.edit}
      </Button>
    </div>
  )
}

function RsvpForm({ initial, onSent }: { initial: SavedRsvp; onSent: (d: SavedRsvp) => void }) {
  const id = useId()
  const [data, setData] = useState<SavedRsvp>(initial)
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const set = <K extends keyof SavedRsvp>(key: K, value: SavedRsvp[K]) =>
    setData((d) => ({ ...d, [key]: value }))

  const clean = (): SavedRsvp => ({
    ...data,
    name: data.name.trim(),
    phone: data.phone.trim(),
    note: data.note.trim(),
    guests: data.attending === 'yes' ? data.guests : 1,
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload = clean()
    setStatus('sending')
    try {
      await submitRsvp({ ...payload, website })
      saveRsvp(payload)
      setStatus('sent')
      onSent(payload)
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[22px]" aria-busy={sending}>
      <Field id={`${id}-name`} label={copy.name.label}>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          value={data.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder={copy.name.placeholder}
          className={cx(fieldClass, 'min-h-[50px]')}
        />
      </Field>

      <Field id={`${id}-phone`} label={copy.phone.label}>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          maxLength={30}
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder={copy.phone.placeholder}
          className={cx(fieldClass, 'min-h-[50px]')}
        />
      </Field>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className={cx(labelClass, 'mb-2.5 p-0')}>{copy.attending.legend}</legend>
        <div className="grid gap-2.5 min-[420px]:flex min-[420px]:flex-wrap">
          <Choice pressed={data.attending === 'yes'} onClick={() => set('attending', 'yes')}>
            {copy.attending.yes}
          </Choice>
          <Choice pressed={data.attending === 'no'} onClick={() => set('attending', 'no')}>
            {copy.attending.no}
          </Choice>
        </div>
      </fieldset>

      {data.attending === 'yes' && (
        <Field id={`${id}-guests`} label={copy.guests.label}>
          <div className="relative w-[140px]">
            <select
              id={`${id}-guests`}
              name="guests"
              value={data.guests}
              onChange={(e) => set('guests', Number(e.target.value))}
              className={cx(fieldClass, 'min-h-[50px] cursor-pointer appearance-none pr-10')}
            >
              {Array.from({ length: copy.guests.max - copy.guests.min + 1 }, (_, i) => {
                const n = copy.guests.min + i
                return (
                  <option key={n} value={n}>
                    {n}
                  </option>
                )
              })}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 fill-none stroke-forest-900"
              strokeWidth="1.4"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </Field>
      )}

      <Field id={`${id}-note`} label={copy.note.label}>
        <textarea
          id={`${id}-note`}
          name="note"
          rows={3}
          maxLength={1000}
          value={data.note}
          onChange={(e) => set('note', e.target.value)}
          className={cx(fieldClass, 'resize-y py-3.5')}
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>{copy.honeypot}</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <Button type="submit" size="xl" fullWidth disabled={sending}>
        {sending ? copy.sending : copy.submit}
      </Button>

      <div aria-live="polite">
        {status === 'error' && (
          <div className="flex flex-col items-center gap-4 rounded-md border border-sage-300 bg-sage-50 p-5 text-center">
            <p className="m-0 text-[15px] leading-relaxed text-forest-800">{copy.error}</p>
            <Button href={rsvp.whatsappHref(rsvp.whatsappMessage(clean()))} variant="outline-dark">
              {copy.whatsappFallback}
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}

export function Rsvp() {
  const [sent, setSent] = useState<SavedRsvp | null>(loadSavedRsvp)
  const [draft, setDraft] = useState<SavedRsvp>(() => loadSavedRsvp() ?? emptyForm())
  const [justSent, setJustSent] = useState(false)

  return (
    <section id="rsvp" aria-labelledby="rsvp-heading" className="bg-sage-150 section-y">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-12 md:gap-16">
        <Reveal>
          <Contact />
        </Reveal>
        <Reveal delay={0.12} className="relative rounded-lg bg-ivory p-[clamp(24px,4vw,48px)]">
          {sent ? (
            <ThankYou
              data={sent}
              focusOnMount={justSent}
              onEdit={() => {
                setDraft(sent)
                setSent(null)
              }}
            />
          ) : (
            <RsvpForm
              initial={draft}
              onSent={(d) => {
                setJustSent(true)
                setSent(d)
              }}
            />
          )}
        </Reveal>
      </Container>
    </section>
  )
}
