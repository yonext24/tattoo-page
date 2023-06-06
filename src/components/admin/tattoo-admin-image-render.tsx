import Masonry from 'react-masonry-css'
import { Spinner } from '../common/spinner'
import { TattooAdminCard } from './tattoo-admin-card'
import { type tattooType } from '@/reducers/tattooUploadReducer'

/* eslint-disable no-extra-boolean-cast */
interface Props {
  tattoo: tattooType
}

export function TattooAdminImageRender ({ tattoo }: Props) {
  if (tattoo.loading) {
    return <div className="w-full flex justify-center my-8">
    <Spinner className="w-8 h-8" />
  </div>
  }
  if (Boolean(tattoo.error)) {
    return <div className='w-full flex justify-center mt-6'>
      <span className='text-red-500 text-center'>{tattoo.error}</span>
    </div>
  }

  if (typeof tattoo.image.url !== 'string' || typeof tattoo.image.height !== 'number' || typeof tattoo.image.width !== 'number' || typeof tattoo.nombre !== 'string') return null

  return <div className='w-full'>

    <Masonry
    breakpointCols={2}
    className={'my-masonry-grid transition-[opacity,transform] duration-500 ease-out'}
    columnClassName="my-masonry-grid_column">
      <TattooAdminCard url={tattoo.image.url} height={tattoo.image.height} width={tattoo.image.width} nombre={tattoo.nombre} />
      <TattooAdminCard url={tattoo.image.url} height={tattoo.image.height} width={tattoo.image.width} nombre={tattoo.nombre} />
    </Masonry>

  </div>
}
