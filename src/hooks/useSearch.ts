/* eslint-disable react-hooks/exhaustive-deps */
import { type Tattoo } from '@/lib/types/tattoo'
import { INITIAL_STATE, searchReducer } from '@/reducers/searchReducer'

import debounce from 'just-debounce-it'
import { useState, useEffect, useCallback, useReducer, useRef } from 'react'
import { useModalContext } from './useModalContext'
import { fetchSearch } from '@/lib/consts'
import { useRouter } from 'next/router'

interface Props {
  tattoos: Tattoo[] | undefined
  query: string
  serverError: string | undefined
}

export function useSearch({ tattoos, query, serverError }: Props) {
  const [value, setValue] = useState<string>(query)
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE)
  const { state: modalState, dispatch: modalDispatch } = useModalContext() ?? {}

  const modalOpened = useRef<boolean>(false)

  useEffect(() => {
    if (serverError !== undefined) {
      dispatch({ type: 'FETCH_FAILURE', payload: serverError })
    }
  }, [serverError])

  useEffect(() => {
    if ((modalState?.open ?? false) && !modalOpened.current) {
      modalOpened.current = true
    }
  }, [modalState?.open])

  useEffect(() => {
    if (tattoos !== undefined && state.tattoos.length === 0) {
      dispatch({ type: 'setServerTattoos', payload: tattoos })
    }
  }, [tattoos, state.tattoos.length])

  const router = useRouter()

  const getTattoos = useCallback(
    debounce(async (search: string) => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { tattoos: fetchTattoos } = await fetchSearch(
          search.toLocaleLowerCase()
        )
        dispatch({ type: 'FETCH_SUCCESS', payload: fetchTattoos })
        void router.replace(
          '/busqueda?search=' + search.toLocaleLowerCase(),
          undefined,
          { shallow: true, scroll: false }
        )
      } catch (error) {
        const errorMessage = String(
          error instanceof Error ? error.message : error
        )
        dispatch({ type: 'FETCH_FAILURE', payload: errorMessage })
      }
    }, 500),
    []
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith(' ')) return
    setValue(e.target.value)
    getTattoos(e.target.value)
  }

  return { state, onChange, value }
}
