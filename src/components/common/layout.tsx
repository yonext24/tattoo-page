/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-unknown-property */
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'
import { Poppins, Racing_Sans_One } from 'next/font/google'
import { useWindowContext } from '@/hooks/useWindowContext'
import { NavMobFallback } from '../fallbacks/nav-mob-fallback'
import { NavWideFallback } from '../fallbacks/nav-wide-fallback'

const poppins = Poppins({
  weight: ['400', '700', '600'],
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
  display: 'swap',
  variable: '--poppins'
})
const titleFont = Racing_Sans_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--title'
})

const pro = async (res: React.ComponentType): Promise<React.ComponentType> => {
  return await new Promise(resolve => {
    setTimeout(() => { resolve(res) }, 500)
  })
}

const WideNavbar = dynamic(async (): Promise<React.ComponentType> => await import('@/components/navbar/navbar-wide').then(module => module.default).then(pro),
  { ssr: false, loading: () => <NavWideFallback /> })
const MobileNavbar = dynamic(async (): Promise<React.ComponentType> => await import('@/components/navbar/header-mobile').then(module => module.default).then(pro),
  { ssr: false, loading: () => <NavMobFallback /> })

export function Layout ({ children }: { children: ReactNode }) {
  const { isMobile } = useWindowContext() ?? {}

  return <>
    <div className={`flex flex-row-reverse h-full w-full [&>main]:overflow-x-hidden ${Boolean(isMobile) ? 'flex-col-reverse' : ''} ${poppins.variable} ${titleFont.variable}`}>
      {children}

      {
        isMobile === null
          ? <div className='fixed z-100 bg-black top-0 left-0 w-screen h-screen flex justify-center items-center'></div>
          : Boolean(isMobile)
            ? <MobileNavbar />
            : <WideNavbar />
      }
    </div>
    <style jsx global>{`
    
      * {
        font-family: var(--poppins)
      }
      .title {
        font-family: var(--title)
      }
    
    `}</style>
  </>
}
