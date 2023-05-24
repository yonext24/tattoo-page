import { ModalContext } from '@/contexts/ModalContext'
import { useContext } from 'react'

export function useModalContext () {
  const context = useContext(ModalContext)

  if (context == null) {
    return null
  }

  const { state, dispatch } = context

  return { state, dispatch }
}
