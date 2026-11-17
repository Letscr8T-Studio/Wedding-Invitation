import { useSyncExternalStore } from 'react'
import { music } from '../content'
import { cx } from '../lib/cx'
import { backgroundMusic } from '../lib/music'

export function MusicToggle() {
  const playing = useSyncExternalStore(backgroundMusic.subscribe, backgroundMusic.isPlaying)

  return (
    <button
      type="button"
      onClick={backgroundMusic.toggle}
      aria-label={playing ? music.pause : music.play}
      className="fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-hairline-dark surface-dark py-0 pr-4 pl-3.5 text-[11px] font-normal tracking-[0.24em] uppercase shadow-seal transition-colors hover:border-sage-200"
    >
      <span aria-hidden="true" className="flex h-3.5 items-end gap-[3px]">
        {[6, 11, 8].map((restHeight, i) => (
          <span
            key={i}
            className={cx('w-[2px] rounded-full bg-sage-200', playing && 'music-bar')}
            style={
              playing ? { animationDelay: `${i * 0.18}s` } : { height: restHeight, opacity: 0.55 }
            }
          />
        ))}
      </span>
      {music.label}
    </button>
  )
}
