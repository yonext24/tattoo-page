/* eslint-disable react-hooks/exhaustive-deps */
import { DesignMainImage } from './design-main-image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { DesignExtraImages } from './design-extra-images'
import { Design } from '@/lib/types/design'

export function DesignImages({ images, slug }: Design) {
  const router = useRouter()
  const parsedImages = useMemo(() => {
    return [images.original, ...images.extraImages]
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
      <DesignMainImage image={currentImage} />
      <DesignExtraImages
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
