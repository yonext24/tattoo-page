// Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, storage } from './app'
import { designsCollection, tattoosCollection } from './collections'
import { type ImagesData, type Tattoo } from '../types/tattoo'

async function checkIfAdmin (): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    if (auth.currentUser === null) resolve(false)
    auth.currentUser?.getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.admin === true) resolve(true)
        else resolve(false)
      })
      .catch(reject)
  })
}

export const onAuthStateChanged = (setState: (user: true | false) => void) => {
  return auth.onAuthStateChanged((user) => {
    if (user === null) {
      setState(false)
      return
    }
    checkIfAdmin()
      .then(bool => { setState(bool) })
      .catch(_ => { setState(false) })
  })
}

export const iniciarSesion = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const cerrarSesion = async () => {
  await auth.signOut()
}

export const subirImagen = async (file: File, isTattoo: boolean) => {
  const isAdmin = await checkIfAdmin()
  if (!isAdmin) throw new Error('No tenés permisos, cerrá sesión y volvé a abrirla.')

  const storage = getStorage()
  const fileName = String(Date.now()) + '.' + file.name.split('.')[1]
  const path = isTattoo
    ? 'tattoos'
    : 'designs'

  const storageRef = ref(storage, `/${path}/${fileName}`)
  await uploadBytesResumable(storageRef, file)
  const src = await getDownloadURL(storageRef)

  return { src, path: storageRef.fullPath }
}

export const deleteTattoo = async (id: string, imageData: ImagesData) => {
  const isAdmin = await checkIfAdmin()

  if (!isAdmin) throw new Error('No está permitido.')
  const reff = ref(storage, imageData.path)

  await deleteObject(reff)

  try {
    await deleteDoc(doc(tattoosCollection, id))
  } catch (err) {
    console.error(err)
  }
}

export const deleteDesign = async (id: string, path: string) => {
  const isAdmin = await checkIfAdmin()

  if (!isAdmin) throw new Error('No está permitido.')
  const reff = ref(storage, path)
  try {
    await deleteObject(reff)
    await deleteDoc(doc(designsCollection, id))
  } catch (err) {
    console.error(err)
  }
}

export const searchTatttoos = async ({ search }: { search: string }): Promise<Tattoo[]> => {
  const tattoos = await getTattoos(false)

  const parsed = tattoos.filter(({ nombre, estilos, lugar }) => {
    if (nombre.includes(search) || estilos.includes(search) || lugar.includes(search)) return true
    return false
  })

  return parsed
}

export const getTattoos = async (fromHome = true) => {
  const arr = fromHome
    ? [true]
    : [true, false]

  const q = query(tattoosCollection, where('homeVisible', 'in', arr))
  return await getDocs(q)
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

export const getDesigns = async () => {
  return await getDocs(designsCollection)
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data()
        return { ...data }
      })
    })
}

export const agregarTatuaje = async ({ nombre, descripcion, estilos, image, duracion, lugar, homeVisible }: Tattoo) => {
  try {
    const docRef = await addDoc(tattoosCollection, {
      nombre, descripcion, image, estilos, duracion, lugar, homeVisible, id: 'placeholder'
    })
    return docRef
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Hubo un error al subir el tatuaje a la base de datos.'
    throw new Error(errorMessage)
  }
}
