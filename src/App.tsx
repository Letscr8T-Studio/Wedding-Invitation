import { domAnimation, LazyMotion } from 'motion/react'
import { startTransition, useEffect, useRef, useState } from 'react'
import { MusicToggle } from './components/MusicToggle'
import { site } from './content'
import { Envelope } from './intro/Envelope'
import { shouldShowIntro } from './lib/intro'
import { Colours } from './sections/Colours'
import { Countdown } from './sections/Countdown'
import { Day } from './sections/Day'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Gallery } from './sections/Gallery'
import { Gift } from './sections/Gift'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'
import { Rsvp } from './sections/Rsvp'
import { Scripture } from './sections/Scripture'
import { Story } from './sections/Story'

function Site({ heroReady }: { heroReady: boolean }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-forest-900 px-5 py-3 text-xs tracking-[0.22em] text-ivory uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        {site.skipToContent}
      </a>
      <Nav />
      <main id="main">
        <Hero ready={heroReady} />
        <Countdown />
        <Scripture />
        <Story />
        <Day />
        <Colours />
        <Gallery />
        <Gift />
        <Rsvp />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  // With the intro up, paint the envelope first and build the site behind it in an
  // interruptible transition, so a slow phone isn't blocked rendering 12 sections at once.
  const [siteMounted, setSiteMounted] = useState(!showIntro)
  const siteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (siteMounted) return
    const frame = requestAnimationFrame(() => {
      window.setTimeout(() => startTransition(() => setSiteMounted(true)), 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [siteMounted])

  useEffect(() => {
    const el = siteRef.current
    if (!el) return
    if (showIntro) el.setAttribute('inert', '')
    else el.removeAttribute('inert')
  }, [showIntro, siteMounted])

  const closeIntro = () => {
    setSiteMounted(true)
    setShowIntro(false)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      {showIntro && <Envelope onDone={closeIntro} />}
      <div ref={siteRef} className="overflow-x-clip">
        {siteMounted && <Site heroReady={!showIntro} />}
      </div>
      {!showIntro && <MusicToggle />}
    </LazyMotion>
  )
}
