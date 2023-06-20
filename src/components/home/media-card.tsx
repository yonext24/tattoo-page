import { type CSSProperties } from 'react'

interface Props {
  name: string
  url: string
  className?: string
  styles?: CSSProperties
}

export function MediaCard ({ name, url, className, styles }: Props) {
  return <a href={url} target="_blank" rel="noopener noreferrer"
  style={styles}
   className={`border border-white flex justify-center transition-all relative overflow-hidden group hover:after:left-0 hover:border-gold
  after:bg-gold after:h-full after:w-full after:absolute after:-left-full after:-z-10 after:pointer-events-none after:transition-all after:ease-in-out after:duration-300 ${className ?? ''}`}>
    <span className="title relative z-0 group-hover:text-black transition-colors text-center">{name}</span>
  </a>
}
