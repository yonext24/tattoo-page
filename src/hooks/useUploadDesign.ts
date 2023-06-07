import { agregarDiseño, subirImagen } from '@/lib/firebase/utils'
import { type Design } from '@/lib/types/design'
import { INITIAL_DESIGN_UPLOADER_STATE, designUploadReducer } from '@/reducers/designUploadReducer'
import { useEffect, useReducer, useRef } from 'react'

export function useUploadDesign () {
  const [state, dispatch] = useReducer(designUploadReducer, INITIAL_DESIGN_UPLOADER_STATE)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch({ type: 'setReset' })
    }, 2500)

    if (fileInputRef.current != null) {
      fileInputRef.current.files = null
    }

    return () => { clearTimeout(id) }
  }, [state.fetch.error, state.fetch.success])

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'uploadImageLoading' })
    const files = e.target.files
    if (!((files != null) && files.length > 0)) return
    const url = URL.createObjectURL(files[0])
    dispatch({ type: 'updateImageData', payload: url })
  }
  const precioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateImagePrice', payload: e.target.value })
  }
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'setSubmitLoading' })
    const formData = new FormData(e.target as HTMLFormElement)

    const {
      nombre,
      precio,
      image
    } = Object.fromEntries(formData)

    let src: string, path: string
    let compressedSrc: string, compressedPath: string
    try {
      const { original, compressed } = await subirImagen(image as File, false)
      src = original.src
      path = original.path
      compressedSrc = compressed.src
      compressedPath = compressed.path
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Hubo un error al subir la imágen'
      dispatch({ type: 'setSubmitError', payload: errorMessage })
      return
    }

    const finalData: Design = {
      id: 'placeholder',
      nombre: nombre as string,
      precio: precio as string,
      image: {
        path,
        src,
        compressed: {
          src: compressedSrc,
          path: compressedPath
        }
      }
    }

    agregarDiseño(finalData)
      .then(() => { dispatch({ type: 'setSubmitSuccess' }) })
      .catch(() => { dispatch({ type: 'setSubmitError', payload: 'Error al subir el documento a la base de datos' }) })
  }

  return { submitHandler, precioHandler, uploadImageHandler, state, fileInputRef }
}
