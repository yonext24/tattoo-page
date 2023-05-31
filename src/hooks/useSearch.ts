import { fetchSearch } from '@/lib/fetchSearch'
import { type Tattoo } from '@/lib/types/tattoo'
import { INITIAL_STATE, searchReducer } from '@/reducers/searchReducer'

import debounce from 'just-debounce-it'
import { useState, useEffect, useCallback, useReducer } from 'react'

interface Props {
  tattoos: Tattoo[] | undefined
  query: string
}

export function useSearch ({ tattoos, query }: Props) {
  const [value, setValue] = useState<string>(query)
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE)

  useEffect(() => {
    if (tattoos !== undefined) {
      dispatch({ type: 'setServerTattoos', payload: tattoos })
    }
  }, [tattoos])

  const getTattoos = useCallback(
    debounce(async (search: string) => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { tattoos: fetchTattoos } = await fetchSearch(search.toLocaleLowerCase())
        dispatch({ type: 'FETCH_SUCCESS', payload: fetchTattoos })
      } catch (error) {
        const errorMessage = String(error instanceof Error ? error.message : error)
        dispatch({ type: 'FETCH_FAILURE', payload: errorMessage })
      }
    }, 500)
    , [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith(' ')) return
    setValue(e.target.value)
    getTattoos(e.target.value)
  }

  return { state, onChange, value }
}
