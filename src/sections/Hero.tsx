import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { PhotoFrame } from '../components/PhotoFrame'
import { couple, hero } from '../content'

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

export function Hero() {
  return (
    <Container
      as="section"
      id="top"
      aria-label={couple.monogram.label}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-16 pt-14 pb-24 sm:pt-[72px]"
    >
      <div className="@container flex flex-col gap-7">
        <Eyebrow tracking="wide">{hero.eyebrow}</Eyebrow>

        <h1 className="m-0 font-display text-[clamp(72px,10vw,156px)] leading-[0.86] font-light tracking-[-0.02em] text-forest-900">
          <span className="block">{couple.bride}</span>
          <span className="block pl-[0.9em] font-script text-[0.55em] leading-[1.1] tracking-normal text-sage-500">
            {couple.amp}
          </span>
          <span className="block italic">{couple.groom}</span>
        </h1>

        <p className="m-0 max-w-[440px] font-display text-2xl leading-[1.4] text-forest-800 italic">
          {hero.line}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-[18px] border-t border-hairline pt-2">
          <Fact label={hero.dateLabel} value={hero.date} />
          <span
            aria-hidden="true"
            className="mt-[18px] hidden h-[52px] w-px bg-hairline @min-[480px]:block"
          />
          <Fact label={hero.placeLabel} value={hero.place} />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-[min(88%,460px)]">
          <div
            aria-hidden="true"
            className="absolute top-[6%] -right-[7%] -bottom-[4%] left-[10%] rounded-[999px_999px_24px_24px] border border-sage-300 sm:-right-[12%]"
          />
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
            priority
            ornament
            className="w-full"
          />
          <p className="absolute bottom-10 -left-[7%] m-0 flex size-[112px] -rotate-8 flex-col items-center justify-center rounded-full bg-forest-900 text-center text-ivory shadow-seal sm:-left-[12%] sm:size-[132px]">
            <span className="font-script text-[26px] leading-none sm:text-[30px]">
              {hero.seal.script}
            </span>
            <span className="text-[10px] font-normal tracking-[0.3em] uppercase">
              {hero.seal.caption}
            </span>
          </p>
        </div>
      </div>
    </Container>
  )
}
