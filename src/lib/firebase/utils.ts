/* eslint-disable no-new */
// Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { auth, storage } from './app'
import { designsCollection, tattoosCollection } from './collections'
import { TattooWithoutId, type Tattoo } from '../types/tattoo'
import Compressor from 'compressorjs'
import { type DesignImage, type Design } from '../types/design'
import { AppUser, USER_POSSIBLE_STATES } from '@/hooks/useUser'

async function checkIfAdmin(): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    if (auth.currentUser === null) resolve(false)
    auth.currentUser
      ?.getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.admin === true) resolve(true)
        else resolve(false)
      })
      .catch(reject)
  })
}

export const onAuthStateChanged = (
  setState: (user: AppUser | typeof USER_POSSIBLE_STATES.NOT_LOGGED) => void
) => {
  return auth.onAuthStateChanged(async (user) => {
    const isAdmin = await checkIfAdmin().catch(() => false)
    setState(user ? ({ ...user, isAdmin } as AppUser) : false)
  })
}

export const iniciarSesion = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const cerrarSesion = async () => {
  await auth.signOut()
}

export const subirImagen = async (file: File, isTattoo: boolean) => {
  const isAdmin = await checkIfAdmin()
  if (!isAdmin)
    throw new Error('No tenés permisos, cerrá sesión y volvé a abrirla.')

  const storage = getStorage()
  const fileName = String(Date.now()) + '.' + file.name.split('.')[1]
  const path = isTattoo ? 'tattoos' : 'designs'

  let compressedImage: File | Blob
  try {
    compressedImage = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        height: 630,
        width: 1200,
        resize: 'contain',

        beforeDraw(context, canvas) {
          context.fillStyle = '#000'
          context.fillRect(0, 0, canvas.width, canvas.height)
        },

        success(result) {
          resolve(result)
        },

        error(err) {
          reject(err)
        }
      })
    })
  } catch (err) {
    const errorMessage =
      'Hubo un error al comprimir la imágen, intentálo denuevo'
    throw new Error(errorMessage)
  }

  const compressedRef = ref(storage, `/${path}/compressed/${fileName}`)
  const originalRef = ref(storage, `/${path}/${fileName}`)

  try {
    await Promise.all([
      uploadBytesResumable(originalRef, file),
      uploadBytesResumable(compressedRef, compressedImage)
    ])

    const [originalSrc, compressedSrc] = await Promise.all([
      getDownloadURL(originalRef),
      getDownloadURL(compressedRef)
    ])
    return {
      original: { src: originalSrc, path: originalRef.fullPath },
      compressed: { src: compressedSrc, path: compressedRef.fullPath }
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'Hubo un error al subir las imágenes, recargá y intentalo denuevo.'
    throw new Error(errorMessage)
  }
}

export const deleteTattoo = async (id: string) => {
  const isAdmin = await checkIfAdmin()
  if (!isAdmin) throw new Error('No está permitido.')

  try {
    await deleteDoc(doc(tattoosCollection, id))
  } catch (err) {
    console.error(err)
  }
}

export const deleteDesign = async (id: string) => {
  const isAdmin = await checkIfAdmin()

  if (!isAdmin) throw new Error('No está permitido.')

  try {
    await deleteDoc(doc(designsCollection, id))
  } catch (err) {
    console.error(err)
  }
}

export const searchTatttoos = async ({
  search
}: {
  search: string
}): Promise<Tattoo[]> => {
  const tattoos = await getTattoos(false)

  const parsed = tattoos.filter(({ nombre, estilos }) => {
    if (nombre.includes(search) || estilos.includes(search)) return true
    return false
  })

  return parsed
}

export const getTattoos = async (fromHome = true) => {
  const arr = fromHome ? [true] : [true, false]

  const q = query(tattoosCollection, where('homeVisible', 'in', arr))
  return await getDocs(q).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return { ...data }
    })
  })
}

export const getSingleTattoo = async (slug: string) => {
  const q = query(tattoosCollection, where('slug', '==', slug))
  return await getDocs(q).then((docs) => {
    if (docs.empty) {
      throw new Error('No se encontró el tatuaje.')
    }
    const data = docs.docs[0].data()
    return { ...data } satisfies Tattoo
  })
}

export const getDesigns = async () => {
  return await getDocs(designsCollection).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return { ...data }
    })
  })
}
export const getSingleDesign = async (id: string) => {
  const docRef = doc(designsCollection, id)
  return await getDoc(docRef).then((doc) => {
    if (!doc.exists()) {
      throw new Error('No se encontró el tatuaje.')
    }
    const data = doc.data()
    return { ...data }
  })
}

export const agregarTatuaje = async (tattoo: TattooWithoutId) => {
  try {
    const docRef = await addDoc(tattoosCollection, tattoo)
    return docRef
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'Hubo un error al subir el tatuaje a la base de datos.'
    throw new Error(errorMessage)
  }
}

export const agregarDiseño = async ({ nombre, precio, image }: Design) => {
  try {
    const docRef = await addDoc(designsCollection, {
      nombre,
      precio,
      image,
      id: 'placeholder'
    })
    return docRef
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'Hubo un error al subir el tatuaje a la base de datos.'
    throw new Error(errorMessage)
  }
}

// export const generateRandomSlugs = async () => {
//   const allTattoos = await getTattoos(false)
//   allTattoos.map(async tattoo => {
//     const newSlug = await generateTattooSlug(tattoo.nombre, tattoo.estilos)
//     const docRef = doc(tattoosCollection, tattoo.id)

//     await updateDoc(docRef, { slug: newSlug })
//   })

//   await Promise.all(allTattoos)
// }

export function removeAccents(input: string): string {
  const accentMap: Record<string, string> = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    ü: 'u'
  }

  return input.replace(/[áéíóúü]/gi, function (match) {
    return accentMap[match.toLowerCase()] || match
  })
}

const normalizeValue = (str: string | number) => {
  return encodeURI(
    removeAccents(String(str).toLowerCase()).replaceAll(' ', '-')
  )
}

export const generateTattooSlug = async (title: string, styles: string[]) => {
  const extraWords = ['tatuaje', 'tattoo']
  let alreadyTriedRaw = styles.length <= 0
  let retryNumber = 1
  let initialSlice = styles.length >= 2 ? 2 : styles.length

  const normalizedTitle = normalizeValue(title)
  const normalizedStyles = styles
    .map((style) => normalizeValue(style))
    .filter((el) => el !== normalizedTitle)

  while (true) {
    const stylesSlug = normalizedStyles.slice(0, initialSlice)
    let slug = normalizedTitle + '-' + [...stylesSlug].join('-')

    if (alreadyTriedRaw) {
      const pickedWord = extraWords.pop()
      if (pickedWord) {
        slug += `${pickedWord}-`
      } else {
        slug += `${retryNumber}-`
        retryNumber++
      }
    }

    if (initialSlice === styles.length - 1) {
      alreadyTriedRaw = true
    } else initialSlice++

    console.log({ slug })
    const tattoo = await getSingleTattoo(slug).catch(() => false)
    if (!tattoo) {
      return trimEnd(slug, '-')
    }
  }
}

function trimEnd(s: string, ch: string): string {
  let res = s
  while (res.endsWith(ch)) {
    res = res.slice(0, -1)
  }
  return res
}
