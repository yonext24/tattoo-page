import { ImageWithLoader } from '@/components/common/image-with-loader'
import { Logo } from '@/components/common/logo'
import { MediaCard } from '@/components/home/media-card'
import { Options } from '@/components/options/options'
import { useModalContext } from '@/hooks/useModalContext'
import { useModalLogic } from '@/hooks/useModalLogic'
import useUser from '@/hooks/useUser'
import { type TattooModalProps } from '@/lib/types/tattooModal'
import { useState } from 'react'

const TattooModal: React.FC<TattooModalProps> = ({ tattoo }) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const copyHandler = async () => {
    await navigator.clipboard.writeText(`https://neptunoblack.vercel.app/busqueda?tattoo=${tattoo.id}`)
    setCopied(true)
  }

  const { image: { src, height, width }, nombre, descripcion, estilos, lugar, duracion } = tattoo
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
      <div className={'relative max-[1000px]:max-w-[406px] max-w-[450px] imageAspect'} style={{ aspectRatio }}>
        <ImageWithLoader
          src={src}
          alt={nombre}
          width={width / 2}
          height={height / 2}
          loaded={loaded}
          sizes='90vh'
          handleLoad={handleLoad}
          imageClassname='object-cover h-full rounded-l-lg'
          loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
        />
      </div>
      <div className='flex flex-col flex-1 py-4 px-6 relative pl-8 min-w-[278px] max-[770px]:pr-px '>
        <h2 className='text-end title text-5xl mb-3 max-[770px]:text-center max-[665px]:text-4xl capitalize'>{nombre}</h2>
        <div className='max-w-xs ml-auto max-[830px]:pr-px text-center'>
          <p className='max-w-xs ml-auto inline max-[665px]:text-sm'>{finalDesc}
            <span className='inline text-gold'> Hecho en {lugar} en una duración de {duracion}</span>
          </p>
        </div>
        <div className='mt-auto ml-4 grid grid-cols-2 mb-8 max-[770px]:ml-0 justify-end items-end gap-2'>
          <button
            onClick={() => { void copyHandler() }}
            className={`border py-2 border-white flex justify-center items-center transition-all relative overflow-hidden group hover:after:left-0 max-[730px]:text-sm ${copied ? 'hover:border-green-800' : 'hover:border-gold'}
            ${copied ? 'after:bg-green-600' : 'after:bg-gold'} after:h-full after:w-full after:absolute after:-left-full after:-z-10 after:pointer-events-none after:transition-all after:ease-in-out after:duration-300`}>
            <span className={`title relative z-0 ${copied ? 'text-green-400' : ''} group-hover:text-black transition-colors text-center`}>
              {
                copied
                  ? 'Link copiado correctamente'
                  : 'Copiar link de tatuaje'
              }
            </span>
          </button>
          <MediaCard name='Consultar por whatsapp' url={`https://api.whatsapp.com/send?phone=541164748262&text=Hola, quiero consultar por este tatuaje: https://neptunoblack.vercel.app/busqueda?tattoo=${tattoo.id}`} className='py-2 px-0 after:top-0 max-[730px]:text-sm' />
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
