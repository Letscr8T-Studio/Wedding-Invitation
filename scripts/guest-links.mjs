// Builds personalised invitation links (?to=Name) from guests.txt into guest-links.csv.
// Usage: npm run links -- https://your-site.vercel.app [guests.txt] [guest-links.csv]
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { share } from '../src/content.ts'
import { sanitizeGuestName } from '../src/lib/guestName.ts'

const [base, input = 'guests.txt', output = 'guest-links.csv'] = process.argv.slice(2)

if (!base || !/^https?:\/\//.test(base)) {
  console.error('Give the site address first, e.g. npm run links -- https://your-site.vercel.app')
  process.exit(1)
}
if (!existsSync(input)) {
  console.error(`${input} not found. Copy guests.example.txt to ${input} and add your guests.`)
  process.exit(1)
}

const site = base.replace(/\/+$/, '')

/** Nigerian numbers to WhatsApp's international format: 0803… / +234803… → 234803… */
function toWhatsAppNumber(raw) {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('234')) return digits
  if (digits.startsWith('0')) return `234${digits.slice(1)}`
  return digits
}

const csvCell = (value) => `"${String(value).replace(/"/g, '""')}"`

const rows = []
const warnings = []
for (const [i, line] of readFileSync(input, 'utf8').split(/\r?\n/).entries()) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const [rawName, rawPhone = ''] = trimmed.split(/\s*,\s*(?=[+\d][\d\s-]*$)/)
  const name = sanitizeGuestName(rawName)
  if (!name) {
    warnings.push(`line ${i + 1}: "${trimmed}" has no usable name, skipped`)
    continue
  }
  if (name !== rawName.trim()) warnings.push(`line ${i + 1}: "${rawName}" will show as "${name}"`)
  const link = `${site}/?to=${encodeURIComponent(name)}`
  const message = share.guestMessage(name, link)
  const phone = toWhatsAppNumber(rawPhone)
  const whatsapp = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : ''
  rows.push([name, link, message, whatsapp])
}

const header = ['Name', 'Invitation link', 'Message to send', 'WhatsApp (tap to send)']
const csv = [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n')
writeFileSync(output, `﻿${csv}\r\n`, 'utf8')

for (const w of warnings) console.warn(`! ${w}`)
console.log(`✓ ${rows.length} links written to ${output}`)
