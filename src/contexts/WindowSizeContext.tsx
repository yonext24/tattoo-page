/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
import { type ReactNode, createContext, useEffect, useState } from 'react'

interface WindowContextType {
  isMobile: boolean | null
}

export const WindowSizeContext = createContext<WindowContextType | undefined>(
  undefined
)

export const WindowSizeContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsMobile(window.innerWidth <= 630)

    const handleResize = (e: Event) => {
      const target = e.target as Window

      if (target.innerWidth <= 630 && !Boolean(isMobile)) setIsMobile(true)
      else if (target.innerWidth > 630 && !Boolean(isMobile)) setIsMobile(false)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <WindowSizeContext.Provider value={{ isMobile }}>
      {children}
    </WindowSizeContext.Provider>
  )
}
