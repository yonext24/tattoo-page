import { useEffect, useState } from 'react'

export function useFade () {
  const [intersected, setIntersected] = useState(false)

  useEffect(() => { setIntersected(true) }, [])

  return { intersected }
}
