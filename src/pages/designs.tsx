import { Layout } from '@/components/common/layout'
import { DesignSection } from '@/components/design/design-section'
import { useFade } from '@/hooks/useFade'
import { getDesigns } from '@/lib/firebase/utils'
import { type Design } from '@/lib/types/design'
import { waitFunc } from '@/lib/waitFunc'
import { type ReactNode } from 'react'

interface PageProps {
  error?: string
  designs?: Design[]
}

export default function Designs ({ error, designs }: PageProps) {
  const { intersected } = useFade()

  return <main className='flex-1 pr-2 h-max'>
    {
      Boolean(error) && <span>{error}</span>
    }
    {
      (designs !== undefined) && <DesignSection intersected={intersected} designs={designs} />
    }
  </main>
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
