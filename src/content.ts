import { whatsappLink } from './lib/links.ts'

/** Inline text with italic runs: `['Our ', { em: 'story' }]`. */
export type Rich = readonly (string | { readonly em: string })[]

export type Heading = { readonly roman: string; readonly italic: string }

export type Tone = 'sage-100' | 'sage-150' | 'sage-200' | 'sage-300' | 'sage-400'

export type Photo = {
  readonly src: string | null
  readonly alt: string
  readonly label: string
  readonly width?: number
  readonly height?: number
  /** Silent loop played over the photo on good connections. */
  readonly loop?: string | null
  /** A second portrait shown side by side with the first (a diptych). */
  readonly pair?: { readonly src: string; readonly alt: string; readonly focus?: string }
  /** CSS object-position, to keep faces in frame when cropped. */
  readonly focus?: string
}

export type GalleryItem = {
  readonly id: string
  readonly kind: 'photo' | 'video'
  readonly label: string
  readonly alt: string
  readonly tone: Tone
  readonly rows: number
  readonly cols: 1 | 2
  /** Photo, or the poster frame for a film tile. */
  readonly src: string | null
  readonly width?: number
  readonly height?: number
  /** CSS object-position for the tile crop. */
  readonly focus?: string
  /** Silent preview loop shown in the tile on good connections. */
  readonly loop: string | null
  /** Full film opened in the lightbox. */
  readonly videoUrl: string | null
  readonly videoPoster: string | null
}

const MEDIA = '/media'

const PHONE_INTL = '2349014214591'

export const contact = {
  phone: '09014214591',
  phoneDisplay: '0901 421 4591',
  tel: `tel:+${PHONE_INTL}`,
  whatsapp: whatsappLink(PHONE_INTL),
  name: 'Jerry',
} as const

export const site = {
  title: 'Mary & Emmanuel · 12.12.2026',
  description:
    "You're invited! We're getting married on Saturday 12 December 2026 at Didi Park & Lounge, Kaduna, and we'd love you there.",
  hashtag: '#EJM26',
  credit: {
    before: 'Made with love by ',
    name: 'Letscr8t Studio',
    url: 'https://www.letscr8t.digital',
  },
  skipToContent: 'Skip to content',
} as const

export const couple = {
  bride: 'Mary',
  brideFullName: 'Mary Onyinoyi Audu',
  groom: 'Emmanuel',
  groomSurname: '[surname]',
  amp: '&',
  monogram: { first: 'M', amp: '&', second: 'E', label: 'Mary & Emmanuel' },
} as const

export const event = {
  weekday: 'Saturday',
  dateLong: 'Saturday, 12 December 2026',
  dateDots: '12 · 12 · 2026',
  dateShort: 'Sat 12 Dec',
  city: 'Kaduna',
  countdownTarget: '2026-12-12T09:00:00+01:00',
  calendarTitle: "Mary & Emmanuel's Wedding",
  calendarStart: '20261212',
  calendarEnd: '20261213',
  calendarLocation: 'Didi Park & Lounge, 5 Kachia Road, Barnawa, Kaduna 800282',
  icsFile: 'mary-and-emmanuel.ics',
  googleCalendarUrl:
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mary+%26+Emmanuel%27s+Wedding&dates=20261212/20261213&location=Didi+Park+and+Lounge,+5+Kachia+Road,+Barnawa,+Kaduna',
} as const

export const venue = {
  name: 'Didi Park & Lounge',
  area: 'Kaduna South',
  address: '5 Kachia Road, Barnawa, Kaduna 800282, Kaduna State',
  addressShort: '5 Kachia Road, Barnawa, Kaduna 800282',
  landmarks: ['Opposite Kalapazi Barracks', 'Behind Enyo Filling Station'],
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Didi+Park+and+Lounge+5+Kachia+Road+Barnawa+Kaduna',
  map: { road: 'Kachia Road', station: 'Enyo Station', barracks: 'Kalapazi Barracks' },
} as const

