import { type Design as DesignType } from '@/lib/types/design'
import { DesignCard } from './design-card'
import Masonry from 'react-masonry-css'
import { Glitch } from '../common/glitch'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

export function DesignSection ({ designs, intersected }: { designs: DesignType[], intersected: boolean }) {
  const a = getIntersectionStyles({ translate: '-translate-y-1/4', destranslate: 'translate-y-0', opacity: '0', intersected })
  const b = getIntersectionStyles({ translate: 'translate-x-[10%]', destranslate: 'translate-x-0', opacity: '0', intersected })

  return <section className='max-w-xl overflow-x-hidden ml-auto'>
    <div className={`mb-12 mt-6 flex justify-center ${a} transition-[opacity,transform] duration-500 ease-out`}>
        <Glitch text='Diseños' className={'text-5xl title opacity-50 top-[0.33rem] -left-[0.33rem] text-gold'}>
          <h1 className='title text-5xl'>Diseños</h1>
        </Glitch>
      </div>
    <Masonry
      breakpointCols={2}
      className={`my-masonry-grid ${b} transition-[opacity,transform] duration-500 ease-out`}
      columnClassName="my-masonry-grid_column">
      {
        designs.map(el => <DesignCard key={el.id} design={el} />)
      }
    </Masonry>
  </section>
}
