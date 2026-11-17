import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { day, venue } from '../content'

function Schedule() {
  return (
    <div className="w-full rounded-md border border-sage-100 bg-ivory p-6 sm:p-10">
      <Eyebrow className="mb-6">{day.scheduleTitle}</Eyebrow>
      <ol className="m-0 list-none p-0">
        {day.schedule.map((item) => (
          <li
            key={item.title}
            className="grid grid-cols-[84px_1fr] gap-5 border-t border-sage-100 py-[22px] sm:grid-cols-[110px_1fr]"
          >
            <span className="font-display text-[22px] leading-[1.3] font-medium">{item.time}</span>
            <div className="flex flex-col gap-1">
              <span className="font-display text-[26px] leading-[1.15] font-normal">
                {item.title}
              </span>
              <span className="text-[15px] leading-[1.6] text-forest-700">{item.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

const mapText = 'fill-sage-200 font-sans'

function VenueMap() {
  return (
    <div aria-hidden="true" className="h-[200px] bg-forest-850 sm:h-60">
      <svg
        viewBox="0 0 600 240"
        preserveAspectRatio="xMidYMid slice"
        className="size-full"
        fill="none"
      >
        <g className="stroke-sage-500" strokeWidth="1">
          <path d="M-10 180 C 120 160, 220 200, 320 150 S 520 90, 620 110" />
          <path d="M-10 60 C 100 80, 180 40, 300 70 S 500 140, 620 120" strokeDasharray="4 6" />
          <path d="M180 -10 C 200 80, 240 160, 220 260" />
          <path d="M420 -10 C 400 70, 430 170, 460 260" />
        </g>
        <path d="M0 120 H600" className="stroke-hairline-dark" strokeWidth="10" opacity="0.5" />
        <text x="130" y="108" className={mapText} fontSize="11" letterSpacing="3">
          {venue.map.road.toUpperCase()}
        </text>
        <rect x="262" y="140" width="60" height="34" className="stroke-sage-200" />
        <text x="262" y="192" className={mapText} fontSize="9" letterSpacing="2">
          {venue.map.station.toUpperCase()}
        </text>
        <rect
          x="350"
          y="40"
          width="110"
          height="50"
          className="stroke-sage-200"
          strokeDasharray="3 3"
        />
        <text x="350" y="32" className={mapText} fontSize="9" letterSpacing="1.6">
          {venue.map.barracks.toUpperCase()}
        </text>
        <path
          d="M300 128 C 293 118, 282 110, 282 98 a18 18 0 1 1 36 0 C 318 110, 307 118, 300 128Z"
          className="fill-sage-150"
        />
        <circle cx="300" cy="98" r="6" className="fill-forest-900" />
      </svg>
    </div>
  )
}

function DirectionsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M3 11l18-8-8 18-2-8-8-2z" />
    </svg>
  )
}

function Venue() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md surface-dark">
      <VenueMap />
      <div className="flex flex-col gap-5 p-6 sm:p-10">
        <Eyebrow tone="onDark">{day.venueEyebrow}</Eyebrow>
        <h3 className="m-0 font-display text-[clamp(32px,4vw,40px)] leading-[1.05] font-normal">
          {venue.name}, <em className="italic">{venue.area}</em>
        </h3>
        <address className="text-base leading-[1.7] text-sage-100 not-italic">
          {venue.addressShort}
        </address>
        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          {venue.landmarks.map((landmark) => (
            <li
              key={landmark}
              className="rounded-full border border-hairline-dark px-3.5 py-2 text-[13px] text-sage-100"
            >
              {landmark}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={venue.directionsUrl} variant="light" size="lg">
            <DirectionsIcon />
            {day.directions}
          </Button>
          <Button href={day.lost.href} variant="outline-light" size="lg">
            {day.lost.label}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Day() {
  return (
    <section id="day" aria-labelledby="day-heading" className="bg-sage-50 section-y">
      <Container className="flex flex-col gap-10 md:gap-14">
        <Reveal>
          <SectionHeading id="day-heading" heading={day.heading} />
        </Reveal>
        <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-8">
          <RevealItem className="flex">
            <Schedule />
          </RevealItem>
          <RevealItem className="flex">
            <Venue />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  )
}
