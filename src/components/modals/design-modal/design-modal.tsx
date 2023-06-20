import { ImageWithLoader } from '@/components/common/image-with-loader'
import { MediaCard } from '@/components/home/media-card'
import { Options } from '@/components/options/options'
import { useModalLogic } from '@/hooks/useModalLogic'
import useUser from '@/hooks/useUser'
import { type Design } from '@/lib/types/design'
import { useState } from 'react'

export interface DesignModalProps {
  closeModal: () => void
  design: Design
}

export default function DesignModal ({ closeModal, design }: DesignModalProps) {
  const { image: { src } } = design
  const [loaded, setLoaded] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  useModalLogic({ closeModal })
  const admin = useUser()

  const copyHandler = async () => {
    await navigator.clipboard.writeText(`https://neptunoblack.vercel.app/designs?design=${design.id}`)
    setCopied(true)
  }

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div id='modal-background' className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-sm flex items-center justify-center overflow-auto' onClick={closeModal}>
      <div className='relative w-max' onClick={e => { e.stopPropagation() }}>
        <ImageWithLoader
            src={src}
            alt={design.nombre}
            width={1000}
            height={800}
            loaded={loaded}
            handleLoad={handleLoad}
            imageClassname='object-contain h-full rounded-lg transition-opacity duration-300 w-auto max-h-[90vh]'
            loaderClassname='top-0 left-0 w-full h-full flex'
        />
        <div
        style={{ opacity: loaded ? '1' : '0' }}
        className='w-full mb-1 px-1 grid grid-cols-2 justify-end items-end gap-2 absolute bottom-0 z-10 transition-opacity'>
          <button
            onClick={() => { void copyHandler() }}
            className={`border-y rounded-md py-2 border-black flex justify-center items-center transition-all relative overflow-hidden group hover:after:left-0 max-[730px]:text-sm ${copied ? 'hover:border-green-800' : 'hover:border-gold'}
            ${copied ? 'after:bg-green-600' : 'after:bg-gold'} after:h-full after:w-full after:absolute after:-left-full after:-z-10 after:pointer-events-none after:transition-all after:ease-in-out after:duration-300`}>
            <span className={`title relative z-0 ${copied ? 'text-green-700' : ''} text-black transition-colors text-center`}>
              {
                copied
                  ? 'Link copiado'
                  : 'Copiar link de diseño'
              }
            </span>
          </button>
          <MediaCard styles={{ borderColor: 'black' }} name='Consultar en whatsapp' className='py-2 after:top-0 max-[730px]:text-sm [border-width:1px_0_1px_0] rounded-md text-black border-black' url={`https://api.whatsapp.com/send?phone=541164748262&text=Hola, quiero consultar por este diseño: https://neptunoblack.vercel.app/designs?design=${design.id}`} />
        </div>
        {
          Boolean(admin) &&
          <div onClick={e => { e.stopPropagation() }} className='absolute top-4 left-4 z-20'>
            <Options id={design.id} isDesign />
          </div>
        }
      </div>
    </div>
  )
}
