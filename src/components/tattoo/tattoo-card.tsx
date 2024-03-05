import { Outline } from '../common/outline'
import { useState } from 'react'
import { TattooFooter } from './tattoo-footer'
import { type Tattoo } from '@/lib/types/tattoo'
import { ImageWithLoader } from '../common/image-with-loader'
import Link from 'next/link'

export function TattooCard({ tattoo }: { tattoo: Tattoo }) {
  const {
    images: {
      compressed: { src, height, width }
    },
    nombre
  } = tattoo
  const [loaded, setLoaded] = useState<boolean>(false)
  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <Link
      href={`/tatuaje/${tattoo.slug}`}
      role="button"
      aria-label="Abrir tatuaje"
    >
      <Outline className="relative group overflow-hidden cursor-pointer">
        <ImageWithLoader
          src={src}
          loading="lazy"
          fetchPriority="low"
          width={width}
          height={height}
          quality={60}
          handleLoad={handleLoad}
          alt={`${tattoo.nombre}`}
          imageClassname="rounded-[inherit] group-hover:scale-110 transition-transform duration-200 ease-out"
          loaderClassname="top-1 left-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] flex bg-gradient-to-br from-transparent via-transparent to-white/25"
        />
        <TattooFooter name={nombre} loaded={loaded} />
      </Outline>
    </Link>
  )
}
