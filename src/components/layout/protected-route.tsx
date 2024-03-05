/* eslint-disable react-hooks/exhaustive-deps */
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter()

  const admin = useUser()

  useEffect(() => {
    if (admin === false) void router.replace('/')
  }, [admin])

  // eslint-disable-next-line no-extra-boolean-cast
  if (!Boolean(admin)) return null

  return <>{children}</>
}
