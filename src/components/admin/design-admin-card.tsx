import { useState } from 'react'
import { ImageWithLoader } from '../common/image-with-loader'
import { DesignFooter } from '../design/design-footer'

interface Props {
  precio: string
  src: string
}

export function DesignAdminCard ({ precio, src }: Props) {
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => {
    setLoaded(true)
  }

  return <article className='rounded-md cursor-pointer group overflow-hidden relative'>
    <ImageWithLoader
      src={src}
      alt='preview image'
      width={400}
      height={450}
      handleLoad={handleLoad}
      sizes='(max-width: 576px) 40vw, (max-width: 630px) 250px, (max-width: 971px) 30vw, 250px'
      imageClassname='rounded-[inherit] group-hover:scale-110 transition-transform duration-200 ease-out'
      loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
    />
    <DesignFooter precio={precio} loaded={loaded} />
  </article>
}
