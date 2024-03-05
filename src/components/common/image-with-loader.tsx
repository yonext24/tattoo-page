/* eslint-disable jsx-a11y/alt-text */
import Image, { type ImageProps } from 'next/image'
import { Spinner } from './spinner'
import { useState } from 'react'

interface Props extends ImageProps {
  imageClassname?: string
  loaderClassname?: string
  handleLoad?: () => void
}

export function ImageWithLoader({
  handleLoad,
  imageClassname,
  loaderClassname,
  ...imageProps
}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false)

  const handleLoaded = () => {
    handleLoad?.()
    setLoaded(true)
  }

  return (
    <>
      <Image
        {...imageProps}
        style={{ opacity: !loaded ? '0' : '100' }}
        onLoadingComplete={handleLoaded}
        className={imageClassname}
      />
      {!loaded && (
        <div id="skeleton" className={`absolute ${loaderClassname ?? ''}`}>
          <Spinner className="h-8 w-8 m-auto" />
        </div>
      )}
    </>
  )
}
