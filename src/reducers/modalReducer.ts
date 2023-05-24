import { type Tattoo } from '@/lib/types/tattoo'
import { type StateType } from '@/lib/types/context'
import { INITIAL_STATE } from '@/contexts/ModalContext'

export type ActionTypes =
  | { type: 'openModal', payload: Tattoo }
  | { type: 'closeModal' }

export function modalReducer (state: StateType, action: ActionTypes) {
  switch (action.type) {
    case 'closeModal':
      return INITIAL_STATE
    case 'openModal':
      return { open: true, tattoo: action.payload }
    default:
      return INITIAL_STATE
  }
}
