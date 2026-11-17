import { useState } from 'react'
import { Container } from '../components/Container'
import { Lightbox } from '../components/Lightbox'
import { PlayBadge } from '../components/PlayBadge'
import { SectionHeading } from '../components/SectionHeading'
import { gallery, site, type GalleryItem, type Tone } from '../content'
import { cx } from '../lib/cx'

type Filter = (typeof gallery.filters)[number]['id']

const rowSpans: Record<number, string> = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
}

const tileTones: Record<Tone, string> = {
  'sage-100': 'bg-sage-100',
  'sage-150': 'bg-sage-150',
  'sage-200': 'bg-sage-200',
  'sage-300': 'bg-sage-300',
  'sage-400': 'bg-sage-400',
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'min-h-11 cursor-pointer rounded-full border pr-5 pl-[calc(20px+0.2em)] text-xs font-normal tracking-[0.2em] uppercase transition-colors duration-300',
        active
          ? 'border-sage-150 bg-sage-150 text-forest-900'
          : 'border-hairline-dark bg-transparent text-ivory hover:border-sage-200',
      )}
    >
      {children}
    </button>
  )
}

function Tile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const isVideo = item.kind === 'video'
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={isVideo ? gallery.play(item.label) : gallery.open(item.label)}
      className={cx(
        'group relative cursor-pointer overflow-hidden rounded-[4px] border-0 p-0 text-left',
        tileTones[item.tone],
        rowSpans[item.rows],
        item.cols === 2 && 'col-span-2',
      )}
    >
      {item.src && (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-garden group-hover:scale-[1.03]"
        />
      )}
      {isVideo && (
        <span className="absolute inset-0 flex items-center justify-center">
          <PlayBadge className="size-14 group-hover:scale-105 sm:size-[72px]" />
        </span>
      )}
      <span
        className={cx(
          'absolute bottom-3.5 left-4 text-[11px] font-normal tracking-[0.22em] uppercase',
          item.src ? 'rounded-full bg-ivory/85 px-3 py-1.5 text-forest-900' : 'text-forest-900',
        )}
      >
        {item.label}
      </span>
    </button>
  )
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items: readonly GalleryItem[] = gallery.items.filter(
    (item) => filter === 'all' || item.kind === filter,
  )

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="surface-dark section-y">
      <Container className="flex flex-col gap-10 md:gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="gallery-heading" heading={gallery.heading} tone="onDark" />
          <div role="group" aria-label={gallery.filterLabel} className="flex flex-wrap gap-2">
            {gallery.filters.map((f) => (
              <FilterPill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </FilterPill>
            ))}
          </div>
        </div>

        <div className="grid grid-flow-dense auto-rows-[96px] grid-cols-2 gap-3 sm:auto-rows-[120px] sm:gap-4 lg:grid-cols-4">
          {items.map((item, i) => (
            <Tile key={item.id} item={item} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>

        <p className="m-0 text-center font-display text-2xl text-sage-200 italic">
          {gallery.shareLine}{' '}
          <span className="font-sans text-lg font-normal tracking-[0.08em] text-ivory not-italic">
            {site.hashtag}
          </span>
        </p>
      </Container>

      <Lightbox items={items} index={openIndex} onIndexChange={setOpenIndex} />
    </section>
  )
}
