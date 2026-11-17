import { createRoot } from 'react-dom/client'
import '../index.css'
import { Icon } from './Icon'
import { InviteCard } from './InviteCard'
import { OgImage } from './OgImage'

const params = new URLSearchParams(window.location.search)
const format = params.get('format')
const size = Number(params.get('size') ?? 180)

const view =
  format === 'card' ? <InviteCard /> : format === 'icon' ? <Icon size={size} /> : <OgImage />

createRoot(document.getElementById('root')!).render(view)

window.setTimeout(() => {
  void document.fonts.ready.then(() => {
    document.body.dataset.ready = '1'
  })
}, 100)
