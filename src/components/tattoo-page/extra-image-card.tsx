import { cn } from '@/lib/utils'
import { ImageWithLoader } from '../common/image-with-loader'
import { ImageData } from '@/lib/types/tattoo'

export function ExtraImagesCard({
  src,
  isSelected,
  handleClick
}: ImageData & { handleClick: () => void; isSelected: boolean }) {
  return (
    <article
      role="button"
      className={cn(
        'border select-none overflow-hidden relative rounded-lg p-0.5 transition-colors h-24 w-24',
        'after:absolute after:transition-colors after:top-0 after:left-0 after:w-full after:h-full',
        isSelected ? 'border-white' : 'border-transparent',
        isSelected && 'after:bg-black/50',
        !isSelected && 'hover:after:bg-black/20'
      )}
      onClick={handleClick}
    >
      <ImageWithLoader
        width={96}
        height={96}
        className="rounded-lg"
        alt="Imágen de tatuaje"
        src={src}
      />
    </article>
  )
}
