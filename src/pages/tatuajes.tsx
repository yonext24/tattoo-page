import { Layout } from '@/components/common/layout'
import { Seo } from '@/components/common/seo'
import { TattooModalFallback } from '@/components/fallbacks/tattoo-modal-fallback'
import { TattooSection } from '@/components/tattoo/tattoo-section'
import { useFade } from '@/hooks/useFade'
import { useModalContext } from '@/hooks/useModalContext'
import { useWindowContext } from '@/hooks/useWindowContext'
import { getTattoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'

interface Props {
  tattoos?: Tattoo[]
  error?: boolean
}

const TattooModalWide = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-wide').then(module => module.default),
  { loading: () => <TattooModalFallback /> })
const TattooModalMobile = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-mobile').then(module => module.default),
  { loading: () => <TattooModalFallback /> })

export default function Tatuajes ({ tattoos, error }: Props) {
  const { intersected } = useFade()
  const { state } = useModalContext() ?? {}
  const { isMobile } = useWindowContext() ?? {}

  return <>
    <Seo title='Neptuno Black Tattoos Page' />
    <main className='flex-1 pr-2 h-max' >
      {
        error !== undefined && error !== null && <div>Error: Failed to fetch tattoos.</div>
      }
      {
        tattoos !== undefined && <TattooSection tattoos={tattoos} intersected={intersected} />
      }
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
    const tattoos = await getTattoos()
    return {
      props: {
        tattoos
      }
    }
  } catch {
    return {
      props: {
        error: true
      }
    }
  }
}
