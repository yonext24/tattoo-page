/* eslint-disable no-case-declarations */
export const INITIAL_DESIGN_UPLOADER_STATE = {
  design: {
    loading: false,
    error: null,
    id: null,
    image: {
      url: null,
      path: null
    },
    nombre: '',
    precio: ''
  },
  fetch: {
    loading: false,
    error: null,
    success: false
  }
}

export interface designType {
  loading: boolean
  error: string | null
  id: string | null
  image: {
    url: string | null
    path: string | null
  }
  nombre: string | null
  precio: string | null
}

interface StateType {
  design: designType
  fetch: {
    loading: boolean
    error: string | null
    success: boolean
  }

}
type ActionTypes =
  | { type: 'uploadImageLoading' }
  | { type: 'updateImageData', payload: string }
  | { type: 'updateImageDataError', payload: string }
  | { type: 'updateImagePrice', payload: string }
  | { type: 'setSubmitError', payload: string }
  | { type: 'setSubmitLoading' }
  | { type: 'setSubmitSuccess' }
  | { type: 'setReset' }

export function designUploadReducer (state: StateType, action: ActionTypes) {
  switch (action.type) {
    case 'uploadImageLoading':
      return { ...state, design: { ...state.design, loading: true } }
    case 'updateImageData':
      return {
        ...state,
        design: {
          ...state.design,
          loading: false,
          image: {
            ...state.design.image,
            url: action.payload
          }
        }
      }
    case 'updateImageDataError':
      return { ...state, design: { ...state.design, error: action.payload } }
    case 'updateImagePrice':
      return { ...state, design: { ...state.design, precio: action.payload } }
    case 'setSubmitError':
      return { ...state, fetch: { loading: false, error: action.payload, success: false } }
    case 'setSubmitLoading':
      return { ...state, fetch: { error: null, loading: true, success: false } }
    case 'setSubmitSuccess':
      return { ...state, fetch: { loading: false, error: null, success: true } }
    case 'setReset':
      return INITIAL_DESIGN_UPLOADER_STATE

    default:
      return state
  }
}
