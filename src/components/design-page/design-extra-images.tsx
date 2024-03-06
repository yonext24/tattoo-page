import { Tattoo } from '@/lib/types/tattoo'
import { cn } from '@/lib/utils'
import { ExtraImagesCard } from './extra-image-card'
import { useRouter } from 'next/router'
import { Design } from '@/lib/types/design'

export function DesignExtraImages({
  images,
  selectedIndex,
  handleImageChange,
  slug
}: {
  slug: string
  handleImageChange: (n: number) => void
  images: Design['images']['extraImages']
  selectedIndex: number
}) {
  const router = useRouter()
  if (images.length <= 1) return null

  return (
    <div className={cn('flex gap-4 flex-wrap justify-end min-h-[96px]')}>
      {images.map((img, i) => {
        return (
          <ExtraImagesCard
            key={img.src}
            {...img}
            isSelected={selectedIndex === i + 1}
            handleClick={() => {
              if (selectedIndex === i + 1) return
              handleImageChange(i + 1)
              router.replace(`/design/${slug}?image=${i + 1}`, undefined, {
                shallow: true,
                scroll: false
              })
            }}
          />
        )
      })}
    </div>
  )
}
