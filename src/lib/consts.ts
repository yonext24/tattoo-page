import { type Tattoo } from './types/tattoo'

export const navEntrys = [
  { name: 'Home', url: '/' },
  { name: 'Tatuajes', url: '/tatuajes' },
  { name: 'Diseños', url: '/designs' },
  { name: 'Búsqueda', url: '/busqueda' }
]

export async function waitFunc<T> (fn: () => Promise<T>, duration: number, error: string): Promise<T> {
  return await new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => {
      reject(new Error(error))
    }, duration)

    fn()
      .then(resolve)
      .catch(e => {
        reject(new Error(e))
      })
      .finally(() => {
        clearTimeout(id)
      })
  })
}

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

export const defaultDesc = `<br>
Tatuador en zona Lanús y alrededores.
<br>
Turnos por whatsapp al 11 6474-8262
<br>
Instagram
@alan.h.tattoo
`
