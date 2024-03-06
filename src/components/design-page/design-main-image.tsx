import { ImageData } from '@/lib/types/tattoo'
import { ImageWithLoader } from '../common/image-with-loader'

export function DesignMainImage({ image }: { image: ImageData }) {
  return (
    <div className="rounded-md overflow-hidden relative flex flex-col-reverse">
      <ImageWithLoader
        quality={80}
        src={image.src}
        alt={'Imágen de tatuaje'}
        height={image.height}
        width={image.width}
        loaderClassname="top-1 left-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] flex bg-gradient-to-br from-transparent via-transparent to-white/25"
      />
    </div>
  )
}
