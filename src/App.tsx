const swatches = [
  'ivory',
  'white',
  'sage-50',
  'sage-100',
  'sage-150',
  'sage-200',
  'sage-300',
  'sage-400',
  'sage-500',
  'sage-600',
  'forest-700',
  'forest-800',
  'forest-850',
  'forest-900',
] as const

export default function App() {
  return (
    <main className="mx-auto flex max-w-[1280px] flex-col gap-16 px-5 py-20 min-[400px]:px-8">
      <p className="text-xs font-normal tracking-[0.32em] text-forest-700 uppercase">
        Phase 0 · Token specimen
      </p>

      <h1 className="font-display text-[clamp(72px,10vw,156px)] leading-[0.86] font-light tracking-[-0.02em]">
        <span className="block">Mary</span>
        <span className="block pl-[0.9em] font-script text-[0.55em] leading-[1.1] text-sage-500">
          &amp;
        </span>
        <span className="block italic">Emmanuel</span>
      </h1>

      <p className="max-w-[440px] font-display text-2xl leading-[1.4] text-forest-800 italic">
        Cormorant 300 / 400 / 500 and italics · Jost 300 / 400 / 500 · Pinyon 400
      </p>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {swatches.map((name) => (
          <li key={name} className="flex flex-col gap-2">
            <span
              className="aspect-square rounded-md border border-sage-100"
              style={{ background: `var(--color-${name})` }}
            />
            <span className="text-[11px] font-normal tracking-[0.24em] uppercase">{name}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
