type IcsEvent = {
  uid: string
  title: string
  start: string
  end: string
  location: string
  stamp: Date
}

const escape = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

/** `YYYYMMDD` is an all-day date (end exclusive); `YYYYMMDDTHHMMSSZ` is a UTC time. */
const dateLine = (name: string, value: string) =>
  value.includes('T') ? `${name}:${value}` : `${name};VALUE=DATE:${value}`

/** iCalendar event (RFC 5545). */
export function buildIcs(e: IcsEvent) {
  const stamp = e.stamp
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
  return (
    [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Letscr8t Studio//Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${e.uid}`,
      `DTSTAMP:${stamp}`,
      dateLine('DTSTART', e.start),
      dateLine('DTEND', e.end),
      `SUMMARY:${escape(e.title)}`,
      `LOCATION:${escape(e.location)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n') + '\r\n'
  )
}
