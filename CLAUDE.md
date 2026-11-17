# Mary & Emmanuel — Wedding Website

A one-page wedding invitation website for **Mary & Emmanuel**, Saturday **12 December 2026**, at **Didi Park & Lounge, Kaduna**.
Built by Letscr8t Studio. Guests will mostly open it **on phones, from a WhatsApp link**, often on slow mobile data in Nigeria. Design for that first.

## Read these before writing code
1. `docs/DESIGN_SPEC.md`: the visual system and every section, in order. **This is the source of truth for the look.**
2. `docs/CONTENT.md`: every word, number and link on the site. Mirror it into `src/content.ts`.
3. `docs/BUILD_PLAN.md`: the phases. Work through them in order and tick them off.
4. `design-reference/*.dc.html`: the approved designs as HTML mockups. Read the markup and inline styles for exact sizes, spacing, colours and copy. They use a custom template format (`{{holes}}`, `<sc-for>`, `<sc-if>`, a `DCLogic` class). **Do not copy that format.** Rebuild it as React components.
   - `Main.dc.html` is the full site.
   - `Welcome.dc.html` is the envelope intro (phone).
   - `InviteCard.dc.html` is the 1080×1350 share card. It is also the source for the Open Graph image.

## Stack (do not swap without asking)
- Vite + React 18 + TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/vite`, with design tokens in `@theme` in `src/index.css`
- `motion` (Framer Motion) for the envelope animation and the scroll reveals
- Self-hosted fonts via `@fontsource`: Cormorant Garamond, Jost, Pinyon Script
- No UI kit, no component library, no router (single page + intro overlay)
- Deploy: Vercel (static)

## Folder layout
```
src/
  content.ts          # ALL copy, dates, links, account, FAQs, schedule (single source)
  index.css           # Tailwind import + @theme tokens + base styles
  main.tsx, App.tsx
  components/         # Button, SectionHeading, Sprig (svg), PhotoFrame, Reveal ...
  sections/           # Nav, Hero, Countdown, Scripture, Story, Day, Colours, Gallery, Gift, Rsvp, Faq, Footer
  intro/Envelope.tsx  # envelope intro overlay
  lib/                # countdown hook, clipboard, rsvp submit, guest-name param
public/
  images/             # couple photos (webp), og.png, favicon
```

## Non-negotiable rules
- **Quality bar: a top-tier ("five-figure") designer.** It must not look like a template. Match the reference exactly; when in doubt, add more whitespace and use bigger serif type.
- Colours only from the tokens in DESIGN_SPEC. No gradients, no emoji, no drop-shadow soup, and no cards with coloured left borders.
- Mobile first. Test at 360, 390, 768, 1280 and 1440 px. No horizontal scroll ever.
- Performance: keep the JS for the first screen under 150 KB gzipped. Use WebP images with `loading="lazy"` (except the hero) and explicit width and height. Videos must not autoplay or load until tapped.
- Accessibility: real `<button>` and `<a>`, labels on every input, `aria-label` on icon-only buttons, visible focus, text contrast ≥ 4.5:1, and respect `prefers-reduced-motion`.
- All copy lives in `src/content.ts`. Never hard-code text in components.
- Placeholders written like `[Time]` stay visible until the real info arrives. Do not invent facts (times, church name, prices).
- Account number `6503481739` (Providus Bank, Mary Onyinoyi Audu). Show it grouped as `6503 481 739` and copy it **without spaces**.
- Phone `09014214591`. Use `tel:+2349014214591` and `https://wa.me/2349014214591`.

## Commands
- `npm run dev`: local dev
- `npm run build && npm run preview`: production check
- `npm run lint`: must pass before each commit

## Working style
- Do one phase from BUILD_PLAN at a time. At the end of each phase, run the build, summarise what changed, and wait for the go-ahead.
- Small, readable components. Write no comments that restate the code.
- Ask before adding any dependency that isn't listed above.
