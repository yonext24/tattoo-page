import { ImageWithLoader } from '@/components/common/image-with-loader'
import { useModalContext } from '@/hooks/useModalContext'
import { useModalLogic } from '@/hooks/useModalLogic'
import { type Tattoo } from '@/lib/types/tattoo'
import { useState } from 'react'

export default function TattooModalMobile ({ tattoo }: { tattoo: Tattoo }) {
  const { imagesData: { original: { url, height, width } } } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 2000)
  }
  const { dispatch } = useModalContext() ?? {}

  const closeModal = () => {
    dispatch?.({ type: 'closeModal' })
  }
  useModalLogic({ closeModal })

  return <>
    <div id='modal-background' className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto'>
      <ImageWithLoader
        url={url}
        width={width / 2}
        height={height / 2}
        loaded={loaded}
        handleLoad={handleLoad}
        imageClassname='object-contain h-[90%] rounded-l-lg'
        loaderClassname='top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25'
      />
    </div>
  </>
}
