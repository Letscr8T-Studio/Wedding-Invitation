// Renders share.html to PNGs (OG image, invite card, icons) using the installed Chrome.
// Usage: npm run share        (set CHROME_PATH if Chrome/Edge isn't found automatically)
import { execSync, spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'vite'

const JOBS = [
  { format: 'og', width: 1200, height: 630, out: 'public/og.png' },
  { format: 'card', width: 1080, height: 1350, out: 'public/invite-card.png' },
  { format: 'icon', width: 180, height: 180, out: 'public/apple-touch-icon.png' },
  { format: 'icon', width: 48, height: 48, out: 'public/favicon-48.png' },
]
const VITE_PORT = 5199
const DEBUG_PORT = 9335

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ]
  const found = candidates.find((p) => p && existsSync(p))
  if (found) return found
  for (const bin of ['google-chrome', 'chromium', 'chromium-browser']) {
    try {
      return execSync(`command -v ${bin}`, { encoding: 'utf8' }).trim()
    } catch {
      // try the next one
    }
  }
  throw new Error('Chrome not found. Set CHROME_PATH to your Chrome or Edge executable.')
}

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()
      const page = targets.find((t) => t.type === 'page')
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl)
        await new Promise((resolve, reject) => {
          ws.addEventListener('open', resolve)
          ws.addEventListener('error', reject)
        })
        let id = 0
        const pending = new Map()
        ws.addEventListener('message', (e) => {
          const msg = JSON.parse(e.data)
          if (msg.id && pending.has(msg.id)) {
            pending.get(msg.id)(msg)
            pending.delete(msg.id)
          }
        })
        const send = (method, params = {}) =>
          new Promise((resolve) => {
            const mid = ++id
            pending.set(mid, resolve)
            ws.send(JSON.stringify({ id: mid, method, params }))
          })
        return { ws, send }
      }
    } catch {
      // Chrome not ready yet
    }
    await sleep(200)
  }
  throw new Error('Could not connect to Chrome')
}

const server = await createServer({
  server: { port: VITE_PORT, strictPort: true },
  logLevel: 'warn',
})
await server.listen()

const profile = mkdtempSync(join(tmpdir(), 'share-render-'))
const chrome = spawn(
  findChrome(),
  [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    '--hide-scrollbars',
    '--no-first-run',
    '--force-color-profile=srgb',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

try {
  const { ws, send } = await connect()
  await send('Page.enable')
  for (const job of JOBS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: job.width,
      height: job.height,
      deviceScaleFactor: 1,
      mobile: false,
    })
    const url = `http://localhost:${VITE_PORT}/share.html?format=${job.format}&size=${job.width}`
    await send('Page.navigate', { url })
    let ready = false
    for (let i = 0; i < 100 && !ready; i++) {
      await sleep(100)
      const res = await send('Runtime.evaluate', {
        expression: 'document.body?.dataset.ready === "1"',
        returnByValue: true,
      })
      ready = res.result?.result?.value === true
    }
    if (!ready) throw new Error(`Timed out rendering ${job.format}`)
    await sleep(250)
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: job.width, height: job.height, scale: 1 },
    })
    writeFileSync(job.out, Buffer.from(shot.result.data, 'base64'))
    console.log(`✓ ${job.out} (${job.width}×${job.height})`)
  }
  ws.close()
} finally {
  chrome.kill()
  await server.close()
  await sleep(500)
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    // Chrome may still hold the temp profile on Windows; the OS cleans tmp eventually
  }
}
