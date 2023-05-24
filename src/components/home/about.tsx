import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { MediaCard } from './media-card'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

const medias = [
  { name: 'Instagram', url: 'instagram.com' },
  { name: 'Facebook', url: 'facebook.com' },
  { name: 'Whatsapp', url: 'whatsapp.com' },
  { name: 'Linkedin', url: 'linkedin.com' }
]

export function About () {
  const { fromRef, intersecting: intersected } = useIntersectionObserver({ once: true, rootMargin: '-50px' })
  const a = getIntersectionStyles({ translate: 'translate-x-1/4', destranslate: 'translate-x-0', opacity: '5', intersected })

  return <>
    <section className='py-12 gap-6 flex flex-col items-end' ref={fromRef}>
      <h2 className={`title text-4xl text-white ${a} transition-[opacity,transform] duration-500 ease-out`}>Tatuador Profesional</h2>
      <div className='max-w-lg'>
        <p className='leading-7 inline'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis reiciendis perspiciatis, quis maxime cum ducimus illum officiis voluptates cupiditate quae iure laudantium nostrum laborum fugit sint! Actualmente trabajando en</p>
        <span className='text-gold'> Guadalupe Art Studios</span>
      </div>
    </section>
    <section className='flex flex-col gap-2 items-center max-w-lg ml-auto pb-6'>

      <h3 className='text-xl title'>Redes</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {
          medias.map(el => <MediaCard key={el.name} name={el.name} url={el.url} />)
        }
      </div>
</section>
  </>
}
