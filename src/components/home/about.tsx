import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

export function About ({ intersected }: { intersected: boolean }) {
  const b = getIntersectionStyles({ translate: 'translate-x-8', destranslate: 'translate-x-0', opacity: '5', intersected })

  return <>
    <section className='py-12 gap-6 flex flex-col items-end'>
      <h2 className={`title text-4xl text-white ${b} transition-[opacity,transform] duration-500 ease-out text-end`}>Tatuador Profesional</h2>
      <div className='max-w-lg text-end'>
        <p className='leading-7 inline'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis reiciendis perspiciatis, quis maxime cum ducimus illum officiis voluptates cupiditate quae iure laudantium nostrum laborum fugit sint! Actualmente trabajando en</p>
        <span className='text-gold'> Guadalupe Art Studios</span>
      </div>

      <div className='max-w-lg text-end'>
        <p>Actualmente tatuando en Lanús y residiendo en Quilmes.</p>
      </div>
    </section>
  </>
}
