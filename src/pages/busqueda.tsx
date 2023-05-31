import { Layout } from '@/components/common/layout'
import { PageHeading } from '@/components/common/page-heading'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { SearchInput } from '@/components/search/search-input'
import { SearchRender } from '@/components/search/search-render'
import { useFade } from '@/hooks/useFade'
import { useModalContext } from '@/hooks/useModalContext'
import { useSearch } from '@/hooks/useSearch'
import { useWindowContext } from '@/hooks/useWindowContext'
import { searchTatttoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import { waitFunc } from '@/lib/waitFunc'
import { type GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'

interface Props {
  tattoos?: Tattoo[]
  error?: string
  query: string
}

const TattooModalWide = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-wide').then(module => module.default),
  { loading: () => <TattooModalFallback /> })
const TattooModalMobile = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-mobile').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Busqueda ({ tattoos: serverTattoos, error, query }: Props) {
  const { intersected } = useFade()
  const { state } = useModalContext() ?? {}
  const { isMobile } = useWindowContext() ?? {}
  const { onChange, value, state: tattosState } = useSearch({ tattoos: serverTattoos, query })
  const { loading, error: clientError, tattoos } = tattosState

  return <>

    <main className='flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center'>
      <PageHeading intersected={intersected} text='Búsqueda' />
      <SearchInput onChange={onChange} value={value} intersected={intersected} />
      <div className='relative flex-1 w-full'>
        <SearchRender loading={loading} error={error} clientError={clientError} tattoos={tattoos} intersected={intersected} />
      </div>
    </main>
    {
      (isMobile ?? false)
        ? (state?.open !== undefined) && ((state?.tattoo) != null) && state.open && <TattooModalMobile tattoo={state.tattoo} />
        : (state?.open !== undefined) && ((state?.tattoo) != null) && state.open && <TattooModalWide tattoo={state.tattoo} />
    }
  </>
}

Busqueda.getLayout = (page: ReactNode) => <Layout>
  {page}
</Layout>

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const search = String(context.query.search ?? '')

  try {
    const tattoos = await waitFunc(async () => await searchTatttoos({ search }), 5000, 'No se pudo obtener los tatuajes')
    return {
      props: {
        tattoos,
        query: search
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      props: {
        error: errorMessage,
        query: search
      }
    }
  }
}
