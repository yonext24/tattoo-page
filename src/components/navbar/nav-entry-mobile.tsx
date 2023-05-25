import Link from 'next/link'
import { Glitch } from '../common/glitch'

interface Props {
  name: string
  url: string
  isCurrentPage: boolean
  isAnimating: boolean
  transitionDelay: string
  closeModal: () => void
}

export function NavEntryMobile ({ name, url, isCurrentPage, isAnimating, transitionDelay, closeModal }: Props) {
  return <Link href={url} onClick={closeModal} style={{ transitionDelay }} className={`relative transition-all duration-200 ${isAnimating ? 'translate-x-1/3 opacity-0' : 'translate-x-0 opacity-100 '}`}>
    <div className={`w-max relative ml-auto p-1 rounded-sm ${isCurrentPage ? 'bg-gold' : ''}`}>
      <Glitch text={name} className={`text-3xl title top-[.17rem] -left-[.15rem] z-1 ${isCurrentPage ? 'text-black/50' : 'text-gold'}`}>
        <h3 className='title text-3xl relative z-2'>{name}</h3>
      </Glitch>
    </div>
  </Link>
}
