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
}

export type GalleryItem = {
  readonly id: string
  readonly kind: 'photo' | 'video'
  readonly label: string
  readonly alt: string
  readonly tone: Tone
  readonly rows: number
  readonly cols: 1 | 2
  readonly src: string | null
  readonly videoUrl: string | null
}

const PHONE_INTL = '2349014214591'

export const contact = {
  phone: '09014214591',
  phoneDisplay: '0901 421 4591',
  tel: `tel:+${PHONE_INTL}`,
  whatsapp: whatsappLink(PHONE_INTL),
  name: "[Contact person's name]",
} as const

export const site = {
  title: 'Mary & Emmanuel — 12.12.2026',
  description:
    "You're invited to the wedding of Mary & Emmanuel — Saturday 12 December 2026, Didi Park & Lounge, Kaduna.",
  hashtag: '#FoundFavour26',
  credit: 'Made with love by Letscr8t Studio',
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
  countdownTarget: '2026-12-12T10:00:00+01:00',
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
  homeLabel: 'Mary & Emmanuel — back to top',
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
  eyebrow: 'Together with their families',
  line: 'request the honour of your presence as they become one, before God and all who love them.',
  dateLabel: event.weekday,
  date: event.dateDots,
  placeLabel: event.city,
  place: venue.name,
  photo: {
    src: null,
    alt: 'Mary and Emmanuel',
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
      body: '[Where Mary & Emmanuel first met — two or three lines from the couple.]',
      tone: 'sage-200',
      photo: { src: null, alt: 'Mary and Emmanuel when they first met', label: 'Photo · [year]' },
    },
    {
      number: 'Chapter two',
      title: 'The question',
      body: '[How Emmanuel proposed, and what Mary said first.]',
      tone: 'sage-300',
      photo: { src: null, alt: 'The proposal', label: 'Photo · the proposal' },
    },
    {
      number: 'Chapter three',
      title: 'Forever, in Kaduna',
      body: 'On the twelfth of December we begin the rest of our lives — and we want you there.',
      tone: 'sage-150',
      photo: {
        src: null,
        alt: 'Mary and Emmanuel, pre-wedding shoot',
        label: 'Photo · pre-wedding',
      },
    },
  ] satisfies readonly { number: string; title: string; body: string; tone: Tone; photo: Photo }[],
} as const

export const day = {
  heading: { roman: 'The', italic: 'day' } satisfies Heading,
  scheduleTitle: `Order of the day · ${event.dateShort}`,
  schedule: [
    { time: '[Time]', title: 'Holy Matrimony', note: '[Church & time to confirm]' },
    {
      time: '[Time]',
      title: 'Guests arrive',
      note: 'Didi Park & Lounge — welcome drinks in the garden',
    },
    { time: '[Time]', title: 'Reception', note: 'Grand entrance, toasts, dinner & first dance' },
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
  intro: "Come dressed in pale green, crisp white — or both. Let's fill Didi Park with a garden.",
  dress: [
    { who: 'Ladies', what: 'Pale green or white gowns, gele welcome' },
    { who: 'Gentlemen', what: 'White kaftan or agbada with a touch of green' },
  ],
  swatches: [
    { name: 'Pale green', hex: '#C8D5BE' },
    { name: 'White', hex: '#FFFFFF' },
  ],
  asoEbi: {
    title: 'Aso-ebi is available',
    details: '[Fabric details & price — from the couple]',
    cta: 'Order yours',
    href: whatsappLink(
      PHONE_INTL,
      "Hi, I'd like to order the aso-ebi for Mary & Emmanuel's wedding",
    ),
  },
} as const

export const gallery = {
  heading: { roman: 'Moments', italic: 'so far' } satisfies Heading,
  filterLabel: 'Filter gallery',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'photo', label: 'Photos' },
    { id: 'video', label: 'Films' },
  ],
  items: [
    {
      id: 'pw1',
      kind: 'photo',
      label: 'Pre-wedding · 01',
      alt: 'Pre-wedding photo',
      tone: 'sage-200',
      rows: 4,
      cols: 1,
      src: null,
      videoUrl: null,
    },
    {
      id: 'eng',
      kind: 'video',
      label: 'Engagement film',
      alt: 'Engagement film',
      tone: 'sage-150',
      rows: 3,
      cols: 2,
      src: null,
      videoUrl: null,
    },
    {
      id: 'pw2',
      kind: 'photo',
      label: 'Pre-wedding · 02',
      alt: 'Pre-wedding photo',
      tone: 'sage-300',
      rows: 2,
      cols: 1,
      src: null,
      videoUrl: null,
    },
    {
      id: 'pw3',
      kind: 'photo',
      label: 'Pre-wedding · 03',
      alt: 'Pre-wedding photo',
      tone: 'sage-100',
      rows: 2,
      cols: 1,
      src: null,
      videoUrl: null,
    },
    {
      id: 'bts',
      kind: 'video',
      label: 'Behind the scenes',
      alt: 'Behind the scenes film',
      tone: 'sage-300',
      rows: 3,
      cols: 2,
      src: null,
      videoUrl: null,
    },
    {
      id: 'intro',
      kind: 'photo',
      label: 'Introduction',
      alt: 'Introduction ceremony',
      tone: 'sage-400',
      rows: 2,
      cols: 1,
      src: null,
      videoUrl: null,
    },
    {
      id: 'pw4',
      kind: 'photo',
      label: 'Pre-wedding · 04',
      alt: 'Pre-wedding photo',
      tone: 'sage-150',
      rows: 2,
      cols: 1,
      src: null,
      videoUrl: null,
    },
  ] satisfies readonly GalleryItem[], // order + spans tile flush at 2 and 4 columns

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
  heading: { roman: 'Bless', italic: 'the couple' } satisfies Heading,
  body: "Your presence is the greatest gift. If you'd also like to bless our new home, you can send a gift directly — from anywhere in the world.",
  bank: 'Providus Bank',
  accountName: couple.brideFullName,
  accountNumber: '6503481739',
  accountNumberDisplay: '6503 481 739',
  copy: 'Copy account number',
  copied: 'Copied ✓',
  copiedAnnouncement: 'Account number copied',
  copyFailed: 'Couldn’t copy — press and hold the number',
} as const

