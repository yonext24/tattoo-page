import { navEntrys } from '@/lib/navEntrys'
import { useEffect, useState } from 'react'
import { NavEntryMobile } from './nav-entry-mobile'
import { useRouter } from 'next/router'
import CloseIcon from '../icons/close-icon'

interface Props {
  closeModal: () => void
}

export function NavbarMobile ({ closeModal }: Props) {
  const [isAnimating, setIsAnimating] = useState<boolean>(true)

  useEffect(() => {
    setIsAnimating(false)
  }, [])

  const router = useRouter()

  return <div id='modalBackground' className='fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-md flex'>
    <div className='absolute top-0 left-0 flex p-4 justify-between w-full'>
      <button onClick={closeModal}>
        <CloseIcon className='h-8 w-8' />
      </button>
      <h3 className='title text-xl'>Neptuno Black Tattoos</h3>
    </div>
    <nav className='w-max m-auto'>
      <ul className='flex flex-col m-auto gap-y-2'>
        {
          navEntrys.map((el, i) => <NavEntryMobile key={el.name} name={el.name} url={el.url} isCurrentPage={router.pathname === el.url} isAnimating={isAnimating} transitionDelay={`${i * 70}ms`} closeModal={closeModal} />)
        }

      </ul>
    </nav>
  </div>
}