export const nav = {
  homeLabel: 'Mary & Emmanuel, back to top',
  menuLabel: 'Main',
  links: [
    { href: '#story', label: 'Our story' },
    { href: '#day', label: 'The day' },
    { href: '#colours', label: 'Colours' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#gift', label: 'Gift' },
  ],
  rsvp: { href: '#rsvp', label: 'RSVP' },
} as const

export const hero = {
  eyebrow: 'Together with our families',
  line: 'request the honour of your presence as we become one, before God and all who love us.',
  dateLabel: event.weekday,
  date: event.dateDots,
  placeLabel: event.city,
  place: venue.name,
  photo: {
    src: `${MEDIA}/hero-couple-ring.webp`,
    width: 720,
    height: 1280,
    alt: 'Emmanuel holding Mary’s hand as they look at her engagement ring',
    label: 'Couple portrait',
  } satisfies Photo,
  seal: { script: 'Save', caption: 'the date' },
} as const

export const countdown = {
  label: 'Until we say “I do”',
  regionLabel: 'Countdown',
  units: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
  addToCalendar: 'Add to calendar',
  ics: 'Apple / Outlook',
} as const

export const scripture = {
  text: [
    { em: 'He who finds a wife' },
    ' finds a good thing, and obtains ',
    { em: 'favour' },
    ' from the Lord.',
  ] satisfies Rich,
  reference: 'Proverbs 18 : 22',
  referenceShort: 'Proverbs 18:22',
} as const

export const story = {
  heading: { roman: 'Our', italic: 'story' } satisfies Heading,
  intro: 'Three chapters, one love. A little of how we got here.',
  chapters: [
    {
      number: 'Chapter one',
      title: 'The first hello',
      body: 'It was a beautiful, sunny Sunday in 2021, at a gas station in Osapa London, Lekki, when I saw this pretty damsel. I walked up to her like I was controlled by the power of her beauty, and we left with each other’s numbers.',
      tone: 'sage-200',
      photo: {
        src: `${MEDIA}/story-ch1-first-hello.webp`,
        width: 960,
        height: 1280,
        alt: 'Mary and Emmanuel smiling together beside a car, in matching beige trousers',
        label: 'Photo · 2021',
      },
    },
    {
      number: 'Chapter two',
      title: 'The question',
      body: 'After a period of waiting on the Lord, I knew without a doubt that Mary was bone of my bone and flesh of my flesh. Then, on 7 November 2026, the day after her birthday, I went down on one knee and asked her to be my wife. She said yes, and our forever began.',
      tone: 'sage-300',
      photo: {
        src: `${MEDIA}/story-ch2-proposal-night.webp`,
        width: 662,
        height: 1241,
        alt: 'Emmanuel and Mary holding hands and smiling on the night of the proposal, rose petals at their feet',
        label: 'Photo · the proposal',
      },
    },
    {
      number: 'Chapter three',
      title: 'Forever, in Kaduna',
      body: 'On the twelfth of December we begin the rest of our lives, and we want you there.',
      tone: 'sage-150',
      photo: {
        src: `${MEDIA}/gallery-pre-wedding-02-square.webp`,
        width: 1000,
        height: 1000,
        alt: 'Emmanuel in a cream suit, from the pre-wedding shoot',
        label: 'Photo · pre-wedding',
        pair: {
          src: `${MEDIA}/story-ch3-pre-wedding.webp`,
          alt: 'Mary in a wine suit, seated, from the pre-wedding shoot',
        },
      },
    },
  ] satisfies readonly { number: string; title: string; body: string; tone: Tone; photo: Photo }[],
} as const

export const day = {
  heading: { roman: 'The', italic: 'day' } satisfies Heading,
  scheduleTitle: `Order of the day · ${event.dateShort}`,
  schedule: [
    {
      time: '8:30 am',
      title: 'Guests arrive',
      note: 'Find your seat in the garden at Didi Park & Lounge',
    },
    { time: '9:00 am', title: 'Holy Matrimony', note: 'Our white wedding, in the garden' },
    {
      time: '[Time]',
      title: 'Reception',
      note: 'Same garden: grand entrance, toasts, dinner & first dance',
    },
    { time: 'Late', title: 'Dance till dawn', note: 'Bring your dancing shoes' },
  ],
  venueEyebrow: 'The venue',
  directions: 'Get directions',
  lost: {
    label: 'Lost? WhatsApp us',
    href: whatsappLink(PHONE_INTL, "Hi, please share directions to Mary & Emmanuel's wedding"),
  },
} as const

export const colours = {
  heading: { roman: 'Colours', italic: 'of the day' } satisfies Heading,
  intro: "Come dressed in pale green, crisp white, or both. Let's fill Didi Park with a garden.",
  dress: [
    { who: 'Ladies', what: 'Pale green or white gowns, gele welcome' },
    { who: 'Gentlemen', what: 'White kaftan or agbada with a touch of green' },
  ],
  swatches: [
    { name: 'Pale green', hex: '#C8D5BE' },
    { name: 'White', hex: '#FFFFFF' },
  ],
} as const

export const gallery = {
  heading: { roman: 'Moments', italic: 'so far' } satisfies Heading,
  filterLabel: 'Filter gallery',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'photo', label: 'Photos' },
    { id: 'video', label: 'Films' },
  ],
  // Order + spans tile flush at 2 columns (phones) and 4 columns (desktop):
  // [ring ][  film  ][suit ]
  // [ring ][  film  ][hands]
  // [cake ][ behind ][look ]
  items: [
    {
      id: 'ring',
      kind: 'photo',
      label: 'Proposal night',
      alt: 'Emmanuel holding Mary’s hand, her engagement ring catching the light',
      tone: 'sage-200',
      rows: 4,
      cols: 1,
      src: `${MEDIA}/gallery-engagement-tall.webp`,
      width: 691,
      height: 1280,
      loop: null,
      videoUrl: null,
      videoPoster: null,
    },
    {
      id: 'film',
      kind: 'video',
      label: 'Engagement film',
      alt: 'Our engagement film: the set-up, the proposal on one knee, the ring and the hug',
      tone: 'sage-150',
      rows: 4,
      cols: 2,
      src: `${MEDIA}/gallery-engagement-film-tile-loop-poster.jpg`,
      width: 720,
      height: 522,
      loop: `${MEDIA}/gallery-engagement-film-tile-loop.mp4`,
      videoUrl: `${MEDIA}/engagement-film-vertical.mp4`,
      videoPoster: `${MEDIA}/engagement-film-vertical-poster.jpg`,
    },
    {
      id: 'suit',
      kind: 'photo',
      label: 'Pre-wedding',
      alt: 'Emmanuel in a black and gold suit',
      tone: 'sage-100',
      rows: 2,
      cols: 1,
      src: `${MEDIA}/gallery-pre-wedding-03-square.webp`,
      width: 860,
      height: 860,
      loop: null,
      videoUrl: null,
      videoPoster: null,
    },
    {
      id: 'hands',
      kind: 'photo',
      label: 'Proposal night',
      alt: 'Emmanuel and Mary holding hands and smiling, rose petals at their feet',
      tone: 'sage-300',
      rows: 2,
      cols: 1,
      src: `${MEDIA}/story-ch2-proposal-night.webp`,
      width: 662,
      height: 1241,
      focus: '50% 22%',
      loop: null,
      videoUrl: null,
      videoPoster: null,
    },
    {
      id: 'cake',
      kind: 'photo',
      label: 'The cake',
      alt: 'The proposal cake',
      tone: 'sage-400',
      rows: 2,
      cols: 1,
      src: `${MEDIA}/gallery-proposal-cake-square.webp`,
      width: 1000,
      height: 1000,
      loop: null,
      videoUrl: null,
      videoPoster: null,
    },
    {
      id: 'bts',
      kind: 'video',
      label: 'Behind the scenes',
      alt: 'Behind the scenes: candles, petals and the cake being set up for the proposal',
      tone: 'sage-300',
      rows: 2,
      cols: 2,
      src: `${MEDIA}/gallery-behind-the-scenes-loop-poster.jpg`,
      width: 720,
      height: 522,
      loop: `${MEDIA}/gallery-behind-the-scenes-loop.mp4`,
      videoUrl: `${MEDIA}/gallery-behind-the-scenes-loop.mp4`,
      videoPoster: `${MEDIA}/gallery-behind-the-scenes-loop-poster.jpg`,
    },
    {
      id: 'look',
      kind: 'photo',
      label: 'Proposal night',
      alt: 'Emmanuel and Mary looking down at her engagement ring together',
      tone: 'sage-150',
      rows: 2,
      cols: 1,
      src: `${MEDIA}/hero-couple-ring.webp`,
      width: 720,
      height: 1280,
      focus: '50% 30%',
      loop: null,
      videoUrl: null,
      videoPoster: null,
    },
  ] satisfies readonly GalleryItem[],

  videosPending: '[YouTube/Drive links or mp4]',
  shareLine: 'Share your photos on the day with',
  open: (label: string) => `Open ${label}`,
  play: (label: string) => `Play ${label}`,
  lightbox: {
    label: 'Gallery viewer',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    counter: (n: number, total: number) => `${n} / ${total}`,
  },
} as const

