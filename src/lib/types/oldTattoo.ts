import { type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'

export interface ImagesData {
  original: {
    height: number
    width: number
    path: string
    url: string
    xAxis: number
    yAxis: number
    zoom: string
  }
  preview: {
    height: number
    width: number
    path: string
    url: string
    xAxis: number
    yAxis: number
    zoom: string
  }
}

export interface oldTattoo {
  id: string
  descripcion: string
  duracion: string
  estilos: string[]
  homeVisible: boolean
  imagesData: ImagesData
  lugar: string
  nombre: string
}

export const tattooConverter = {
  toFirestore (tattoo: oldTattoo) {
    return { ...tattoo }
  },
  fromFirestore (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) {
    const { id } = snapshot
    const data = snapshot.data(options)

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { id, ...data } as oldTattoo
  }

}
