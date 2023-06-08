import { Footer } from '@/components/footer/footer'
import { Glitch } from '@/components/common/glitch'
import { Layout } from '@/components/layout/layout'
import { Outline } from '@/components/common/outline'
import { Seo } from '@/components/common/seo'
import { About } from '@/components/home/about'
import { MediaCard } from '@/components/home/media-card'
import { useFade } from '@/hooks/useFade'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'
import Image from 'next/image'
import { type ReactNode } from 'react'
import { siteURL } from '@/lib/env'

const medias = [
  { name: 'Instagram', url: 'instagram.com' },
  { name: 'Whatsapp', url: 'whatsapp.com' }
]

export default function Home () {
  const { intersected } = useFade()

  const a = getIntersectionStyles({ translate: 'translate-y-8', destranslate: 'translate-y-0', opacity: '5', intersected })
  const b = getIntersectionStyles({ translate: 'translate-x-8', destranslate: 'translate-x-0', opacity: '5', intersected })

  return <>
  <Seo
    title="Home / Neptuno Black"
    image={`${siteURL}/person.webp`}
    width='630'
    height='1200'
    imageType='image/webp'
    description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis reiciendis perspiciatis, quis maxime cum ducimus illum officiis'
  />

  <main className='flex-1 flex flex-col align-center px-6 h-max max-w-xl overflow-x-hidden max-[630px]:max-w-none'>
    <section className='h-screen w-full flex items-end justify-center flex-col max-[630px]:items-center'>
        <div className={'transition-[opacity,transform] duration-500 ease-out relative flex items-center'}>
          <div className={a + ' transition-all duration-500'}>
            <Glitch text='Alan Hernandez' className={'text-4xl self-center title text-gold [writing-mode:vertical-lr] rotate-180 top-[.28rem] left-[.15rem]'}>
              <h2 className='text-4xl title [writing-mode:vertical-lr] rotate-180'>Alan Hernandez</h2>
            </Glitch>
          </div>
          <Outline>
            <Image src='/person.webp' fetchPriority='high' priority={true} alt='Person' height={500} width={400} sizes='70vw, (min-width: 510px) 90vh, (min-width: 630px) 40vw, (min-width: 860px) 90vh' className="h-full rounded-[inherit] object-cover object-top" />
          </Outline>
        </div>
        <div className={b + ' duration-500 ease-out transition-transform grid grid-cols-2 gap-4 mt-2 w-[calc(100%-40px)] max-w-[410px] max-[630px]:pl-[40px]'}>
        {
          medias.map(el => <MediaCard key={el.name} name={el.name} url={el.url} />)
        }
        </div>
    </section>
    <About intersected={intersected} />
    <Footer />
  </main>
  </>
}
Home.getLayout = (page: ReactNode): ReactNode => <Layout>
  {page}
</Layout>
