import { ImageWithLoader } from '@/components/common/image-with-loader'
import { useModalLogic } from '@/hooks/useModalLogic'
import { type Design } from '@/lib/types/design'
import { useState } from 'react'

export interface DesignModalProps {
  closeModal: () => void
  design: Design
}

export default function DesignModal ({ closeModal, design }: DesignModalProps) {
  const { imageUrl } = design
  const [loaded, setLoaded] = useState<boolean>(false)
  useModalLogic({ closeModal })

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div id='modal-background' className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto' onClick={closeModal}>
      <ImageWithLoader
          url={imageUrl}
          width={1000}
          height={800}
          loaded={loaded}
          handleLoad={handleLoad}
          imageClassname='object-contain h-[90%] rounded-l-lg transition-opacity duration-300'
          loaderClassname='top-0 left-0 w-full h-full flex'
        />
    </div>
  )
}
