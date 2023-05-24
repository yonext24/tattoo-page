import { collection } from 'firebase/firestore'
import { db } from './app'
import { tattooConverter } from '../types/tattoo'

export const tattoosCollection = collection(db, 'tatuajes-hechos').withConverter(tattooConverter)
