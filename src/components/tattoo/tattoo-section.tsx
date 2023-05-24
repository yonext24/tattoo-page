import { type Tattoo } from '@/lib/types/tattoo'
import Masonry from 'react-masonry-css'
import { TattooCard } from './tattoo-card'
import { Glitch } from '../common/glitch'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

interface Props {
  tattoos: Tattoo[]
  intersected: boolean
}

export function TattooSection ({ tattoos, intersected }: Props) {
  const a = getIntersectionStyles({ translate: '-translate-y-2', destranslate: 'translate-y-0', opacity: '5', intersected })
  const b = getIntersectionStyles({ translate: 'translate-x-1/4', destranslate: 'translate-x-0', opacity: '5', intersected })

  return <>
    <section className='max-w-xl ml-auto overflow-x-hidden'>
      <div className={`mb-12 mt-6 flex justify-center ${a} transition-[opacity,transform] duration-500 ease-out`}>
        <Glitch text='Tatuajes' className={'text-5xl title opacity-50 top-[0.33rem] -left-[0.33rem]'}>
          <h1 className='title text-5xl'>Tatuajes</h1>
        </Glitch>
      </div>
      <Masonry
      breakpointCols={2}
      className={`my-masonry-grid ${b} transition-[opacity,transform] duration-500 ease-out`}
      columnClassName="my-masonry-grid_column">
        {
          tattoos?.map(tattoo => <TattooCard tattoo={tattoo} key={tattoo.id} />)
        }
      </Masonry>
    </section>
  </>
}
