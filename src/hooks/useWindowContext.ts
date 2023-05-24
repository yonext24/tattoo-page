import { WindowSizeContext } from '@/contexts/WindowSizeContext'
import { useContext } from 'react'

export function useWindowContext () {
  const context = useContext(WindowSizeContext)

  if (context == null) {
    return null
  }

  const { isMobile } = context

  return { isMobile }
}
