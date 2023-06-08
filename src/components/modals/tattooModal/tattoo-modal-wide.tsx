import { ImageWithLoader } from '@/components/common/image-with-loader'
import { Logo } from '@/components/common/logo'
import { Options } from '@/components/options/options'
import { useModalContext } from '@/hooks/useModalContext'
import { useModalLogic } from '@/hooks/useModalLogic'
import useUser from '@/hooks/useUser'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import { useState } from 'react'

const TattooModal: React.FC<TattooModalProps> = ({ tattoo }) => {
  const { image: { src, height, width }, nombre, descripcion, estilos, lugar, duracion } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const admin = useUser()
  const handleLoad = () => {
    setLoaded(true)
  }
  const aspectRatio = width / height
  const finalDesc = descripcion !== '' ? descripcion + '.' : descripcion

  const { dispatch } = useModalContext() ?? {}

  const closeModal = () => {
    dispatch?.({ type: 'closeModal' })
  }
  useModalLogic({ closeModal })

  return <div id='modal-background' className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto' onClick={closeModal}>
    <div onClick={e => { e.stopPropagation() }} className='flex relative h-[90%] w-11/12 max-w-5xl p-1 border-2 border-white mt-2 rounded-lg justify-center
    max-[790px]:w-full max-[730px]:h-[82%]'>
      <div className={'relative imageAspect'} style={{ aspectRatio }}>
        <ImageWithLoader
          src={src}
          alt={nombre}
          width={width / 2}
          height={height / 2}
          loaded={loaded}
          sizes='90vh'
          handleLoad={handleLoad}
          imageClassname='object-contain h-full rounded-l-lg'
          loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
        />
      </div>
      <div className='flex-1 py-4 px-6 relative pl-8 min-w-[278px] max-[770px]:pr-px '>
        <h2 className='text-end title text-5xl mb-3 max-[770px]:text-center max-[665px]:text-4xl capitalize'>{nombre}</h2>
        <div className='max-w-xs ml-auto max-[830px]:pr-px text-center'>
          <p className='max-w-xs ml-auto inline max-[665px]:text-sm'>{finalDesc}
            <span className='inline text-gold'> Hecho en {lugar} en una duración de {duracion}</span>
          </p>
        </div>
        <div className='bg-white absolute -bottom-1 left-1 h-[calc(100%+.5rem)] justify-end [&>span]:[writing-mode:vertical-lr] text-black flex flex-col gap-y-2 py-2'>
          {
            estilos.length > 0
              ? estilos.map(el => <span key={el}>{el}</span>)
              : <div className='w-6'></div>
          }
        </div>
        <div className='absolute bottom-2 right-2'>
          <Logo brightness='[20]' className='w-20' />
        </div>
      </div>
      {
        Boolean(admin) &&
        <div className='absolute top-4 left-4 z-20'>
          <Options id={tattoo.id} />
        </div>
      }
    </div>

  </div>
}

export default TattooModal
