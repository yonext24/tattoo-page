import { collection } from 'firebase/firestore'
import { db } from './app'
import { tattooConverter } from '../types/tattoo'
import { designsConverter } from '../types/design'

export const tattoosCollection = collection(db, 'tatuajes-hechos').withConverter(tattooConverter)
export const designsCollection = collection(db, 'designs').withConverter(designsConverter)