export const gift = {
  heading: { roman: 'Bless', italic: 'our new home' } satisfies Heading,
  body: "Your presence is the greatest gift you could give us. If you'd also like to send something, you can give to us directly, from anywhere in the world.",
  bank: 'Providus Bank',
  accountName: couple.brideFullName,
  accountNumber: '6503481739',
  accountNumberDisplay: '6503 481 739',
  copy: 'Copy account number',
  copied: 'Copied ✓',
  copiedAnnouncement: 'Account number copied',
  copyFailed: 'Couldn’t copy. Press and hold the number instead.',
} as const

export const rsvp = {
  heading: { roman: 'Will you', italic: 'be there?' } satisfies Heading,
  intro: 'Kindly respond so we can save you a seat.',
  contactEyebrow: 'Enquiries & RSVP',
  call: 'Call',
  whatsapp: 'WhatsApp',
  form: {
    name: { label: 'Full name', placeholder: 'As it should appear on your seat' },
    phone: { label: 'Phone number', placeholder: '080…' },
    attending: { legend: 'Attending?', yes: 'Joyfully accepts', no: 'Regretfully declines' },
    guests: { label: 'Number of guests', min: 1, max: 4 },
    note: { label: 'A prayer or wish for us' },
    honeypot: 'Leave this field empty',
    submit: 'Send RSVP',
    sending: 'Sending…',
    error: 'Your RSVP didn’t go through. Please try again, or send it on WhatsApp.',
    whatsappFallback: 'Send via WhatsApp instead',
  },
  whatsappMessage: (r: {
    name: string
    phone: string
    attending: 'yes' | 'no'
    guests: number
    note: string
  }) =>
    [
      "RSVP: Mary & Emmanuel's wedding",
      `Name: ${r.name}`,
      r.phone && `Phone: ${r.phone}`,
      `Attending: ${r.attending === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}`,
      r.attending === 'yes' && `Guests: ${r.guests}`,
      r.note && `Message: ${r.note}`,
    ]
      .filter(Boolean)
      .join('\n'),
  whatsappHref: (text: string) => whatsappLink(PHONE_INTL, text),
  thanks: {
    script: 'Thank you',
    accepts: (first: string) => `We can’t wait to celebrate with you${first ? `, ${first}` : ''}.`,
    declines: (first: string) =>
      `We’ll miss you${first ? `, ${first}` : ''}. Thank you for letting us know.`,
    edit: 'Edit response',
  },
} as const

