/* eslint-disable react-hooks/exhaustive-deps */
import { Footer } from '@/components/footer/footer'
import { Layout } from '@/components/layout/layout'
import { Seo } from '@/components/common/seo'
import { DesignSection } from '@/components/design/design-section'
import { getDesigns, getSingleDesign } from '@/lib/firebase/utils'
import { type Design } from '@/lib/types/design'
import { type ReactNode } from 'react'
import { siteURL } from '@/lib/env'
import { type GetServerSidePropsContext } from 'next'
import { defaultDesc, waitFunc } from '@/lib/consts'
import { PageHeading } from '@/components/common/page-heading'
import { ErrorComponent } from '@/components/error/errorComponent'

interface PageProps {
  error?: string
  designs?: Design[]
  singleDesign: Design | false
  singleDesignError: string | false
}

export default function Designs({ error, designs, singleDesign }: PageProps) {
  return (
    <>
      <Seo
        title="Diseños / Neptuno Ink"
        description={
          'Página de búsqueda de diseños disponibles o a la venta de Neptuno Ink, Alan Hernandez. ' +
          defaultDesc
        }
        image={`${siteURL}/logo.webp`}
        imageType="image/webp"
      />

      <main
        className="flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center"
      >
        <div className="flex-1 relative flex flex-col">
          <PageHeading text="Diseños" />

          {Boolean(error) && <ErrorComponent error={error} />}
          {designs !== undefined && <DesignSection designs={designs} />}
        </div>
        <Footer />
      </main>
    </>
  )
}

Designs.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const designs = await waitFunc(
    getDesigns,
    5000,
    'No se pudo obtener los diseños.'
  )

  return {
    props: {
      designs
    }
  }
}
