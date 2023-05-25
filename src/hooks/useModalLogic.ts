import { useEffect } from 'react'

interface Props {
  closeModal: () => void
}
export function useModalLogic ({ closeModal }: Props) {
  useEffect(() => {
    const html = document.querySelector('html')
    if (html == null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    html.addEventListener('keydown', onKeyDown)

    return () => {
      html.removeEventListener('keydown', onKeyDown)
    }
  })
}
