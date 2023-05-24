import { Glitch } from '@/components/common/glitch'
import { Layout } from '@/components/common/layout'
import { Outline } from '@/components/common/outline'
import { Seo } from '@/components/common/seo'
import { About } from '@/components/home/about'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'
import Image from 'next/image'
import { type ReactNode } from 'react'

export default function Home () {
  const { fromRef, intersecting: intersected } = useIntersectionObserver({ once: true })

  const a = getIntersectionStyles({ translate: 'translate-y-1/3', destranslate: 'translate-y-0', opacity: '5', intersected })
  const b = getIntersectionStyles({ translate: 'translate-x-4', destranslate: 'translate-x-0', opacity: '5', intersected })

  return <>
  <Seo title="Neptuno Black Tattoos" />
  <main className='flex-1 flex flex-col align-center px-6 h-max overflow-x-hidden' ref={fromRef}>
    <section className='h-screen w-full flex items-center justify-end'>
      <div className={a + ' transition-[opacity,transform] duration-500 ease-out'}>
        <Glitch text='Alan Hernandez' className='text-4xl title [writing-mode:vertical-lr] rotate-180 top-[.28rem] left-[.15rem]'>
          <h2 className='text-4xl title [writing-mode:vertical-lr] rotate-180'>Alan Hernandez</h2>
        </Glitch>
      </div>
      <div className={b + ' transition-[opacity,transform] duration-500 ease-out'}>
        <Outline>
          <Image src='/person.webp' priority={true} alt='Person' height={800} width={400} className="h-full rounded-[inherit] object-cover object-top" />
        </Outline>
      </div>
    </section>
    <About />
  </main>
  </>
}
Home.getLayout = (page: ReactNode): ReactNode => <Layout>
  {page}
</Layout>
