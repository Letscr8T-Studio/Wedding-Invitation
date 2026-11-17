import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { faq } from '../content'
import { cx } from '../lib/cx'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto flex max-w-[920px] flex-col gap-10 px-5 section-y min-[400px]:px-8"
    >
      <SectionHeading
        id="faq-heading"
        heading={faq.heading}
        size="compact"
        className="text-center"
      />
      <div className="border-b border-hairline">
        {faq.items.map((item, i) => {
          const open = openIndex === i
          const buttonId = `faq-q-${i}`
          const panelId = `faq-a-${i}`
          return (
            <div key={item.q} className="border-t border-hairline">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-5 text-left text-forest-900 transition-colors hover:text-sage-600"
                >
                  <span className="font-display text-[clamp(22px,3vw,26px)] leading-[1.2] font-normal">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cx(
                      'inline-block shrink-0 font-display text-[28px] leading-none font-light transition-transform duration-300 ease-garden',
                      open && 'rotate-45',
                    )}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cx(
                  'grid transition-[grid-template-rows,visibility] duration-500 ease-garden motion-reduce:transition-none',
                  open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <p className="m-0 pr-12 pb-7 text-base leading-[1.75] text-forest-800">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
