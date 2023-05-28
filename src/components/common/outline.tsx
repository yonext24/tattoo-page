import { type HTMLAttributes, type ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Outline ({ children, ...props }: Props) {
  return <div {...props} className={`p-1 border-2 border-white mt-2 rounded-lg flex justify-center ${props.className ?? ''}`}>
    { children }
  </div>
}
