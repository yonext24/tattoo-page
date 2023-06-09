import { type Design as DesignType } from '@/lib/types/design'
import { DesignCard } from './design-card'
import Masonry from 'react-masonry-css'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'
import { PageHeading } from '../common/page-heading'

export function DesignSection ({ designs, intersected }: { designs: DesignType[], intersected: boolean }) {
  const b = getIntersectionStyles({ translate: 'translate-x-[10%]', destranslate: 'translate-x-0', opacity: '0', intersected })

  return <section className='max-w-xl overflow-x-hidden ml-auto max-[630px]:mx-auto'>
    <PageHeading text='Diseños' intersected={intersected} />
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
