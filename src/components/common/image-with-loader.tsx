import Image from 'next/image'
import { Spinner } from './spinner'

interface Props {
  loaded: boolean
  handleLoad: () => void
  url: string
  width: number
  height: number
  sizes?: string
  imageClassname?: string
  loaderClassname?: string
}

export function ImageWithLoader ({ loaded, handleLoad, url, width, height, imageClassname, loaderClassname, sizes }: Props) {
  return <>
    <Image
      src={url}
      alt='image'
      width={width}
      height={height}
      sizes={sizes}
      loading='lazy'
      style={{ opacity: !loaded ? '0' : '100' }}
      onLoadingComplete={handleLoad}
      className={imageClassname}
    />
    {
      !loaded && (
        <div
          id='skeleton'
          className={`absolute ${loaderClassname ?? ''}`}
        >
          <Spinner className='h-8 w-8 m-auto' />
        </div>
      )
    }
  </>
}