export const rsvp = {
  heading: { roman: 'Will you', italic: 'be there?' } satisfies Heading,
  deadline: {
    before: 'Kindly respond by ',
    date: '[RSVP deadline]',
    after: ' so we can save you a seat.',
  },
  contactEyebrow: 'Enquiries & RSVP',
  call: 'Call',
  whatsapp: 'WhatsApp',
  form: {
    name: { label: 'Full name', placeholder: 'As it should appear on your seat' },
    phone: { label: 'Phone number', placeholder: '080…' },
    attending: { legend: 'Attending?', yes: 'Joyfully accepts', no: 'Regretfully declines' },
    guests: { label: 'Number of guests', min: 1, max: 4 },
    note: { label: 'A prayer or wish for the couple' },
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
      "RSVP — Mary & Emmanuel's wedding",
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
      a: '[Ceremony and reception times — to confirm.] Please arrive 30 minutes early so you are seated before the bride walks in.',
    },
    {
      q: 'Can I bring a plus-one or children?',
      a: '[Policy — to confirm.] Please list everyone coming with you on your RSVP so we can plan seating.',
    },
    {
      q: 'Is there parking at the venue?',
      a: '[On-site parking — confirm with the venue.] Didi Park & Lounge sits on Kachia Road, opposite Kalapazi Barracks and behind Enyo Filling Station.',
    },
    {
      q: 'Where do guests from outside Kaduna stay?',
      a: '[Recommended hotels near Barnawa — to add.]',
    },
    {
      q: 'Can I take photos?',
      a: 'Please do — and post them with #FoundFavour26 so the couple can relive the day through your eyes.',
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
  cardLine: 'request the honour of your presence at their wedding',
  dateShort: '12.12.26',
  weekday: event.weekday,
  city: event.city,
  venue: venue.name,
  addressLines: ['Didi Park & Lounge, 5 Kachia Road, Barnawa', 'opposite Kalapazi Barracks'],
  colours: 'Pale green & white',
  rsvp: `RSVP ${contact.phoneDisplay}`,
  seal: hero.seal,
  date: event.dateDots,
} as const

export const intro = {
  greetingPrefix: 'Dear',
  defaultGuest: 'Guest',
  invited: 'you’re invited',
  cardEyebrow: 'The wedding of',
  cardDate: `${event.dateDots} — ${event.city}`,
  tapHint: 'Tap the seal to open',
  openLabel: 'Open the invitation',
  enter: 'Enter our wedding',
  skip: 'Skip',
  verse: scripture.referenceShort,
} as const
