import { Footer } from '@/components/footer/footer'
import { Layout } from '@/components/layout/layout'
import { PageHeading } from '@/components/common/page-heading'
import { Seo } from '@/components/common/seo'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { TattooSection } from '@/components/tattoo/tattoo-section'
import { useModalContext } from '@/hooks/useModalContext'
import { useWindowContext } from '@/hooks/useWindowContext'
import { getTattoos } from '@/lib/firebase/utils'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'
import { type Tattoo } from '@/lib/types/tattoo'
import { siteURL } from '@/lib/env'
import { defaultDesc, waitFunc } from '@/lib/consts'
import { type GetServerSidePropsContext } from 'next'
import { ErrorComponent } from '@/components/error/errorComponent'

interface Props {
  tattoos?: Tattoo[]
  error?: string
}

const TattooModalWide = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-wide').then(module => module.default),
  { loading: () => <TattooModalFallback /> })
const TattooModalMobile = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-mobile').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Tatuajes ({ tattoos, error }: Props) {
  const { state } = useModalContext() ?? {}
  const { isMobile } = useWindowContext() ?? {}

  return <>
    <Seo title='Tatuajes / Neptuno Black Tatuajes'
      description={'Página de los tatuajes realizados por Alan Hernandez.' + defaultDesc}
      image={`${siteURL}/logo.webp`}
      imageType='image/webp'
    />
    <main className='flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center' >
      <PageHeading text='Tatuajes' />
      <div className='flex-1 w-full flex'>
        {
          error !== undefined && error !== null && <ErrorComponent error={error} />
        }
        {
          tattoos !== undefined && <TattooSection tattoos={tattoos} />
        }
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

Tatuajes.getLayout = (page: ReactNode): ReactNode => <Layout>
  {page}
</Layout>

export async function getServerSideProps (ctx: GetServerSidePropsContext) {
  try {
    const tattoos = await waitFunc<Tattoo[]>(getTattoos, 5000, 'No se pudo recuperar los tatuajes')
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
