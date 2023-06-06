import { Footer } from '@/components/common/footer'
import { Layout } from '@/components/layout/layout'
import { PageHeading } from '@/components/common/page-heading'
import { Seo } from '@/components/common/seo'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { TattooSection } from '@/components/tattoo/tattoo-section'
import { useFade } from '@/hooks/useFade'
import { useModalContext } from '@/hooks/useModalContext'
import { useWindowContext } from '@/hooks/useWindowContext'
import { getTattoos } from '@/lib/firebase/utils'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import { waitFunc } from '@/lib/waitFunc'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'
import { type Tattoo } from '@/lib/types/tattoo'

interface Props {
  tattoos?: Tattoo[]
  error?: string
}

const TattooModalWide = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-wide').then(module => module.default),
  { loading: () => <TattooModalFallback /> })
const TattooModalMobile = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-mobile').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Tatuajes ({ tattoos, error }: Props) {
  console.log(tattoos)
  const { intersected } = useFade()
  const { state } = useModalContext() ?? {}
  const { isMobile } = useWindowContext() ?? {}

  return <>
    <Seo title='Tattooos / Neptuno Black' description='Página de tatuajes de Neptuno Black.' image='/logo.webp' />
    <main className='flex-1 pr-2 h-max max-w-xl max-[630px]:max-w-none' >
      <PageHeading text='Tatuajes' intersected={intersected} />
      {
        error !== undefined && error !== null && <div>{error}</div>
      }
      {
        tattoos !== undefined && <TattooSection tattoos={tattoos} intersected={intersected} />
      }
      <Footer />
    </main>
    {
      (isMobile ?? false)
        ? (state?.open !== undefined) && ((state?.tattoo) != null) && state.open && <TattooModalMobile tattoo={state.tattoo} />
        : (state?.open !== undefined) && ((state?.tattoo) != null) && state.open && <TattooModalWide tattoo={state.tattoo} />
    }
  </>
}

Tatuajes.getLayout = (page: ReactNode): ReactNode => <Layout>
  {page}
</Layout>

export async function getServerSideProps () {
  try {
    const tattoos = await waitFunc<Tattoo[]>(getTattoos, 5000, 'No se pudo recuperar los tatuajes')
    console.log(tattoos)
    return {
      props: {
        tattoos
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      props: {
        error: errorMessage
      }
    }
  }
}
