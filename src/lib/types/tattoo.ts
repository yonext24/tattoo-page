import {
  type QueryDocumentSnapshot,
  type SnapshotOptions
} from 'firebase/firestore'

export type ImageData = {
  width: number
  height: number
  path: string
  src: string
}

export interface TattooWithoutId {
  slug: string
  tags: string[]
  images: {
    original: ImageData
    compressed: ImageData
    extra: ImageData[]
  }
  nombre: string
  descripcion: string
  homeVisible: boolean
  estilos: string[]
}

export type Tattoo = TattooWithoutId & {
  id: string
}

export const newTattooConverter = {
  toFirestore(tattoo: Tattoo) {
    const { id, ...data } = tattoo
    return { ...data }
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const { id } = snapshot
    const data = snapshot.data(options)

    return { id, ...data } as Tattoo
  }
}
