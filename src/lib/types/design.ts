import {
  type QueryDocumentSnapshot,
  type SnapshotOptions
} from 'firebase/firestore'
import { type ImageData } from './tattoo'

export interface DesignImage extends ImageData {}

export interface DesignWithoutId {
  slug: string
  images: {
    original: DesignImage
    extraImages: DesignImage[]
  }
  nombre: string
  descripcion?: string
}

export interface Design extends DesignWithoutId {
  id: string
}

export const designsConverter = {
  toFirestore(design: Design) {
    const { id, ...data } = design
    return { ...data }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const { id } = snapshot
    const data = snapshot.data(options)

    return { id, ...data } as Design
  }
}
