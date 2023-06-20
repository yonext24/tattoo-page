import { ImageWithLoader } from '@/components/common/image-with-loader'
import { Outline } from '@/components/common/outline'
import { useModalContext } from '@/hooks/useModalContext'
import { useModalLogic } from '@/hooks/useModalLogic'
import { type Tattoo } from '@/lib/types/tattoo'
import { useState } from 'react'
import { CloseModalButton } from './close-modal-button'
import useUser from '@/hooks/useUser'
import { Options } from '@/components/options/options'
import { MediaCard } from '@/components/home/media-card'

export default function TattooModalMobile ({ tattoo }: { tattoo: Tattoo }) {
  const { image: { src, height, width }, nombre, estilos } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const handleLoad = () => { setLoaded(true) }
  const { dispatch } = useModalContext() ?? {}
  const admin = useUser()
  const aspectRatio = `${width / height}`

  const copyHandler = async () => {
    await navigator.clipboard.writeText(`https://neptunoblack.vercel.app/busqueda?tattoo=${tattoo.id}`)
    setCopied(true)
  }
  const closeModal = () => {
    dispatch?.({ type: 'closeModal' })
  }
  useModalLogic({ closeModal })

  return <>
    <div id='modal-background' onClick={closeModal}
    className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto'>
      <Outline className='max-h-[94vh] mt-0 flex flex-col gap-y-7' onClick={e => { e.stopPropagation() }}>
        <div className='relative max-h-[calc(93vh-36px-2.5rem)]' style={{ aspectRatio }}>
          <ImageWithLoader
            src={src}
            alt={nombre}
            width={width / 2}
            height={height / 2}
            loaded={loaded}
            sizes='90vh'
            handleLoad={handleLoad}
            imageClassname='object-cover max-h-full rounded-t-lg'
            loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
            />
          <div className='bg-white absolute -bottom-1 -left-1 translate-y-full w-[calc(100%+.50rem)] text-black flex gap-x-2 px-2 overflow-hidden'>
            {
              estilos.length > 0
                ? estilos.map(el => <span key={el}>{el}</span>)
                : <div className='h-6'></div>
            }
          </div>
        </div>
        <div className='mt-auto pt-1 ml-4 grid grid-cols-2 max-[770px]:ml-0 justify-end items-end gap-2'>
          <button
            onClick={() => { void copyHandler() }}
            className={`border-y rounded-md py-2 border-white flex justify-center items-center transition-all relative overflow-hidden group hover:after:left-0 max-[730px]:text-sm ${copied ? 'hover:border-green-800' : 'hover:border-gold'}
            ${copied ? 'after:bg-green-600' : 'after:bg-gold'} after:h-full after:w-full after:absolute after:-left-full after:-z-10 after:pointer-events-none after:transition-all after:ease-in-out after:duration-300`}>
            <span className={`title relative z-0 ${copied ? 'text-green-400' : ''} group-hover:text-black transition-colors text-center`}>
              {
                copied
                  ? 'Link copiado'
                  : 'Copiar link de tattoo'
              }
            </span>
          </button>
          <MediaCard name='Consultar en whatsapp' className='py-2 px-0 after:top-0 max-[730px]:text-sm [border-width:1px_0_1px_0] rounded-md' url={`https://api.whatsapp.com/send?phone=541164748262&text=Hola, quiero consultar por este tatuaje: https://neptunoblack.vercel.app/busqueda?tattoo=${tattoo.id}`} />
        </div>
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
