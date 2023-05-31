import { type Tattoo } from '@/lib/types/tattoo'
import Masonry from 'react-masonry-css'
import { TattooCard } from './tattoo-card'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

interface Props {
  tattoos: Tattoo[] | []
  intersected: boolean
}

export function TattooSection ({ tattoos, intersected }: Props) {
  const masStyles = getIntersectionStyles({ translate: 'translate-x-[10%]', destranslate: 'translate-x-0', opacity: '0', intersected })

  return <section className='max-w-xl ml-auto overflow-x-hidden max-[630px]:max-w-none'>
      <Masonry
      breakpointCols={2}
      className={`my-masonry-grid ${masStyles} transition-[opacity,transform] duration-500 ease-out`}
      columnClassName="my-masonry-grid_column">
        {
          tattoos?.map(tattoo => <TattooCard tattoo={tattoo} key={tattoo.id} />)
        }
      </Masonry>
    </section>
}
