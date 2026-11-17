import { Container } from '../components/Container'
import { PhotoFrame } from '../components/PhotoFrame'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { story } from '../content'
import { cx } from '../lib/cx'

export function Story() {
  return (
    <Container
      as="section"
      id="story"
      aria-labelledby="story-heading"
      className="flex flex-col gap-12 section-y md:gap-[72px]"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="story-heading" heading={story.heading} />
        <p className="m-0 max-w-[380px] text-base leading-[1.7] text-forest-700">{story.intro}</p>
      </Reveal>

      <RevealGroup as="ol" className="m-0 grid list-none gap-x-10 gap-y-16 p-0 lg:grid-cols-3">
        {story.chapters.map((chapter, i) => (
          <RevealItem
            as="li"
            key={chapter.title}
            className={cx(
              'grid gap-5 md:max-lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:max-lg:items-center md:max-lg:gap-12',
              i === 1 && 'lg:pt-16 md:max-lg:[&>:first-child]:order-last',
            )}
          >
            <PhotoFrame
              ratio="3 / 4"
              tone={chapter.tone}
              src={chapter.photo.src}
              alt={chapter.photo.alt}
              label={chapter.photo.label}
              width={800}
              height={1067}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 100vw"
            />
            <article className="flex flex-col gap-5">
              <p className="m-0 font-display text-lg text-sage-600 italic">{chapter.number}</p>
              <h3 className="m-0 font-display text-[34px] leading-[1.1] font-normal">
                {chapter.title}
              </h3>
              <p className="m-0 text-base leading-[1.75] text-forest-800">{chapter.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Container>
  )
}
