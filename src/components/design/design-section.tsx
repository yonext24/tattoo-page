import { type Design as DesignType } from '@/lib/types/design'
import { DesignCard } from './design-card'
import Masonry from 'react-masonry-css'

export function DesignSection ({ designs }: { designs: DesignType[] }) {
  return <section className='max-w-xl overflow-x-hidden ml-auto max-[630px]:mx-auto'>
    <Masonry
      breakpointCols={2}
      className={'my-masonry-grid animate-fadeRight max-[630px]:animate-fadeTop transition-[opacity,transform] duration-500 ease-out'}
      columnClassName="my-masonry-grid_column">
      {
        designs.map(el => <DesignCard key={el.id} design={el} />)
      }
    </Masonry>
  </section>
}
