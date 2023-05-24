import { useEffect, useRef, useState } from 'react'

interface Props {
  once?: boolean
  rootMargin?: string
}

export function useIntersectionObserver ({ once = true, rootMargin = '1px' }: Props) {
  const [intersecting, setIntersecting] = useState<boolean>(false)

  const fromRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onChange = (entrys: IntersectionObserverEntry[]) => {
      const [el] = entrys

      if (el.isIntersecting) {
        setIntersecting(true)
        if (once) observer.disconnect()
      } else {
        setIntersecting(false)
      }
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin,
      threshold: 0
    })

    fromRef.current !== null && observer.observe(fromRef.current)
    return () => { observer.disconnect() }
  }, [fromRef])

  return { intersecting, fromRef }
}
