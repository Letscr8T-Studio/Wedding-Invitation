# Paste this into Claude in VS Code (first message)

---

We're building a wedding invitation website for my friends Mary & Emmanuel (Saturday 12 Dec 2026, Didi Park & Lounge, Kaduna). This folder already contains everything you need:

- `CLAUDE.md`: project rules, stack and quality bar
- `docs/DESIGN_SPEC.md`: the visual system and every section
- `docs/CONTENT.md`: all the copy, links and details
- `docs/BUILD_PLAN.md`: phases 0–8 with checklists
- `docs/RSVP_SETUP.md`: Google Sheet RSVP backend
- `design-reference/*.dc.html`: the approved designs as HTML mockups. Use them for exact sizes, spacing and colours, but rebuild them in React; don't copy their template syntax.

Read all of them first. Then:

1. Give me a short summary of what you understood and anything that looks unclear or contradictory.
2. Start **Phase 0** in this folder: check that Node is installed, scaffold Vite (React + TS) here without deleting the existing docs, install the listed dependencies, set up Tailwind v4 with the design tokens and fonts, and make the first git commit. Run every command yourself and tell me if you need me to install or approve anything.
3. Stop after Phase 0, run `npm run dev`, give me the localhost link, and wait for me to say "next".

The bar is a five-figure designer's work. If something you build looks generic or template-like, redo it before showing me. Match the reference designs closely.

---

## Prompts for later

**Next phase:**
> next. Do Phase N. Before you finish, compare each section against `design-reference/Main.dc.html` at 390px and 1440px and fix anything that doesn't match.

**When something looks off:**
> The [section] doesn't feel premium yet. Compare it to the reference again: check spacing, type size, line-height and alignment. Make it feel like a luxury editorial spread. Show me what you changed.

**When the couple sends real content:**
> Here's the real info: [paste]. Update `src/content.ts`, remove the matching placeholders, then show me any placeholders still left.

**Adding photos:**
> I've put the couple's photos in `/raw-photos`. Write a one-off sharp script to convert them to WebP (1600px long edge, 75% quality) into `public/images/`, then wire them into the hero, story and gallery.

**Deploying:**
> Let's do Phase 8. Walk me through pushing to GitHub and deploying on Vercel step by step, including the RSVP env variable. Then check the WhatsApp link preview tags.
