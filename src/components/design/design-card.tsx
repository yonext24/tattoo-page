import { type Design as DesignType } from '@/lib/types/design'
import { useState } from 'react'
import { ImageWithLoader } from '../common/image-with-loader'
import { DesignFooter } from './design-footer'
import { useModalContext } from '@/hooks/useModalContext'

interface Props {
  design: DesignType
}

export function DesignCard ({ design }: Props) {
  const { image, precio } = design
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => {
    setLoaded(true)
  }
  const { dispatch } = useModalContext() ?? {}
  const handleClick = () => {
    dispatch?.({ type: 'openDesign', payload: design })
  }

  return <article onClick={handleClick} className='rounded-md cursor-pointer group overflow-hidden relative'>
    <ImageWithLoader
      src={image.src}
      alt={design.nombre}
      width={400}
      height={450}
      handleLoad={handleLoad}
      loaded={loaded}
      sizes='(max-width: 576px) 40vw, (max-width: 630px) 250px, (max-width: 971px) 30vw, 250px'
      imageClassname='rounded-[inherit] group-hover:scale-110 transition-transform duration-200 ease-out'
      loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
    />
    <DesignFooter precio={precio} loaded={loaded} />
  </article>
}
