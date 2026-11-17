# Design Spec — Mary & Emmanuel

**Direction:** "Garden editorial". It reads like a luxury magazine spread set in a garden. The page relies on very large, light serif type, generous whitespace, pale sage and white, and one deep forest green for weight. Thin botanical line drawings are the only ornament.

Exact pixel values live in `design-reference/Main.dc.html`. This file explains the system and the intent.

---

## 1. Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `ivory` | `#FBFAF5` | page background |
| `white` | `#FFFFFF` | inputs, white swatch |
| `sage-50` | `#F2F5EE` | soft section background ("The day") |
| `sage-100` | `#E3E9DC` | hairlines, borders on light surfaces |
| `sage-150` | `#DCE5D3` | **signature pale green**: scripture band, RSVP band, light buttons on dark |
| `sage-200` | `#C8D5BE` | **"Pale green" colour of the day**, photo placeholders, text on dark |
| `sage-300` | `#B7C9AE` | outlines, rings |
| `sage-400` | `#A9BE9F` | envelope flap, placeholder variety |
| `sage-500` | `#6F8A66` | script "&", botanical strokes |
| `sage-600` | `#5E7556` | accents, link hover, wax seal |
| `forest-700` | `#55634F` | secondary text on light (passes 4.5:1 on ivory and sage-150) |
| `forest-800` | `#3F4D3C` | body text |
| `forest-900` | `#2E3B2C` | headings, dark sections, primary buttons |
| `forest-850` | `#3A4A37` | surfaces on dark (map, card watermark) |

Put these in `@theme` as `--color-*`.

### Type
| Role | Font | Notes |
|---|---|---|
| Display | **Cormorant Garamond** 300/400/500 + italic | headings, names, numbers. Tracking −0.02em on very large sizes. Mix roman and *italic* inside one heading ("Our *story*"). |
| Script | **Pinyon Script** | ONLY for the "&", "Save", "Thank you", and the M&E monogram. Never for sentences. |
| Body / UI | **Jost** 300/400/500 | body 16–17px, line-height 1.7–1.75, weight 300 |
| Eyebrow / labels | Jost 400–500, 11–12px, UPPERCASE, tracking 0.22–0.34em | |

Fluid sizes (use `clamp`):
- Hero names: `clamp(72px, 10vw, 156px)`, line-height 0.86
- Section H2: `clamp(48px, 6vw, 88px)`, line-height 0.95
- Scripture quote: `clamp(36px, 5.4vw, 72px)`
- Footer monogram: `clamp(64px, 12vw, 180px)`

### Shape and space
- Container max-width 1280px, side padding 32px (20px under 400px)
- Section vertical padding `clamp(80px, 10vw, 140px)`
- Radius: pills `999px`, cards 6–8px, photos 4px, arch photo `999px 999px 24px 24px`, bank card 20px
- Buttons: pill, min-height 44–54px, uppercase Jost 12px with 0.2em tracking
- Hairline dividers: 1px `sage-100`/`#D5DECD`

### Motion (`motion` library)
- Scroll reveal: fade + 24px rise, 0.8s, `cubic-bezier(.2,.8,.2,1)`, children staggered 0.08s. Run once.
- Hero: names rise word by word on load. The arch photo scales from 1.04 to 1.
- Countdown digits: a soft vertical flip when a number changes.
- Disable all of it under `prefers-reduced-motion`.

### Ornament
- `Sprig` component: a thin stroke (1px, `sage-500`/`sage-600`) botanical line with alternating leaves. See the SVGs in the reference. It is decorative, so use `aria-hidden`.

---

## 2. Envelope intro (first visit)
Reference: `Welcome.dc.html`.

- A full-screen `forest-900` overlay sits above the site, with faint botanical lines in the corners.
- Top: an eyebrow with the guest's name, then *"you're invited"* in italic Cormorant.
  - **Personalised links:** `?to=Aunty%20Grace` shows "DEAR AUNTY GRACE". With no param it shows "DEAR GUEST". Sanitise the value to text only, max 40 characters.
- Centre: the envelope (back `sage-300`, front pocket `sage-200` V-shape, flap `sage-400` triangle) with the M&E wax seal (`sage-600` circle, Pinyon Script).
- Tap the seal: the flap rotates open (rotateX 180°, 0.6s), the card rises out (0.9s, 0.35s delay), and the seal fades. The card shows "JOIN US FOR THE WEDDING OF / Mary & *Emmanuel* / 12 · 12 · 2026 — KADUNA".
- An "Enter our wedding" button appears. It fades the overlay out and unlocks scroll.
- Store `seenIntro` in sessionStorage so a refresh skips the intro. Add a small "Skip" link for returning guests.
- Background music is optional (phase 6): a small mute/unmute pill that starts only after the seal tap.

