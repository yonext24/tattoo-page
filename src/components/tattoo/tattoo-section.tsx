import { type Tattoo } from '@/lib/types/tattoo'
import Masonry from 'react-masonry-css'
import { TattooCard } from './tattoo-card'

interface Props {
  tattoos: Tattoo[] | []
}

export function TattooSection ({ tattoos }: Props) {
  return <section className='max-w-xl ml-auto overflow-x-hidden max-[630px]:max-w-none'>
      <Masonry
      breakpointCols={2}
      className={'my-masonry-grid animate-fadeRight max-[630px]:animate-fadeTop transition-[opacity,transform] duration-500 ease-out'}
      columnClassName="my-masonry-grid_column">
        {
          tattoos?.map(tattoo => <TattooCard tattoo={tattoo} key={tattoo.id} />)
        }
      </Masonry>
    </section>
}
