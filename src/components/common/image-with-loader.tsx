import Image, { type ImageProps } from 'next/image'
import { Spinner } from './spinner'

interface Props extends ImageProps {
  imageClassname?: string
  loaderClassname?: string
  handleLoad: () => void
  loaded: boolean
}

export function ImageWithLoader ({ loaded, handleLoad, imageClassname, loaderClassname, ...imageProps }: Props) {
  return <>
    <Image
      {...imageProps}
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
