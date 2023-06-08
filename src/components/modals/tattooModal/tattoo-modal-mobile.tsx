import { ImageWithLoader } from '@/components/common/image-with-loader'
import { Outline } from '@/components/common/outline'
import { useModalContext } from '@/hooks/useModalContext'
import { useModalLogic } from '@/hooks/useModalLogic'
import { type Tattoo } from '@/lib/types/tattoo'
import { useState } from 'react'
import { CloseModalButton } from './close-modal-button'
import useUser from '@/hooks/useUser'
import { Options } from '@/components/options/options'

export default function TattooModalMobile ({ tattoo }: { tattoo: Tattoo }) {
  const { image: { src, height, width }, nombre, estilos } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => { setLoaded(true) }
  const { dispatch } = useModalContext() ?? {}
  const admin = useUser()

  const aspectRatio = `${width / height}`

  const closeModal = () => {
    dispatch?.({ type: 'closeModal' })
  }
  useModalLogic({ closeModal })

  return <>
    <div id='modal-background' onClick={closeModal}
    className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto'>
      <Outline className='max-h-[93vh] mt-0 flex flex-col gap-y-7' onClick={e => { e.stopPropagation() }}>
        <div className='relative max-h-[calc(93vh-36px-2.5rem)]' style={{ aspectRatio }}>
          <ImageWithLoader
            src={src}
            alt={nombre}
            width={width / 2}
            height={height / 2}
            loaded={loaded}
            sizes='90vh'
            handleLoad={handleLoad}
            imageClassname='object-contain max-h-full rounded-t-lg'
            loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
            />
          <div className='bg-white absolute -bottom-1 -left-1 translate-y-full w-[calc(100%+.50rem)] text-black flex gap-x-2 px-2'>
            {
              estilos.length > 0
                ? estilos.map(el => <span key={el}>{el}</span>)
                : <div className='h-6'></div>
            }
          </div>
        </div>
          <h1 className='title text-3xl text-end capitalize'>{nombre}</h1>
      </Outline>
      <CloseModalButton closeModal={closeModal}/>
      {
        Boolean(admin) &&
        <div className='absolute top-2 left-2 z-20' onClick={e => { e.stopPropagation() }}>
          <Options id={tattoo.id} />
        </div>
      }
    </div>
  </>
}
