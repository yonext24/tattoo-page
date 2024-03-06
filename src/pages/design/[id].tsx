import { PageHeading } from '@/components/common/page-heading'
import { Seo } from '@/components/common/seo'
import { DesignImages } from '@/components/design-page/design-images'
import { Footer } from '@/components/footer/footer'
import { Layout } from '@/components/layout/layout'
import { waitFunc } from '@/lib/consts'
import { getDesigns, getSingleDesign } from '@/lib/firebase/utils'
import { Design } from '@/lib/types/design'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

export default function DesignPage({
  design
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!design) return null

  return (
    <>
      <Seo
        title={`${design.nombre} / Neptuno Black Tatuajes`}
        description={'Página de los diseños realizados por Alan Hernandez.'}
        image={design.images.original.src}
        imageType="image/webp"
      />
      <main
        className="flex-1 pr-2 px-2 md:px-1 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
        max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center"
      >
        <PageHeading text={design.nombre} />
        <div className="flex-1 w-full flex flex-col gap-3 animate-fadeRight">
          <DesignImages {...design} />
          {design.descripcion && (
            <p className="text-sm my-2">{design.descripcion}</p>
          )}
        </div>
        <Footer />
      </main>
    </>
  )
}

DesignPage.getLayout = (comp: React.ReactNode) => <Layout>{comp}</Layout>

export const getStaticPaths = (async (context) => {
  const allDesigns = await getDesigns()
  return {
    paths: allDesigns.map((el) => `/design/${el.slug}`),
    fallback: true
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
  if (typeof params?.id !== 'string') {
    return {
      notFound: true
    }
  }

  const getT = async () => {
    return await getSingleDesign(params?.id as string)
  }
  const design = await waitFunc<Design>(
    getT,
    5000,
    'Hubo un error recuperando el tatuaje'
  )

  return {
    props: {
      design
    }
  }
}) satisfies GetStaticProps<{ design: Design }>
