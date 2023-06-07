import { type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'

export interface DesignImage {
  src: string
  path: string
  compressed: {
    src: string
    path: string
  }
}

export interface Design {
  id: string
  image: DesignImage
  nombre: string
  precio: string
}

export const designsConverter = {
  toFirestore (design: Design) {
    const { id, ...data } = design
    return { ...data }
  },
  fromFirestore (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) {
    const { id } = snapshot
    const data = snapshot.data(options)

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { id, ...data } as Design
  }

}
