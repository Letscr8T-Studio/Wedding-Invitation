import { Sprig } from '../components/Sprig'
import { couple, share } from '../content'

/**
 * 1200×630 link preview. The names and date sit inside the centre arch so they survive
 * WhatsApp's square thumbnail crop; the side panels add the date and venue at full size.
 */
export function OgImage() {
  return (
    <div className="relative flex h-[630px] w-[1200px] items-end justify-center overflow-hidden bg-sage-150 font-sans font-light text-forest-900">
      <aside className="absolute top-0 bottom-0 left-0 flex w-[350px] flex-col items-center justify-center gap-5">
        <span className="flex size-[150px] -rotate-8 flex-col items-center justify-center rounded-full bg-forest-900 text-ivory">
          <span className="font-script text-[38px] leading-none">{share.seal.script}</span>
          <span className="text-[12px] font-normal tracking-[0.3em] uppercase">
            {share.seal.caption}
          </span>
        </span>
        <span className="mt-3 text-[15px] font-normal tracking-[0.3em] text-forest-700 uppercase">
          {share.weekday}
        </span>
        <span className="font-display text-[40px] leading-none font-normal lining-nums">
          {share.date}
        </span>
      </aside>

      <div className="relative h-[592px] w-[500px] rounded-[250px_250px_0_0] bg-ivory">
        <div
          aria-hidden="true"
          className="absolute inset-x-3.5 top-3.5 bottom-0 rounded-[236px_236px_0_0] border border-b-0 border-sage-300"
        />
        <div className="relative flex h-full flex-col items-center pt-[104px] text-center">
          <Sprig variant="divider-wide" className="w-[150px]" />
          <p className="mt-6 mb-0 text-[13px] font-normal tracking-[0.34em] text-forest-700 uppercase">
            {share.eyebrow}
          </p>
          <h1 className="mt-6 mb-0 font-display leading-[0.86] font-light tracking-[-0.02em]">
            <span className="block text-[112px]">{couple.bride}</span>
            <span className="block font-script text-[66px] leading-[1.05] tracking-normal text-sage-500">
              {couple.amp}
            </span>
            <span className="block text-[112px] italic">{couple.groom}</span>
          </h1>
          <p className="mt-7 mb-0 text-[18px] font-normal tracking-[0.3em] uppercase lining-nums">
            {share.dateShort} · {share.city}
          </p>
        </div>
      </div>

      <aside className="absolute top-0 right-0 bottom-0 flex w-[350px] flex-col items-center justify-center gap-5 text-center">
        <Sprig variant="stem" strokeWidth={1.4} className="w-[96px] text-sage-500" />
        <span className="mt-1 text-[15px] font-normal tracking-[0.3em] text-forest-700 uppercase">
          {share.city}
        </span>
        <span className="font-display text-[36px] leading-[1.1] font-normal">{share.venue}</span>
      </aside>
    </div>
  )
}
