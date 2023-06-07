import { ImageWithLoader } from '@/components/common/image-with-loader'
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
  useModalLogic({ closeModal })
  const admin = useUser()

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div id='modal-background' className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-sm flex items-center justify-center overflow-auto' onClick={closeModal}>
      <div className='relative h-[90%] w-max'>
        <ImageWithLoader
            url={src}
            width={1000}
            height={800}
            loaded={loaded}
            handleLoad={handleLoad}
            imageClassname='object-contain h-full rounded-lg transition-opacity duration-300 w-auto'
            loaderClassname='top-0 left-0 w-full h-full flex'
        />
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
