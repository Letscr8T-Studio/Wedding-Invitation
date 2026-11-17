import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { event } from './src/content.ts'
import { buildIcs } from './src/lib/ics.ts'

/** Emits the .ics calendar file and fills %SITE_URL% (absolute URLs for link previews). */
function weddingAssets(): Plugin {
  let siteUrl = ''
  const ics = () =>
    buildIcs({
      uid: `wedding-${event.calendarStart}@maryandemmanuel`,
      title: event.calendarTitle,
      start: event.calendarStart,
      end: event.calendarEnd,
      location: event.calendarLocation,
      stamp: new Date(),
    })

  return {
    name: 'wedding-assets',
    configResolved(config) {
      const env = loadEnv(config.mode, process.cwd(), '')
      const vercel = env.VERCEL_PROJECT_PRODUCTION_URL
      siteUrl = (env.VITE_SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '')
    },
    configureServer(server) {
      server.middlewares.use(`/${event.icsFile}`, (_req, res) => {
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
        res.end(ics())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: event.icsFile, source: ics() })
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), weddingAssets()],
})
