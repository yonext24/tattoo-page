import { collection } from 'firebase/firestore'
import { db } from './app'
import { tattooConverter } from '../types/oldTattoo'
import { designsConverter } from '../types/design'
import { newTattooConverter } from '../types/tattoo'

export const oldTattoosCollection = collection(db, 'tatuajes-hechos').withConverter(tattooConverter)
export const designsCollection = collection(db, 'designs-nuevo').withConverter(designsConverter)
export const tattoosCollection = collection(db, 'tatuajes-nuevo').withConverter(newTattooConverter)
