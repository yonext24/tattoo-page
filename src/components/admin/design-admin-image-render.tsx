import Masonry from 'react-masonry-css'
import { Spinner } from '../common/spinner'
import { type designType } from '@/reducers/designUploadReducer'
import { DesignAdminCard } from './design-admin-card'

/* eslint-disable no-extra-boolean-cast */
interface Props {
  design: designType
}

export function DesignAdminImageRender ({ design }: Props) {
  if (design.loading) {
    return <div className="w-full flex justify-center my-8">
    <Spinner className="w-8 h-8" />
  </div>
  }
  if (Boolean(design.error)) {
    return <div className='w-full flex justify-center mt-6'>
      <span className='text-red-500 text-center'>{design.error}</span>
    </div>
  }

  if (typeof design.image.url !== 'string' || typeof design.nombre !== 'string') return null

  return <div className='w-full'>

    <Masonry
    breakpointCols={2}
    className={'my-masonry-grid transition-[opacity,transform] duration-500 ease-out'}
    columnClassName="my-masonry-grid_column">
      <DesignAdminCard src={design.image.url} precio={design.precio ?? '0'} />
      <DesignAdminCard src={design.image.url} precio={design.precio ?? '0'} />
    </Masonry>

  </div>
}
