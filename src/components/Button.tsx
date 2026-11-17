import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'

const variants = {
  dark: 'bg-forest-900 text-ivory font-normal hover:bg-forest-800',
  light: 'bg-sage-150 text-forest-900 font-medium hover:bg-ivory',
  ivory: 'bg-ivory text-forest-900 font-medium hover:bg-sage-150',
  'outline-dark':
    'border border-forest-900 text-forest-900 font-normal hover:bg-forest-900 hover:text-ivory',
  'outline-light':
    'border border-sage-200 text-ivory font-normal hover:bg-ivory hover:text-forest-900',
} as const

// Left padding is widened by one letter-space so tracked uppercase text sits optically centred.
const sizes = {
  md: 'min-h-11 pr-[22px] pl-[calc(22px+0.22em)] text-xs tracking-[0.22em]',
  lg: 'min-h-12 pr-6 pl-[calc(24px+0.22em)] text-xs tracking-[0.22em]',
  xl: 'min-h-[54px] pr-8 pl-[calc(32px+0.26em)] text-[13px] tracking-[0.26em]',
} as const

type Common = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type LinkProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & { href: string }

type NativeButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined }

export type ButtonProps = LinkProps | NativeButtonProps

function buttonClasses({
  variant = 'dark',
  size = 'md',
  fullWidth,
  className,
}: Omit<Common, 'children'>) {
  return cx(
    'inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full text-center leading-tight uppercase no-underline transition-colors duration-300 ease-garden select-none',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, fullWidth, className, children, href, ...rest } = props
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={buttonClasses({ variant, size, fullWidth, className })}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  const { variant, size, fullWidth, className, children, type = 'button', ...rest } = props
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </button>
  )
}
