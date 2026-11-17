import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Monogram } from '../components/Monogram'
import { nav } from '../content'

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-sage-100 bg-ivory/92 backdrop-blur-[10px]">
      <Container
        as="nav"
        aria-label={nav.menuLabel}
        className="flex items-center justify-between gap-6 py-[18px]"
      >
        <a
          href="#top"
          aria-label={nav.homeLabel}
          className="text-[26px] leading-none tracking-[0.04em] text-forest-900 no-underline transition-colors hover:text-sage-600"
        >
          <Monogram ampClassName="px-1.5 text-2xl text-sage-600" />
        </a>

        <ul className="m-0 hidden list-none gap-8 p-0 min-[820px]:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-2 text-xs font-normal tracking-[0.22em] text-forest-900 uppercase no-underline transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-garden hover:text-sage-600 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href={nav.rsvp.href}>{nav.rsvp.label}</Button>
      </Container>
    </header>
  )
}
