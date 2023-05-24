import { Layout } from '@/components/common/layout'
import { Seo } from '@/components/common/seo'
import { Spinner } from '@/components/common/spinner'
import { type TattooModalProps } from '@/components/modals/tattooModal/tattoo-modal-wide'
import { TattooSection } from '@/components/tattoo/tattoo-section'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useModalContext } from '@/hooks/useModalContext'
import { getTattoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'

interface Props {
  tattoos?: Tattoo[]
  error?: boolean
}

const TattooModal = dynamic(async (): Promise<React.ComponentType<TattooModalProps>> => await import('@/components/modals/tattooModal/tattoo-modal-wide').then(module => module.default),
  { loading: () => <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center'><Spinner className='w-16 h-16' /></div> })

export default function Tatuajes ({ tattoos, error }: Props) {
  const { fromRef, intersecting: intersected } = useIntersectionObserver({ once: true })
  const { state } = useModalContext() ?? {}

  return <>
    <Seo title='Neptuno Black Tattoos Page' />
    <main className='flex-1 pr-2' ref={fromRef}>
      {
        error !== undefined && error !== null && <div>Error: Failed to fetch tattoos.</div>
      }
      {
        tattoos !== undefined && <TattooSection tattoos={tattoos} intersected={intersected} />
      }
    </main>
    {
      (state?.open !== undefined) && ((state?.tattoo) != null) && <TattooModal tattoo={state.tattoo} />
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
