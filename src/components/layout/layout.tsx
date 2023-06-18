/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-unknown-property */
import dynamic from 'next/dynamic'
import { useRef, type ReactNode, useEffect, useState } from 'react'
import { Poppins, Racing_Sans_One } from 'next/font/google'
import { useWindowContext } from '@/hooks/useWindowContext'
import { NavMobFallback } from '../fallbacks/nav-mob-fallback'
import { NavWideFallback } from '../fallbacks/nav-wide-fallback'
import { useRouter } from 'next/router'

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
  { loading: () => <NavWideFallback /> })
const MobileHeader = dynamic(async (): Promise<React.ComponentType> => await import('@/components/navbar/header-mobile').then(module => module.default),
  { loading: () => <NavMobFallback /> })

export function Layout ({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [percentage, setPercentage] = useState<number>(0)

  const { isMobile } = useWindowContext() ?? {}
  const router = useRouter()

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let completeTimeout: ReturnType<typeof setInterval> | undefined
    const handleStart = (url: string) => {
      setLoading(true)
      if (loaderRef.current !== null) {
        loaderRef.current.style.transition = 'width .2s ease'
      }
    }

    const handleComplete = (url: string) => {
      setLoading(false)
      setPercentage(100)
      completeTimeout = setTimeout(() => {
        if (loaderRef.current !== null) {
          loaderRef.current.style.transition = 'none'
        }
        setPercentage(0)
      }, 600)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => { clearTimeout(completeTimeout) }
  }, [])

  useEffect(() => {
    if (loading) {
      setPercentage(0)

      intervalRef.current = setInterval(() => {
        const randomNum = Math.random() * 15
        setPercentage(prev => {
          if (prev + randomNum <= 100) return prev + randomNum
          else return 100
        })
      }, 500)
      return
    }

    clearInterval(intervalRef.current)

    return () => { clearInterval(intervalRef.current) }
  }, [loading])

  return <>
    <div className={`flex flex-row-reverse relative h-full w-full [&>main]:overflow-x-hidden ${Boolean(isMobile) ? 'flex-col-reverse' : ''} ${poppins.variable} ${titleFont.variable}`}>
      <div id='pageLoader' className='fixed top-0 left-0 h-[4px] bg-white transition-[width_.2s_ease]' style={{ width: `${percentage}%` }} ref={loaderRef}></div>
      {children}

      {
        isMobile === null
          ? <div className='fixed z-100 bg-black top-0 left-0 w-screen h-screen flex justify-center items-center'></div>
          : Boolean(isMobile)
            ? <MobileHeader />
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
