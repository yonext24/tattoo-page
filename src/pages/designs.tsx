import { Layout } from '@/components/common/layout'
import { Seo } from '@/components/common/seo'
import { DesignSection } from '@/components/design/design-section'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { type DesignModalProps } from '@/components/modals/design-modal/design-modal'
import { useFade } from '@/hooks/useFade'
import { useModalContext } from '@/hooks/useModalContext'
import { getDesigns } from '@/lib/firebase/utils'
import { type Design } from '@/lib/types/design'
import { waitFunc } from '@/lib/waitFunc'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'

interface PageProps {
  error?: string
  designs?: Design[]
}

const DesignModal = dynamic(async (): Promise<React.ComponentType<DesignModalProps>> => await import('@/components/modals/design-modal/design-modal').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Designs ({ error, designs }: PageProps) {
  const { intersected } = useFade()
  const { state, dispatch } = useModalContext() ?? {}
  const closeModal = () => { dispatch?.({ type: 'closeModal' }) }

  return <>
  <Seo title='Designs / Neptuno Black Tattoos' />
  <main className='flex-1 pr-2 h-max'>
    {
      Boolean(error) && <span>{error}</span>
    }
    {
      (designs !== undefined) && <DesignSection intersected={intersected} designs={designs} />
    }
    {
      (state?.open ?? false) && (state?.design !== null && state?.design !== undefined)
        ? <DesignModal closeModal={closeModal} design={state.design} />
        : null

    }
  </main>
  </>
}

Designs.getLayout = (page: ReactNode) => <Layout>
  {page}
</Layout>

export const getServerSideProps = async () => {
  try {
    const designs = await waitFunc(getDesigns, 5000, 'No se pudo obtener los diseños.')
    return {
      props: {
        designs
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
