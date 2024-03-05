/* eslint-disable react-hooks/exhaustive-deps */
import { Tattoo } from '@/lib/types/tattoo'
import { TattooMainImage } from './tattoo-main-image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { TattooExtraImages } from './tattoo-extra-images'

export function TattooImages({ images, estilos, slug }: Tattoo) {
  const router = useRouter()
  const parsedImages = useMemo(() => {
    return [images.original, ...images.extra]
  }, [])

  const [currentIndex, setCurrentIndex] = useState<number>(1)

  useEffect(() => {
    if (!router.query.image) return
    const image = router.query.image

    const parsed = !isNaN(Number(image)) ? Number(image) : 1
    const isValid = parsed >= 1 && parsed <= parsedImages.length
    setCurrentIndex(isValid ? parsed : 1)
  }, [router.query.image])

  const currentImage = useMemo(() => {
    return parsedImages[currentIndex - 1]
  }, [currentIndex])

  return (
    <div className="flex flex-col gap-2">
      <TattooMainImage estilos={estilos} image={currentImage} />
      <TattooExtraImages
        slug={slug}
        images={parsedImages}
        handleImageChange={(n: number) => {
          setCurrentIndex(n)
        }}
        selectedIndex={currentIndex}
      />
    </div>
  )
}
