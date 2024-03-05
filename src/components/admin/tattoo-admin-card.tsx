import { useState } from 'react'
import { Outline } from '../common/outline'
import { ImageWithLoader } from '../common/image-with-loader'
import { TattooFooter } from '../tattoo/tattoo-footer'

interface Props {
  url: string
  width: number
  height: number
  nombre: string
}

export function TattooAdminCard ({ url, width, height, nombre }: Props) {
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => { setLoaded(true) }

  return (
    <article>
      <Outline className='relative group overflow-hidden cursor-pointer'>
        <ImageWithLoader
          src={url}
          alt='preview card'
          width={width}
          height={height}
          sizes='(max-width: 576px) 40vw, (max-width: 630px) 250px, (max-width: 971px) 30vw,'
          handleLoad={handleLoad}
          imageClassname='rounded-[inherit] group-hover:scale-110 transition-transform duration-200 ease-out'
          loaderClassname='top-1 left-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] flex bg-gradient-to-br from-transparent via-transparent to-white/25'
        />
        <TattooFooter name={nombre} loaded={loaded} />
      </Outline>
    </article>
  )
}
