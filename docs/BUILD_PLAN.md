# Build Plan

Work one phase at a time. At the end of each phase, run `npm run build`, fix any errors, summarise, and wait for "next".

## Phase 0 — Setup
- [x] Check Node ≥ 20 (`node -v`). If it's missing, tell me how to install it before going on.
- [x] Scaffold **in the current folder** (it already contains CLAUDE.md, docs/ and design-reference/): `npm create vite@latest . -- --template react-ts`. Keep the existing files.
- [x] `npm i motion @fontsource/cormorant-garamond @fontsource/jost @fontsource/pinyon-script`
- [x] `npm i -D tailwindcss @tailwindcss/vite prettier prettier-plugin-tailwindcss`
- [x] Wire `@tailwindcss/vite` into `vite.config.ts`. In `src/index.css`, add `@import "tailwindcss";` and a `@theme` block containing every token from DESIGN_SPEC §1 (colours, `--font-display`, `--font-script`, `--font-sans`).
- [x] Import only the font weights we use (Cormorant 300/400/500 plus 300/400 italic; Jost 300/400/500; Pinyon 400).
- [x] Delete the Vite boilerplate. Add `.prettierrc` and a `lint` script. Run `git init` and make the first commit.
- [x] Set up `index.html` with the title, description, theme-color and OG tags (placeholder image for now).

## Phase 1 — Foundations
- [x] `src/content.ts`: typed, holding everything in CONTENT.md.
- [x] Components: `Container`, `Eyebrow`, `SectionHeading` (roman plus an italic part), `Button` (variants: dark, light, outline-dark, outline-light; renders `<a>` or `<button>`), `Sprig`, `PhotoFrame` (placeholder with a label, or a real image), `Reveal` (motion wrapper, respects reduced motion).
- [x] `lib/useCountdown.ts`, `lib/copy.ts`, `lib/guestName.ts`.

## Phase 2 — Sections, top half
- [x] Nav, Hero, Countdown, Scripture, Story. Match `design-reference/Main.dc.html` closely.
- [x] Check at 360 / 390 / 768 / 1280 / 1440. Nothing may overflow.

## Phase 3 — Sections, bottom half
- [x] The day (schedule and venue map card), Colours (with aso-ebi), Gallery (with filter and lightbox), Gift (bank card and copy), FAQ accordion, Footer.

## Phase 4 — RSVP that actually saves
- [x] Follow `docs/RSVP_SETUP.md`. RSVPs go to a Google Sheet through a Google Apps Script web app (free, and the couple can read the sheet).
- [x] The endpoint URL comes from `VITE_RSVP_ENDPOINT` in `.env.local` (git-ignored). Add a `.env.example`.
- [x] POST as `text/plain` JSON (this avoids a CORS preflight). Show loading, success and error states.
- [x] Error fallback: a "Send via WhatsApp instead" button that opens `wa.me` with the RSVP pre-filled.
- [x] Add a honeypot field against spam.

## Phase 5 — Envelope intro
- [x] `intro/Envelope.tsx` per DESIGN_SPEC §2 and `Welcome.dc.html`: seal tap, flap opens, card rises, then "Enter our wedding".
- [x] `?to=Name` personalisation, sessionStorage skip, Skip link, body scroll lock while open, focus trapped in the overlay.

## Phase 6 — Polish ("the madness")
- [x] Scroll reveals and the hero load animation.
- [x] Optional background music toggle (`/public/media/engagement-film-score.mp3`; plays only after the seal tap; remembers mute; steps aside while the film plays).
- [x] `.ics` download alongside Google Calendar.
- [x] Generate `public/og.png` (1200×630) and `public/invite-card.png` (1080×1350) from the invite design. `npm run share` renders `share.html` with the installed Chrome.
- [x] Favicon and apple-touch-icon (M&E monogram).
- [x] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95. _(92–94 / 100 / 100 / 100)_

## Phase 7 — Real content
- [x] Swap in the couple's photos (supplied pre-graded as WebP in `public/media/`; see `src/maryandemmanuel-media/PLACEMENT.md`). Still missing: introduction-ceremony photos.
- [x] Video loops autoplay only on a good, non-metered connection (posters on mobile data / data-saver / reduced motion); the full film loads only when tapped.
- [ ] Replace every `[placeholder]` in content.ts.
- [ ] `grep -r "\[" src/content.ts` should come back empty before launch.

## Phase 8 — Deploy
- [ ] Push to GitHub and import into Vercel (framework: Vite). Add `VITE_RSVP_ENDPOINT` in the Vercel env settings.
- [ ] Optional custom domain, e.g. `maryandemmanuel.com.ng` or `foundfavour26.com`.
- [ ] Paste the live link into WhatsApp to check that the preview image and title look right.
- [x] Generate personalised links (`?to=Name`) for the couple's guest list: `npm run links -- <site-url>` reads `guests.txt` and writes `guest-links.csv`.
