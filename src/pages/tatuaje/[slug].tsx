import { PageHeading } from '@/components/common/page-heading'
import { Seo } from '@/components/common/seo'
import { Footer } from '@/components/footer/footer'
import { MediaCard } from '@/components/home/media-card'
import WhatsappIcon from '@/components/icons/whatsapp-icon'
import { Layout } from '@/components/layout/layout'
import { Options } from '@/components/options/options'
import { TattooImages } from '@/components/tattoo-page/tattoo-images'
import useUser from '@/hooks/useUser'
import { waitFunc } from '@/lib/consts'
import { getSingleTattoo, getTattoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths
} from 'next'

export default function TattooPage({
  tattoo
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const user = useUser()

  if (!tattoo) return null

  return (
    <>
      <Seo
        title={`${tattoo.nombre} / Neptuno Black Tatuajes`}
        description={'Página de los tatuajes realizados por Alan Hernandez.'}
        image={tattoo.images.compressed.src}
        imageType="image/webp"
      />
      <main
        className="flex-1 pr-2 px-2 md:px-0 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center"
      >
        <PageHeading text={tattoo.nombre} />
        <div className="flex-1 w-full flex flex-col gap-3 animate-fadeRight">
          <TattooImages {...tattoo} />
          {tattoo.descripcion && <p className="">{tattoo.descripcion}</p>}
          <MediaCard
            name="Consultar por whatsapp"
            url={`https://api.whatsapp.com/send?phone=541164748262&text=Hola, quiero consultar por este tatuaje: https://neptunoblack.ink/tatuaje/${tattoo.slug}`}
            className="py-2 px-4 after:top-0 max-[730px]:text-sm w-max self-end flex gap-2"
            Icon={WhatsappIcon}
          />
          {user && user.isAdmin && <Options id={tattoo.id} />}
        </div>
        <Footer />
      </main>
    </>
  )
}

TattooPage.getLayout = (comp: React.ReactNode) => <Layout>{comp}</Layout>

export const getStaticPaths = (async (context) => {
  const allTattoos = await getTattoos(false)
  return {
    paths: allTattoos.map((el) => `/tatuaje/${el.slug}`),
    fallback: true
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
  if (typeof params?.slug !== 'string') {
    return {
      notFound: true
    }
  }

  const getT = async () => {
    return await getSingleTattoo(params?.slug as string)
  }
  const tattoo = await waitFunc<Tattoo>(
    getT,
    5000,
    'Hubo un error recuperando el tatuaje'
  )

  return {
    props: {
      tattoo
    }
  }
}) satisfies GetStaticProps<{ tattoo: Tattoo }>
