import { Footer } from '@/components/footer/footer'
import { Layout } from '@/components/layout/layout'
import { PageHeading } from '@/components/common/page-heading'
import { Seo } from '@/components/common/seo'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { SearchInput } from '@/components/search/search-input'
import { SearchRender } from '@/components/search/search-render'
import { useModalContext } from '@/hooks/useModalContext'
import { useSearch } from '@/hooks/useSearch'
import { useWindowContext } from '@/hooks/useWindowContext'
import { getSingleTattoo, searchTatttoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import { type GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'
import { siteURL } from '@/lib/env'
import { defaultDesc, waitFunc } from '@/lib/consts'

interface Props {
  tattoos?: Tattoo[]
  error?: string
  query: string
  singleTattoo?: Tattoo
}

const TattooModalWide = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-wide').then(module => module.default),
  { loading: () => <TattooModalFallback /> })
const TattooModalMobile = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-mobile').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Busqueda ({ tattoos: serverTattoos, error: serverError, query, singleTattoo }: Props) {
  const { state } = useModalContext() ?? {}
  const { isMobile } = useWindowContext() ?? {}
  const { onChange, value, state: tattoosState } = useSearch({ tattoos: serverTattoos, query, singleTattoo, serverError })
  const { loading, error, tattoos } = tattoosState

  const descripcion = singleTattoo === undefined
    ? 'Página de búsqueda de tatuajes de Neptuno Black, Alan Hernandez.'
    : singleTattoo.descripcion === ''
      ? `${singleTattoo.nombre}, hecho en ${singleTattoo.lugar} en una duración de ${singleTattoo.duracion} | Neptuno Black Tatuajes`
      : `${singleTattoo.descripcion}, hecho en ${singleTattoo.lugar} en una duración de ${singleTattoo.duracion} | Neptuno Black Tatuajes`

  return <>
    {
      singleTattoo !== undefined
        ? <Seo
          title={`${singleTattoo.nombre.charAt(0).toUpperCase()}${singleTattoo.nombre.slice(1)} en ${singleTattoo.lugar}` + ' / Neptuno Black Tatuajes'}
          image={`${singleTattoo.image.compressed.src}?`}
          description={descripcion + defaultDesc}
          width={String(1200)}
          height={String(630)}
          imageType={`image/${singleTattoo.image.compressed.path.split('.')[1]}`}
        />
        : <Seo title='Búsqueda / Neptuno Black'
            description={descripcion + defaultDesc}
            image={`${siteURL}/logo.webp`}
            imageType='image/webp'
          />
    }

    <main className='flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center'>
      <PageHeading text='Búsqueda' />
      <SearchInput onChange={onChange} value={value} />
      <div className='relative flex-1 w-full flex'>
        <SearchRender loading={loading} error={error} tattoos={tattoos} />
      </div>
      <Footer />
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
  const singleTattoo = String(context.query.tattoo ?? '')

  if (singleTattoo !== '') {
    try {
      const tattoo = await waitFunc(async () => await getSingleTattoo(singleTattoo), 5000, 'No se pudo recuperar el tatuaje.')
      return {
        props: {
          tattoos: [],
          query: search,
          singleTattoo: tattoo
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return {
        props: {
          error: errorMessage,
          query: search,
          tattoos: []
        }
      }
    }
  }

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
