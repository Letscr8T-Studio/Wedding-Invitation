import { Sprig } from '../components/Sprig'
import { couple, share } from '../content'

/** 1080×1350 status card, matching design-reference/InviteCard.dc.html. */
export function InviteCard() {
  return (
    <div className="box-border h-[1350px] w-[1080px] bg-sage-150 p-14 font-sans font-light text-forest-900">
      <div className="relative box-border flex size-full flex-col items-center overflow-hidden rounded-[540px_540px_12px_12px] bg-ivory px-24 pt-[120px] pb-[72px] text-center">
        <div
          aria-hidden="true"
          className="absolute inset-[22px] rounded-[520px_520px_6px_6px] border border-sage-300"
        />

        <Sprig variant="divider-wide" className="relative w-[220px]" />

        <p className="relative mt-9 mb-0 text-[20px] font-normal tracking-[0.36em] text-forest-700 uppercase">
          {share.eyebrow}
        </p>

        <h1 className="relative mt-10 mb-0 font-display leading-[0.88] font-light tracking-[-0.02em]">
          <span className="block text-[172px]">{couple.bride}</span>
          <span className="block font-script text-[110px] leading-[1.05] tracking-normal text-sage-500">
            {couple.amp}
          </span>
          <span className="block text-[172px] italic">{couple.groom}</span>
        </h1>

        <p className="relative mt-11 mb-0 max-w-[720px] font-display text-[34px] leading-[1.35] text-forest-800 italic">
          {share.cardLine}
        </p>

        <div className="relative mt-[52px] flex items-center gap-10">
          <span className="text-[22px] font-normal tracking-[0.3em] uppercase">
            {share.weekday}
          </span>
          <span className="h-20 w-px bg-sage-300" />
          <span className="font-display text-[72px] leading-none font-normal lining-nums">
            {share.dateShort}
          </span>
          <span className="h-20 w-px bg-sage-300" />
          <span className="text-[22px] font-normal tracking-[0.3em] uppercase">{share.city}</span>
        </div>

        <p className="relative mt-11 mb-0 text-[24px] leading-[1.6]">
          {share.addressLines[0]}
          <br />
          {share.addressLines[1]}
        </p>

        <div className="relative mt-auto flex items-center gap-7">
          <span className="inline-flex items-center gap-3.5 text-[20px] font-normal tracking-[0.24em] uppercase">
            <span className="size-[18px] rounded-full border border-sage-400 bg-sage-200" />
            <span className="size-[18px] rounded-full border border-sage-200 bg-white" />
            {share.colours}
          </span>
          <span className="size-1.5 rounded-full bg-sage-500" />
          <span className="text-[20px] font-normal tracking-[0.24em] uppercase lining-nums">
            {share.rsvp}
          </span>
        </div>
      </div>
    </div>
  )
}
