import { LazyMotion } from 'motion/react'
import { Foundations } from './dev/Foundations'

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <Foundations />
    </LazyMotion>
  )
}
