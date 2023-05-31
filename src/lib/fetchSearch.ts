import { type Tattoo } from './types/tattoo'

interface ApiResponse {
  tattoos?: Tattoo[]
  error?: string
}
interface Res {
  tattoos: Tattoo[] | []
}

export const fetchSearch = async (search: string): Promise<Res> => {
  const response = await fetch(`/api/search?search=${encodeURIComponent(search)}`)
  const data: ApiResponse = await response.json()

  if (!response.ok) {
    throw new Error(data.error ?? 'Error al obtener los datos')
  }

  return { tattoos: data.tattoos ?? [] }
}
