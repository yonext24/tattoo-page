import { useState } from 'react'
import { NavButtonMobile } from './nav-button-mobile'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { TattooModalFallback } from '../fallbacks/tattoo-modal-fallback'
import { type NavMobileProps } from './navbar-mobile'

const NavbarMobile = dynamic(
  async (): Promise<React.ComponentType<NavMobileProps>> =>
    await import('./navbar-mobile').then((module) => module.default),
  { loading: () => <TattooModalFallback />, ssr: false }
)

export default function HeaderMobile() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  const closeModal = () => {
    setIsNavOpen(false)
  }

  return (
    <>
      <div className="w-full h-14 flex justify-between px-6 items-center border-b border-white mb-px">
        <NavButtonMobile
          handleOpen={() => {
            setIsNavOpen(true)
          }}
        />

        <Link href="/">
          <h2 className="title text-end text-2xl">
            Neptuno Black{' '}
            <span className="font-[inherit] max-[345px]:hidden">Tatuajes</span>
          </h2>
        </Link>
      </div>
      {isNavOpen ? <NavbarMobile closeModal={closeModal} /> : null}
    </>
  )
}
