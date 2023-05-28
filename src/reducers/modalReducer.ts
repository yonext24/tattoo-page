import { type Tattoo } from '@/lib/types/tattoo'
import { type StateType } from '@/lib/types/context'
import { INITIAL_STATE } from '@/contexts/ModalContext'
import { type Design } from '@/lib/types/design'

export type ActionTypes =
  | { type: 'openTattoo', payload: Tattoo }
  | { type: 'openDesign', payload: Design }
  | { type: 'closeModal' }

export function modalReducer (state: StateType, action: ActionTypes) {
  switch (action.type) {
    case 'closeModal':
      return INITIAL_STATE
    case 'openTattoo':
      return { open: true, tattoo: action.payload, design: null }
    case 'openDesign':
      return { open: true, design: action.payload, tattoo: null }
    default:
      return { ...state }
  }
}
