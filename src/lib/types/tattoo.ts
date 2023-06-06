import { type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'

export interface ImagesData {
  src: string
  width: number
  height: number
  path: string
}

export interface Tattoo {
  id: string
  image: ImagesData
  nombre: string
  descripcion: string
  homeVisible: boolean
  estilos: string[]
  lugar: string
  duracion: string
}

export const newTattooConverter = {
  toFirestore (tattoo: Tattoo) {
    const { id, ...data } = tattoo
    return { ...data }
  },

  fromFirestore (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) {
    const { id } = snapshot
    const data = snapshot.data(options)

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { id, ...data } as Tattoo
  }

}
