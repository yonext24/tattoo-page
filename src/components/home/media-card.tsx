import { type CSSProperties } from 'react'
import WhatsappIcon from '../icons/whatsapp-icon'

interface Props {
  name: string
  url: string
  className?: string
  styles?: CSSProperties
  Icon?: React.FC<any>
}

export function MediaCard({
  name,
  url,
  className,
  styles,
  Icon = WhatsappIcon
}: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={styles}
      className={`border border-white flex justify-center transition-all relative overflow-hidden group hover:after:left-0 hover:border-gold hover:text-black
  after:bg-gold after:h-full after:w-full after:absolute after:-left-full after:-z-10 after:pointer-events-none after:transition-all after:ease-in-out after:duration-300 ${className ?? ''}`}
    >
      <span className="title relative z-0 transition-colors text-center">
        {name}
      </span>
      <Icon className="h-5 w-5" />
    </a>
  )
}
