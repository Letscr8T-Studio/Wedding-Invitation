import { Eyebrow } from '../components/Eyebrow'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { RichText } from '../components/RichText'
import { Sprig } from '../components/Sprig'
import { scripture } from '../content'

export function Scripture() {
  return (
    <section className="bg-sage-150 px-5 py-[clamp(80px,12vw,160px)] text-center min-[400px]:px-8">
      <figure className="m-0">
        <RevealGroup className="mx-auto flex max-w-[980px] flex-col items-center gap-8">
          <RevealItem>
            <Sprig className="w-40" />
          </RevealItem>
          <RevealItem>
            <blockquote className="m-0 font-display text-[clamp(36px,5.4vw,72px)] leading-[1.12] font-light text-forest-900">
              <RichText value={scripture.text} />
            </blockquote>
          </RevealItem>
          <RevealItem>
            <figcaption>
              <Eyebrow as="span" tone="body" tracking="wider">
                {scripture.reference}
              </Eyebrow>
            </figcaption>
          </RevealItem>
        </RevealGroup>
      </figure>
    </section>
  )
}
