import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './config'
import { getStorage } from 'firebase/storage'

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage()
