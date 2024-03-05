import { onAuthStateChanged } from '@/lib/firebase/utils'
import { User } from 'firebase/auth'
import { useState, useEffect } from 'react'

export const USER_POSSIBLE_STATES = {
  NOT_LOGGED: false,
  NOT_KNOWN: undefined
} as const

export interface AppUser extends User {
  isAdmin: boolean
}

export default function useUser() {
  const [user, setUser] = useState<
    | AppUser
    | typeof USER_POSSIBLE_STATES.NOT_KNOWN
    | typeof USER_POSSIBLE_STATES.NOT_LOGGED
  >(USER_POSSIBLE_STATES.NOT_KNOWN)

  const setState = (user: AppUser | typeof USER_POSSIBLE_STATES.NOT_LOGGED) => {
    setUser(user)
  }

  useEffect(() => {
    onAuthStateChanged(setState)
  }, [])

  return user
}