export const faq = {
  heading: { roman: 'Good to', italic: 'know' } satisfies Heading,
  items: [
    {
      q: 'What time does it start?',
      a: 'Our white wedding starts at 9:00 am in the garden at Didi Park & Lounge, and the reception follows in the same garden, so there’s no moving between venues. Please arrive 30 minutes early so you’re seated before Mary walks down the aisle.',
    },
    {
      q: 'Can I bring a plus-one?',
      a: 'Yes, you’re welcome to. Just make sure your RSVP includes everyone coming with you, so we can save a seat for each of them.',
    },
    {
      q: 'Is there parking at the venue?',
      a: 'Yes, there’s parking at the venue. Didi Park & Lounge sits on Kachia Road, opposite Kalapazi Barracks and behind Enyo Filling Station.',
    },
    {
      q: 'Where do guests from outside Kaduna stay?',
      a: 'Please RSVP and let us know you’re travelling in. We’ll share hotel details and recommendations with you directly.',
    },
    {
      q: 'Can I take photos?',
      a: `Please do, and post them with ${site.hashtag} so we can relive the day through your eyes.`,
    },
  ],
} as const

export const footer = {
  line: `${event.dateLong} · ${venue.name}, ${event.city}`,
  hashtag: site.hashtag,
  credit: site.credit,
} as const

export const share = {
  eyebrow: hero.eyebrow,
  cardLine: 'request the honour of your presence at our wedding',
  dateShort: '12.12.26',
  weekday: event.weekday,
  city: event.city,
  venue: venue.name,
  addressLines: ['Didi Park & Lounge, 5 Kachia Road, Barnawa', 'opposite Kalapazi Barracks'],
  colours: 'Pale green & white',
  rsvp: `RSVP ${contact.phoneDisplay}`,
  seal: hero.seal,
  date: event.dateDots,
  guestMessage: (name: string, link: string) =>
    `Dear ${name}, we're getting married and we'd love you to celebrate with us on ${event.dateLong} at ${venue.name}, ${event.city}.\n\nOpen your invitation: ${link}\n\nWith love,\nMary & Emmanuel`,
} as const

export const music = {
  src: `${MEDIA}/engagement-film-score.mp3`,
  label: 'Music',
  play: 'Play music',
  pause: 'Pause music',
} as const

export const intro = {
  greetingPrefix: 'Dear',
  defaultGuest: 'Guest',
  invited: 'you’re invited',
  cardEyebrow: 'Join us for the wedding of',
  cardDate: `${event.dateDots} · ${event.city}`,
  tapHint: 'Tap the seal to open',
  openLabel: 'Open the invitation',
  enter: 'Enter our wedding',
  skip: 'Skip',
  verse: scripture.referenceShort,
} as const
