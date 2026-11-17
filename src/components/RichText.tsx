import type { Rich } from '../content'

export function RichText({ value, emClassName }: { value: Rich; emClassName?: string }) {
  return value.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <em key={i} className={emClassName ?? 'italic'}>
        {part.em}
      </em>
    ),
  )
}
