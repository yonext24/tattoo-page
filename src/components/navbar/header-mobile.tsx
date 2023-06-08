import { useState } from 'react'
import { NavButtonMobile } from './nav-button-mobile'
import { NavbarMobile } from './navbar-mobile'
import Link from 'next/link'

export default function HeaderMobile () {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  const closeModal = () => { setIsNavOpen(false) }

  return <>
    <div className='w-full h-14 flex justify-between px-6 items-center border-b border-white'>

      <NavButtonMobile handleOpen={() => { setIsNavOpen(true) }} />

      <Link href='/'>
        <h2 className='title text-end text-2xl'>Neptuno Black <span className='font-[inherit] max-[345px]:hidden'>Tatuajes</span></h2>
      </Link>

    </div>
    {
      isNavOpen
        ? <NavbarMobile closeModal={closeModal} />
        : null
    }
  </>
}