## 3. Site sections (in order)

1. **Nav**: sticky with an ivory blur background. Left: the "M&E" monogram (the & in Pinyon). Centre: Our story · The day · Colours · Gallery · Gift (hidden under 820px). Right: a dark "RSVP" pill. Links scroll smoothly.
2. **Hero**: two columns that stack on mobile.
   - Left column: the eyebrow "Together with our families", then *Mary*, a script &, and *Emmanuel* in italic. Below that, the italic line "request the honour of your presence…", a hairline, and the date and venue blocks ("SATURDAY / 12 · 12 · 2026" | "KADUNA / Didi Park & Lounge").
   - Right column: the arch-shaped couple photo, with an offset outline arch behind it. A rotated dark circular "Save the date" seal overlaps its bottom-left.
3. **Countdown**: a `forest-900` band. It shows *Until we say "I do"*, a live DD/HH/MM/SS countdown, and an "Add to calendar" outline pill (Google Calendar link; optionally also an .ics download).
4. **Scripture**: a `sage-150` band with a centred sprig, then Proverbs 18:22 in huge light serif, with "He who finds a wife" and "favour" in italic. The reference "PROVERBS 18 : 22" sits below as an eyebrow.
5. **Our story**: the heading plus a short intro, then a 3-column grid of chapters (photo 3:4, an italic "Chapter one", an H3, and a paragraph). **The middle column is offset 64px lower** on desktop.
6. **The day**: a `sage-50` background with two cards.
   - Order of the day: an ivory card listing the time in a 110px column, then the title and a note.
   - Venue: a dark card with a drawn line map (Kachia Road, Enyo Station, Kalapazi Barracks, plus a sage pin). Below the map: the name, the address, landmark chips, and "Get directions" (Google Maps) and "Lost? WhatsApp us" buttons.
7. **Colours of the day**: copy on the left, with "Ladies" and "Gentlemen" lines and a dashed **aso-ebi** box ("Order yours" opens a WhatsApp chat). On the right, two big overlapping circles: Pale green (`#C8D5BE`) and White, offset diagonally.
8. **Gallery**: a `forest-900` band. Heading "Moments *so far*" with filter pills (All / Photos / Films). Below is a dense grid in auto-fill columns with rows of mixed height. Video tiles show a play button and open in a lightbox modal. Photos open in a lightbox with swipe and arrow keys. A hashtag line **#FoundFavour26** sits underneath.
9. **Gift**: copy on the left, "Bless *our new home*". On the right, a **bank card**: forest-900, 1.586 ratio, a large faint "M&E" script watermark, "PROVIDUS BANK", a chip icon, the number `6503 481 739`, "MARY ONYINOYI AUDU", and a "Copy account number" button that changes to "Copied ✓" for 2.2s.
10. **RSVP**: a `sage-150` band.
    - Left: "Will you *be there?*", a deadline line, the contact number, Call and WhatsApp buttons.
    - Right: an ivory form with full name, phone, Attending (two pill toggles, `aria-pressed`), number of guests (1–4), and a prayer or wish for the couple. The submit button reads "Send RSVP".
    - On success the form is replaced by a script "Thank you" plus a personal line using the guest's first name, and an "Edit response" button. Show loading and error states.
11. **Good to know (FAQ)**: a centred heading over an accordion. Each row is a button with `aria-expanded` and a "+" that rotates to "×". Only one row is open at a time.
12. **Footer**: forest-900, the huge M&E monogram, then the date and venue in italic and #FoundFavour26. Below a hairline: "Made with love by Letscr8t Studio".

## 4. Share / SEO
- Title: `Mary & Emmanuel — 12.12.2026`
- Description: `You're invited to the wedding of Mary & Emmanuel — Saturday 12 December 2026, Didi Park & Lounge, Kaduna.`
- **Open Graph image (1200×630)**: a landscape version of `InviteCard.dc.html` showing names, date and pale-green arch. WhatsApp shows it in the link preview, so it matters most.
- Also export the 1080×1350 card as `public/invite-card.png` so the couple can post it to their status.
- Favicon: an M&E monogram on sage.
- `theme-color` `#2E3B2C`.
