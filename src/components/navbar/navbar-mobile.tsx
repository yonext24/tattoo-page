import { useEffect, useState } from 'react'
import { NavEntryMobile } from './nav-entry-mobile'
import { useRouter } from 'next/router'
import CloseIcon from '../icons/close-icon'
import useUser from '@/hooks/useUser'
import { cerrarSesion } from '@/lib/firebase/utils'
import { Glitch } from '../common/glitch'
import { navEntrys } from '@/lib/consts'

export interface NavMobileProps {
  closeModal: () => void
}

export default function NavbarMobile ({ closeModal }: NavMobileProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(true)

  const admin = useUser()

  const handleClick = () => {
    void cerrarSesion()
  }

  useEffect(() => {
    setIsAnimating(false)
  }, [])

  const router = useRouter()

  return <div id='modalBackground' className='fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-md flex'>
    <div className='absolute top-0 left-0 flex p-4 justify-between w-full'>
      <button name='Cerrar ventana' aria-label='Cerrar ventana' onClick={closeModal}>
        <CloseIcon className='h-8 w-8' />
      </button>
      <h3 className='title text-xl'>Neptuno Black Tattoos</h3>
    </div>
    <nav className='w-max m-auto'>
      <ul className='flex flex-col m-auto gap-y-2'>
        {
          navEntrys.map((el, i) => <NavEntryMobile key={el.name} name={el.name} url={el.url} isCurrentPage={router.pathname === el.url} isAnimating={isAnimating} transitionDelay={`${i * 70}ms`} closeModal={closeModal} />)
        }
        {
          Boolean(admin) && <>
            <NavEntryMobile name='Admin' url='/admin' isCurrentPage={router.pathname === '/admin'} isAnimating={isAnimating} transitionDelay='350ms' closeModal={closeModal} />
            <div onClick={handleClick} style={{ transitionDelay: '420ms' }} className={`relative transition-all duration-200 ${isAnimating ? 'translate-x-1/3 opacity-0' : 'translate-x-0 opacity-100 '}`}>
              <div className={'w-max relative ml-auto p-1 rounded-sm'}>
                <Glitch text='Cerrar Sesión' className='text-3xl title top-[.17rem] -left-[.15rem] z-1 text-gold'>
                  <h3 className='title text-3xl relative z-2'>Cerrar Sesión</h3>
                </Glitch>
              </div>
            </div>
          </>
        }

      </ul>
    </nav>
  </div>
}
