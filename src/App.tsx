import { LazyMotion } from 'motion/react'
import { site } from './content'
import { Countdown } from './sections/Countdown'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'
import { Scripture } from './sections/Scripture'
import { Story } from './sections/Story'

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="overflow-x-clip">
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
        </main>
      </div>
    </LazyMotion>
  )
}
