import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  text: string
  className?: string
}

export function Glitch ({ children, text, className }: Props) {
  return <div className='relative z-0'>
    {children}
    <span className={`absolute select-none whitespace-nowrap -z-10 ${className ?? ''}`}>{text}</span>
  </div>
}
