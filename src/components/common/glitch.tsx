import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  text: string
  className?: string
}

export function Glitch ({ children, text, className }: Props) {
  return <div className='relative'>
    {children}
    <span className={`absolute select-none whitespace-nowrap text-gold -z-10 ${className ?? ''}`}>{text}</span>
  </div>
}
