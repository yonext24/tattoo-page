// Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { auth } from './app'
import { designsCollection, tattoosCollection } from './collections'
import { type Tattoo } from '../types/tattoo'

export const iniciarSesion = async (
  password: string,
  email: string
) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const cerrarSesion = async () => {
  await auth.signOut()
}

export const subirArchivo = async (file: File, filename: string | undefined) => {
  const storage = getStorage()
  const tatuajesRef = ref(storage, filename ?? file.name)
  console.log(tatuajesRef)
  return await uploadBytesResumable(tatuajesRef, file)
}

export const getTattoos = async () => {
  return await getDocs(tattoosCollection)
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data()
        return { ...data }
      })
    })
}

export const getSingleTattoo = async (id: string) => {
  const docRef = doc(tattoosCollection, id)
  return await getDoc(docRef)
    .then(doc => {
      if (!doc.exists()) {
        throw new Error('No se encontró el tatuaje.')
      }
      const data = doc.data()
      return { ...data }
    })
}

export const searchTatttoos = async ({ search }: { search: string }): Promise<Tattoo[]> => {
  const tattoos = await getTattoos()

  const parsed = tattoos.filter(({ nombre, estilos, lugar }) => {
    if (nombre.includes(search) || estilos.includes(search) || lugar.includes(search)) return true
    return false
  })

  return parsed
}

export const getDesigns = async () => {
  return await getDocs(designsCollection)
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data()
        return { ...data }
      })
    })
}
