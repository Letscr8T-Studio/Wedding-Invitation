import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { colours } from '../content'

function Swatches() {
  const [green, white] = colours.swatches
  return (
    <ul
      className="m-0 flex list-none items-start justify-center p-0 [--s:min(300px,46vw)] lg:min-h-[420px] lg:items-center"
      aria-label={`${colours.heading.roman} ${colours.heading.italic}`}
    >
      <li className="relative z-1 -mr-[calc(var(--s)*0.21)] flex size-(--s) items-end justify-center rounded-full bg-sage-200 pb-[calc(var(--s)*0.16)]">
        <Swatch name={green.name} hex={green.hex} hexClassName="text-forest-800" />
      </li>
      <li className="mt-[calc(var(--s)*0.53)] flex size-(--s) items-end justify-center rounded-full border border-sage-100 bg-white pb-[calc(var(--s)*0.16)] shadow-swatch">
        <Swatch name={white.name} hex={white.hex} hexClassName="text-forest-700" />
      </li>
    </ul>
  )
}

function Swatch({ name, hex, hexClassName }: { name: string; hex: string; hexClassName: string }) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      <span className="font-display text-[clamp(22px,6vw,28px)] leading-tight italic">{name}</span>
      <span className={`text-[11px] tracking-[0.2em] ${hexClassName}`}>{hex}</span>
    </span>
  )
}

export function Colours() {
  return (
    <Container
      as="section"
      id="colours"
      aria-labelledby="colours-heading"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-16 section-y"
    >
      <Reveal className="flex flex-col gap-6">
        <SectionHeading id="colours-heading" heading={colours.heading} />
        <p className="m-0 max-w-[460px] text-[17px] leading-[1.75] text-forest-800">
          {colours.intro}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <Swatches />
      </Reveal>
    </Container>
  )
}
