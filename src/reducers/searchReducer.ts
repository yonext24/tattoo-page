/* eslint-disable no-case-declarations */
import { type Tattoo } from '@/lib/types/tattoo'

export const INITIAL_STATE = {
  tattoos: [],
  loading: false,
  error: null
}

type ActionTypes =
  | { type: 'setServerTattoos', payload: Tattoo[] }
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS', payload: Tattoo[] | [] }
  | { type: 'FETCH_FAILURE', payload: string }

interface StateType {
  tattoos: Tattoo[] | []
  loading: boolean
  error: string | null
}

export function searchReducer (state: StateType, action: ActionTypes) {
  switch (action.type) {
    case 'setServerTattoos':
      return { ...state, tattoos: action.payload }
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return {
        error: null,
        loading: false,
        tattoos: action.payload
      }
    case 'FETCH_FAILURE':
      return {
        tattoos: [],
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
