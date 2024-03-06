import { type Design as DesignType } from '@/lib/types/design'
import { useState } from 'react'
import { ImageWithLoader } from '../common/image-with-loader'
import { DesignFooter } from './design-footer'
import Link from 'next/link'

interface Props {
  design: DesignType
}

export function DesignCard({ design }: Props) {
  const { images } = design
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <Link
      href={`/design/${design.slug}`}
      className="rounded-md cursor-pointer group overflow-hidden relative"
    >
      <ImageWithLoader
        src={images.original.src}
        alt={design.nombre}
        quality={50}
        width={images.original.width / 2}
        height={images.original.height / 2}
        handleLoad={handleLoad}
        sizes="(max-width: 576px) 40vw, (max-width: 630px) 250px, (max-width: 971px) 30vw, 250px"
        imageClassname="rounded-[inherit] group-hover:scale-110 transition-transform duration-200 ease-out"
        loaderClassname="top-0 left-0 w-full h-full flex bg-gradient-to-br from-transparent via-transparent to-white/25"
      />
      <DesignFooter loaded={loaded} />
    </Link>
  )
}
