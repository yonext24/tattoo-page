import { Footer } from '@/components/footer/footer'
import { Layout } from '@/components/layout/layout'
import { PageHeading } from '@/components/common/page-heading'
import { Seo } from '@/components/common/seo'
import { SearchInput } from '@/components/search/search-input'
import { SearchRender } from '@/components/search/search-render'
import { useModalContext } from '@/hooks/useModalContext'
import { useSearch } from '@/hooks/useSearch'
import { useWindowContext } from '@/hooks/useWindowContext'
import { searchTatttoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import { type GetServerSidePropsContext } from 'next'
import { siteURL } from '@/lib/env'
import { defaultDesc, waitFunc } from '@/lib/consts'

interface Props {
  tattoos?: Tattoo[]
  error?: string
  query: string
  singleTattoo?: Tattoo
}

export default function Busqueda({
  tattoos: serverTattoos,
  error: serverError,
  query
}: Props) {
  const { state } = useModalContext() ?? {}
  const { isMobile } = useWindowContext() ?? {}
  const {
    onChange,
    value,
    state: tattoosState
  } = useSearch({ tattoos: serverTattoos, query, serverError })
  const { loading, error, tattoos } = tattoosState

  return (
    <>
      <Seo
        title="Búsqueda / Neptuno Black"
        description={
          'Página de búsqueda de tatuajes de Neptuno Black, Alan Hernandez.' +
          defaultDesc
        }
        image={`${siteURL}/logo.webp`}
        imageType="image/webp"
      />

      <main
        className="flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center"
      >
        <PageHeading text="Búsqueda" />
        <SearchInput onChange={onChange} value={value} />
        <div className="relative flex-1 w-full flex">
          <SearchRender loading={loading} error={error} tattoos={tattoos} />
        </div>
        <Footer />
      </main>
    </>
  )
}

Busqueda.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const search = String(context.query.search ?? '')
  try {
    const tattoos = await waitFunc(
      async () => await searchTatttoos({ search }),
      5000,
      'No se pudo obtener los tatuajes'
    )
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
