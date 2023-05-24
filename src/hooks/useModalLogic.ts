import { useEffect } from 'react'

interface Props {
  closeModal: () => void
}
export function useModalLogic ({ closeModal }: Props) {
  useEffect(() => {
    const html = document.querySelector('html')
    if (html == null) return
    html.style.overflow = 'hidden'
    html.style.paddingRight = '15px'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    html.addEventListener('keydown', onKeyDown)

    return () => {
      html.removeEventListener('keydown', onKeyDown)
      html.style.overflow = 'auto'
      html.style.paddingRight = '0px'
    }
  })
}
