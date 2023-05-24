// Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDocs, query, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { auth } from './app'
import { tattoosCollection } from './collections'

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
export const getHomeTattoos = async () => {
  const q = query(tattoosCollection, where('homeVisible', '==', true))

  return await getDocs(q).then(snapshot => {
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return { ...data }
    })
  })
}
