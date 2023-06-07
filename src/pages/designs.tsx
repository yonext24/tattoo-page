import { Footer } from '@/components/common/footer'
import { Layout } from '@/components/layout/layout'
import { Seo } from '@/components/common/seo'
import { DesignSection } from '@/components/design/design-section'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { type DesignModalProps } from '@/components/modals/design-modal/design-modal'
import { useFade } from '@/hooks/useFade'
import { useModalContext } from '@/hooks/useModalContext'
import { getDesigns, getSingleDesign } from '@/lib/firebase/utils'
import { type Design } from '@/lib/types/design'
import { waitFunc } from '@/lib/waitFunc'
import dynamic from 'next/dynamic'
import { useEffect, type ReactNode } from 'react'
import { siteURL } from '@/lib/env'
import { type GetServerSidePropsContext } from 'next'

interface PageProps {
  error?: string
  designs?: Design[]
  singleDesign: Design | false
  singleDesignError: string | false
}

const DesignModal = dynamic(async (): Promise<React.ComponentType<DesignModalProps>> => await import('@/components/modals/design-modal/design-modal').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Designs ({ error, designs, singleDesign }: PageProps) {
  const { intersected } = useFade()
  const { state, dispatch } = useModalContext() ?? {}

  useEffect(() => {
    if (singleDesign !== false) {
      dispatch?.({ type: 'openDesign', payload: singleDesign })
    }
  }, [singleDesign])

  const closeModal = () => { dispatch?.({ type: 'closeModal' }) }

  return <>
    {
      singleDesign !== false
        ? <Seo
          title={`${singleDesign.nombre.charAt(0).toUpperCase()}${singleDesign.nombre.slice(1)}` + ' / Neptuno Black'}
          image={`${singleDesign.image.compressed.src}?`}
          width={String(1200)}
          height={String(630)}
          imageType={`image/${singleDesign.image.compressed.path.split('.')[1]}`}
        />
        : <Seo title='Diseños / Neptuno Black'
            description='Página de diseños de Neptuno Black, Alan Hernandez.'
            image={`${siteURL}/logo.webp`}
            imageType='image/webp'
          />
    }

    <main className='flex-1 pr-2 h-max max-w-xl max-[630px]:max-w-none'>
      {
        Boolean(error) && <span>{error}</span>
      }
      {
        (designs !== undefined) && <DesignSection intersected={intersected} designs={designs} />
      }
      <Footer />
    </main>
    {
      (state?.open ?? false) && (state?.design !== null && state?.design !== undefined)
        ? <DesignModal closeModal={closeModal} design={state.design} />
        : null

    }
  </>
}

Designs.getLayout = (page: ReactNode) => <Layout>
  {page}
</Layout>

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const singleDesign = String(context.query.design ?? '')

  let designToSend: Design | false = false
  let designError: string | false = false

  if (singleDesign !== '' || singleDesign !== undefined) {
    try {
      designToSend = await waitFunc(async () => await getSingleDesign(singleDesign), 5000, 'No se pudo recuperar el tatuaje.')
    } catch (error) {
      designError = error instanceof Error ? error.message : String(error)
    }
  }

  try {
    const designs = await waitFunc(getDesigns, 5000, 'No se pudo obtener los diseños.')

    return {
      props: {
        designs,
        singleDesign: designToSend,
        singleDesignError: designError
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      props: {
        error: errorMessage,
        singleDesign: designToSend,
        singleDesignError: designError
      }
    }
  }
}
