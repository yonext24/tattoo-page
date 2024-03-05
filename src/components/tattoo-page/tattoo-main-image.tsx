import { Tattoo, ImageData } from '@/lib/types/tattoo'
import { ImageWithLoader } from '../common/image-with-loader'

export function TattooMainImage({
  estilos,
  image
}: {
  estilos: Tattoo['estilos']
  image: ImageData
}) {
  return (
    <div className="rounded-md overflow-hidden relative flex flex-col-reverse">
      <div className="bg-white h-[24px] w-full justify-end text-black flex gap-y-2 px-2">
        {estilos.length > 0 ? (
          estilos.map((el) => <span key={el}>{el}</span>)
        ) : (
          <div className="w-6"></div>
        )}
      </div>
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
