import { agregarTatuaje, subirImagen } from '@/lib/firebase/utils'
import { getImageDimensionsFromFile } from '@/lib/getImageDimensions'
import { type Tattoo } from '@/lib/types/tattoo'
import { INITIAL_TATTOO_UPLOADER_STATE, tattooUploadReducer } from '@/reducers/tattooUploadReducer'
import { useEffect, useReducer, useRef } from 'react'

export function useUploadTattoo () {
  const [state, dispatch] = useReducer(tattooUploadReducer, INITIAL_TATTOO_UPLOADER_STATE)

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

    getImageDimensionsFromFile(files[0])
      .then(({ url, width, height }) => {
        dispatch({ type: 'updateImageData', payload: { url, width, height } })
      })
      .catch(() => {
        dispatch({ type: 'updateImageDataError', payload: 'Error al obtener la imágen.' })
      })
  }
  const nombreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateImageName', payload: e.target.value })
  }
  const estilosHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateStyles', payload: e.target.value })
  }
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (state?.tattoo?.image?.width === null && state?.tattoo?.image?.height === null) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      dispatch({ type: 'setSubmitError', payload: 'Error, no se consiguió el ancho o alto de la imágen, recargá la página y intentá denuevo.' })
      return
    }
    const { width, height } = state.tattoo.image
    const { estilos } = state.tattoo

    dispatch({ type: 'setSubmitLoading' })

    const formData = new FormData(e.target as HTMLFormElement)

    const {
      descripcion,
      duracion,
      lugar,
      nombre,
      image
    } = Object.fromEntries(formData)

    const homeVisible = formData.get('homeVisible') !== null

    let src: string, path: string
    let compressedSrc: string, compressedPath: string
    try {
      const { original, compressed } = await subirImagen(image as File, true)
      src = original.src
      path = original.path
      compressedSrc = compressed.src
      compressedPath = compressed.path
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Hubo un error al subir la imágen'
      dispatch({ type: 'setSubmitError', payload: errorMessage })
      return
    }

    const finalData: Tattoo = {
      id: 'placeholder',
      descripcion: descripcion as string,
      duracion: duracion as string,
      lugar: lugar as string,
      nombre: nombre as string,
      estilos,
      homeVisible,
      image: {
        width: width as number,
        height: height as number,
        path,
        src,
        compressed: {
          src: compressedSrc,
          path: compressedPath
        }
      }
    }

    agregarTatuaje(finalData)
      .then(() => { dispatch({ type: 'setSubmitSuccess' }) })
      .catch(() => { dispatch({ type: 'setSubmitError', payload: 'Error al subir el documento a la base de datos' }) })
  }

  return { nombreHandler, submitHandler, estilosHandler, uploadImageHandler, state, fileInputRef }
}
