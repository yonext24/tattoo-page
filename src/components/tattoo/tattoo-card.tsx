import { Outline } from '../common/outline'
import { useState } from 'react'
import { TattooFooter } from './tattoo-footer'
import { type Tattoo } from '@/lib/types/tattoo'
import { useModalContext } from '@/hooks/useModalContext'
import { ImageWithLoader } from '../common/image-with-loader'

export function TattooCard ({ tattoo }: { tattoo: Tattoo }) {
  const { image: { src, width, height }, nombre } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => { setLoaded(true) }

  const { dispatch } = useModalContext() ?? {}
  const handleClick = () => {
    dispatch?.({ type: 'openTattoo', payload: tattoo })
  }

  return (
    <article onClick={handleClick} role='button' aria-label='Abrir tatuaje'>
      <Outline className='relative group overflow-hidden cursor-pointer'>
        <ImageWithLoader
          src={src}
          loading='lazy'
          fetchPriority='low'
          width={width}
          height={height}
          quality={60}
          sizes='(max-width: 576px) 40vw, (max-width: 630px) 250px, (max-width: 971px) 30vw,'
          handleLoad={handleLoad}
          alt={`${tattoo.nombre} hecho en ${tattoo.lugar}`}
          loaded={loaded}
          imageClassname='rounded-[inherit] group-hover:scale-110 transition-transform duration-200 ease-out'
          loaderClassname='top-1 left-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] flex bg-gradient-to-br from-transparent via-transparent to-white/25'
        />
        <TattooFooter name={nombre} loaded={loaded} />
      </Outline>
    </article>
  )
}
