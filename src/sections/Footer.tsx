import { Container } from '../components/Container'
import { Monogram } from '../components/Monogram'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { couple, footer } from '../content'

export function Footer() {
  return (
    <footer className="surface-dark pt-24 pb-12 text-center">
      <Container>
        <RevealGroup className="flex flex-col items-center gap-6">
          <RevealItem as="p" className="m-0">
            <span className="sr-only">{couple.monogram.label}</span>
            <Monogram
              aria-hidden
              className="block text-[clamp(64px,12vw,180px)] leading-[0.9] font-light tracking-[-0.02em]"
              ampClassName="text-[0.6em] tracking-normal text-sage-200"
            />
          </RevealItem>
          <RevealItem
            as="p"
            className="m-0 font-display text-[22px] leading-snug text-sage-200 italic"
          >
            {footer.line}
          </RevealItem>
          <RevealItem as="p" className="m-0 text-xs tracking-[0.3em] text-sage-300 uppercase">
            {footer.hashtag}
          </RevealItem>
        </RevealGroup>
        <div aria-hidden="true" className="mt-16 h-px w-full bg-forest-800" />
        <p className="m-0 mt-6 text-xs tracking-[0.14em] text-sage-300">
          {footer.credit.before}
          <a
            href={footer.credit.url}
            target="_blank"
            rel="noopener"
            className="text-sage-200 underline decoration-hairline-dark underline-offset-4 transition-colors hover:text-ivory hover:decoration-sage-200"
          >
            {footer.credit.name}
          </a>
        </p>
      </Container>
    </footer>
  )
}
