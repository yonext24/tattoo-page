import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function Outline ({ children, className }: Props) {
  return <div className={`p-1 border-2 border-white mt-2 rounded-lg flex justify-center ${className ?? ''}`}>
    { children }
  </div>
}
