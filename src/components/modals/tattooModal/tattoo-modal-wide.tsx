import { ImageWithLoader } from '@/components/common/image-with-loader'
import { Logo } from '@/components/common/logo'
import { useModalContext } from '@/hooks/useModalContext'
import { useModalLogic } from '@/hooks/useModalLogic'
import { type Tattoo } from '@/lib/types/tattoo'
import { useState } from 'react'

export interface TattooModalProps {
  tattoo: Tattoo
}

const TattooModal: React.FC<TattooModalProps> = ({ tattoo }) => {
  const { imagesData: { original: { url, height, width } }, nombre, descripcion, estilos, lugar, duracion } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 2000)
  }
  const aspectRatio = width / height

  const { dispatch } = useModalContext() ?? {}

  const closeModal = () => {
    dispatch?.({ type: 'closeModal' })
  }
  useModalLogic({ closeModal })

  return <div id='modal-background' className='fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md flex items-center justify-center' onClick={closeModal}>
    <div onClick={e => { e.stopPropagation() }} className='flex h-[90%] w-11/12 max-w-5xl p-1 border-2 border-white mt-2 rounded-lg justify-center'>

      <div className={'relative'} style={{ aspectRatio }}>
        <ImageWithLoader
          url={url}
          width={width / 2}
          height={height / 2}
          loaded={loaded}
          handleLoad={handleLoad}
          imageClassname='object-contain h-full rounded-l-lg'
          loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
        />
      </div>
      <div className='flex-1 py-4 px-6 relative'>
        <h2 className='text-end title text-5xl mb-3'>{nombre}</h2>
        <div className='max-w-xs ml-auto'>
          <p className='max-w-xs text-end ml-auto inline'>{descripcion}.
          </p>
          <span className='inline text-gold'> Hecho en {lugar} en una duración de {duracion}</span>
        </div>
        <div className='bg-white absolute bottom-0 left-1 h-full justify-end [&>span]:[writing-mode:vertical-lr] text-black flex flex-col rounded-sm gap-y-2 py-2'>
          {
            estilos.map(el => <span key={el}>{el}</span>)
          }
        </div>
        <div className='absolute bottom-2 right-2'>
          <Logo className='w-20' />
        </div>
      </div>
    </div>

  </div>
}

export default TattooModal
