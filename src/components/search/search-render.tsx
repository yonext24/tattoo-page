import { TattooSection } from '@/components/tattoo/tattoo-section'
import { Spinner } from '../common/spinner'
import { type Tattoo } from '@/lib/types/tattoo'
import { ErrorComponent } from '../error/errorComponent'

interface Props {
  error: string | null
  loading: boolean
  tattoos: Tattoo[] | []
}

export function SearchRender ({ error, loading, tattoos }: Props) {
  return <>
    {
      (error !== null || tattoos.length === 0)
        ? <ErrorComponent error={error ?? 'No se encontraron tatuajes con esa búsqueda'} />
        : tattoos !== undefined && <TattooSection tattoos={tattoos} />
    }
    <div className={`absolute top-[6px] left-[12px] w-[calc(100%-10px)] h-full flex justify-center items-start pt-[20vh] transition-colors z-100 
    rounded-lg ${loading ? 'bg-white/10 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}>
      {
        loading && <Spinner className='h-8 w-8' />
      }
    </div>
  </>
}
