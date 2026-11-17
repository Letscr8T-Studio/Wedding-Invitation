import { LazyMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
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

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  const siteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = siteRef.current
    if (!el) return
    if (showIntro) el.setAttribute('inert', '')
    else el.removeAttribute('inert')
  }, [showIntro])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {showIntro && <Envelope onDone={() => setShowIntro(false)} />}
      <div ref={siteRef} className="overflow-x-clip">
        <a
          href="#main"
          className="sr-only rounded-full bg-forest-900 px-5 py-3 text-xs tracking-[0.22em] text-ivory uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {site.skipToContent}
        </a>
        <Nav />
        <main id="main">
          <Hero />
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
      </div>
    </LazyMotion>
  )
}
