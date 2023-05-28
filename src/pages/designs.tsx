import { Layout } from '@/components/common/layout'
import { DesignSection } from '@/components/design/design-section'
import { useFade } from '@/hooks/useFade'
import { getDesigns } from '@/lib/firebase/utils'
import { type Design } from '@/lib/types/design'
import { type ReactNode } from 'react'

interface PageProps {
  err?: boolean
  designs?: Design[]
}

export default function Designs ({ err, designs }: PageProps) {
  const { intersected } = useFade()

  return <main className='flex-1 pr-2 h-max'>
    {
      (err ?? false) && <span>Error al recuperar los diseños</span>
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
    const designs = await getDesigns()
    return {
      props: {
        designs
      }
    }
  } catch {
    return {
      props: {
        err: true
      }
    }
  }
}
