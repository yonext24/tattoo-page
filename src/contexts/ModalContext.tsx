import { type StateType } from '@/lib/types/context'
import { type ActionTypes, modalReducer } from '@/reducers/modalReducer'
import { type ReactNode, createContext, useReducer } from 'react'

interface MyContextType {
  state: StateType
  dispatch: React.Dispatch<ActionTypes>
}

export const ModalContext = createContext<MyContextType | undefined>(undefined)

export const INITIAL_STATE: StateType = { open: false, tattoo: null, design: null }

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE)

  const contextValue: MyContextType = {
    state,
    dispatch
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}
