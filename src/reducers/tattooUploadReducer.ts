/* eslint-disable no-case-declarations */
export const INITIAL_TATTOO_UPLOADER_STATE = {
  tattoo: {
    loading: false,
    error: null,
    id: null,
    image: {
      url: null,
      width: null,
      height: null,
      path: null
    },
    nombre: '',
    descripcion: '',
    duracion: '<DURACION>',
    homeVisible: true,
    estilos: [],
    lugar: '<LUGAR>'
  },
  fetch: {
    loading: false,
    error: null,
    success: false
  }
}

export interface tattooType {
  loading: boolean
  error: string | null
  id: string | null
  image: {
    url: string | null
    width: number | null
    height: number | null
    path: string | null
  }
  nombre: string | null
  descripcion: string | null
  lugar: string | null
  duracion: string | null
  homeVisible: boolean
  estilos: string[] | []
}

interface StateType {
  tattoo: tattooType
  fetch: {
    loading: boolean
    error: string | null
    success: boolean
  }

}
type ActionTypes =
  | { type: 'uploadImageLoading' }
  | { type: 'updateImageData', payload: { width: number, height: number, url: string } }
  | { type: 'updateImageDataError', payload: string }
  | { type: 'updateImageName', payload: string }
  | { type: 'updateImageDesc', payload: string }
  | { type: 'updateImagePlace', payload: string }
  | { type: 'updateImageDuracion', payload: string }
  | { type: 'updateStyles', payload: string }
  | { type: 'setSubmitError', payload: string }
  | { type: 'setSubmitLoading' }
  | { type: 'setSubmitSuccess' }
  | { type: 'setReset' }

export function tattooUploadReducer (state: StateType, action: ActionTypes) {
  switch (action.type) {
    case 'uploadImageLoading':
      return { ...state, tattoo: { ...state.tattoo, loading: true } }
    case 'updateImageData':
      return {
        ...state,
        tattoo: {
          ...state.tattoo,
          loading: false,
          image: {
            ...state.tattoo.image,
            width: action.payload.width,
            height: action.payload.height,
            url: action.payload.url
          }
        }
      }
    case 'updateImageDataError':
      return { ...state, tattoo: { ...state.tattoo, error: action.payload } }
    case 'updateImageName':
      return { ...state, tattoo: { ...state.tattoo, nombre: action.payload } }
    case 'updateImageDesc':
      return { ...state, tattoo: { ...state.tattoo, descripcion: action.payload } }
    case 'updateImagePlace':
      return { ...state, tattoo: { ...state.tattoo, lugar: action.payload.toLowerCase() } }
    case 'updateImageDuracion':
      return { ...state, tattoo: { ...state.tattoo, duracion: action.payload } }
    case 'updateStyles':
      const estilos = action.payload === ''
        ? []
        : action.payload.toLowerCase().split(' ')
      return { ...state, tattoo: { ...state.tattoo, estilos } }
    case 'setSubmitError':
      return { ...state, fetch: { loading: false, error: action.payload, success: false } }
    case 'setSubmitLoading':
      return { ...state, fetch: { error: null, loading: true, success: false } }
    case 'setSubmitSuccess':
      return { ...state, fetch: { loading: false, error: null, success: true } }
    case 'setReset':
      return INITIAL_TATTOO_UPLOADER_STATE

    default:
      return state
  }
}
