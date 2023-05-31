import { TattooSection } from '@/components/tattoo/tattoo-section'
import { Spinner } from '../common/spinner'
import { type Tattoo } from '@/lib/types/tattoo'

interface Props {
  error: string | null
  loading: boolean
  tattoos: Tattoo[] | []
  intersected: boolean
}

export function SearchRender ({ error, loading, tattoos, intersected }: Props) {
  return <>
    {
      (error !== null)
        ? <span className='text-center'>{error ?? ''}</span>
        : tattoos !== undefined && <TattooSection tattoos={tattoos} intersected={intersected} />
    }
    <div className={`absolute top-[6px] left-[12px] w-[calc(100%-10px)] h-full flex justify-center items-start pt-[20vh] transition-colors z-100 
    rounded-lg ${loading ? 'bg-white/10 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}>
      {
        loading && <Spinner className='h-8 w-8' />
      }
    </div>
  </>
}
