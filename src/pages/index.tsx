import { Footer } from '@/components/footer/footer'
import { Glitch } from '@/components/common/glitch'
import { Layout } from '@/components/layout/layout'
import { Outline } from '@/components/common/outline'
import { Seo } from '@/components/common/seo'
import { About } from '@/components/home/about'
import { MediaCard } from '@/components/home/media-card'
import Image from 'next/image'
import { type ReactNode } from 'react'
import { siteURL } from '@/lib/env'
import { defaultDesc } from '@/lib/consts'

const medias = [
  { name: 'Instagram', url: 'https://www.instagram.com/alan.h.tattoo/' },
  { name: 'Whatsapp', url: 'https://www.whatsapp.com' }
]

export default function Home () {
  return <>
  <Seo
    title="Neptuno Black Tatuajes Lanús"
    image={`${siteURL}/person.webp`}
    width='630'
    height='1200'
    imageType='image/webp'
    description={`Alan Hernandez, plasmando arte en la piel desde 2018. ${defaultDesc}`}
  />

  <main className='flex-1 flex flex-col align-center px-6 h-max max-w-xl overflow-x-hidden max-[630px]:max-w-none'>
    <section className='h-screen w-full flex items-end justify-center flex-col max-[630px]:items-center'>
        <div className={'transition-[opacity,transform] duration-500 ease-out relative flex items-center'}>
          <div className={'animate-fadeTop transition-all duration-500'}>
            <Glitch text='Alan Hernandez' className={'text-4xl self-center title text-gold [writing-mode:vertical-lr] rotate-180 top-[.28rem] left-[.15rem]'}>
              <h2 className='text-4xl title [writing-mode:vertical-lr] rotate-180'>Alan Hernandez</h2>
            </Glitch>
          </div>
          <Outline>
            <Image src='/alan.jfif' fetchPriority='high' priority={true} alt='Person' height={500} width={401} className="h-full rounded-[inherit] object-cover object-top" />
          </Outline>
        </div>
        <div className={'animate-fadeRight duration-500 ease-out transition-transform grid grid-cols-2 gap-4 mt-2 w-[calc(100%-40px)] max-w-[410px] max-[630px]:pl-[40px]'}>
        {
          medias.map(el => <MediaCard key={el.name} name={el.name} url={el.url} />)
        }
        </div>
    </section>
    <About />
    <a className='text-xs group text-end text-neutral-500 -mb-5' href='https://yonathan-portfolio.netlify.app/' target='_blank' rel='noopener noreferrer'>
      Page made by
      <span className='group-hover:underline'> Jonathan Picone</span>
    </a>
    <Footer />

  </main>
  </>
}
Home.getLayout = (page: ReactNode): ReactNode => <Layout>
  {page}
</Layout>
