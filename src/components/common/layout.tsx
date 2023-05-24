/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-unknown-property */
import dynamic from 'next/dynamic'
import { Suspense, type ReactNode } from 'react'
import { Poppins, Racing_Sans_One } from 'next/font/google'
import { useWindowContext } from '@/hooks/useWindowContext'

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

const WideNavbar = dynamic(async (): Promise<React.ComponentType> => await import('@/components/navbar/navbar-wide').then(module => module.default),
  { ssr: false })
const MobileNavbar = dynamic(async (): Promise<React.ComponentType> => await import('@/components/navbar/navbar-mobile').then(module => module.default),
  { ssr: false })

export function Layout ({ children }: { children: ReactNode }) {
  const { isMobile } = useWindowContext() ?? {}

  return <>
    <div className={`flex h-full w-full ${Boolean(isMobile) ? 'flex-col' : ''} ${poppins.variable} ${titleFont.variable}`}>
      {
        isMobile === null
          ? null
          : Boolean(isMobile)
            ? (
              <Suspense fallback={<div className='fixed z-100 bg-black top-0 left-0 w-screen h-screen flex justify-center items-center'></div>}>
                <MobileNavbar />
              </Suspense>
              )
            : (
              <Suspense fallback={<div className='fixed z-100 bg-black top-0 left-0 w-screen h-screen flex justify-center items-center'></div>}>
                <WideNavbar />
              </Suspense>
              )
      }
      {children}
      {
        isMobile === null && <div className='fixed z-100 bg-black top-0 left-0 w-screen h-screen flex justify-center items-center'></div>
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
