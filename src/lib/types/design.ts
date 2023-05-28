import { type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'

export interface Design {
  id: string
  descripcion: string
  estilos: string[]
  imageUrl: string
  nombre: string
  path: string
  precio: string
  tags: string[]
}

export const designsConverter = {
  toFirestore (design: Design) {
    return { ...design }
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
