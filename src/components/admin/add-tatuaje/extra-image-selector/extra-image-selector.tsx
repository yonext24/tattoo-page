/* eslint-disable react/display-name */
import { Button } from '@/components/ui/button'
import { forwardRef } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { ExtraImagesModal } from './extra-images-modal'
import { type AddTattooFormTypes } from '@/hooks/useUploadTattoo'
import { useExtraImagesSelector } from '@/hooks/useExtraImagesSelector'
import { Badge } from '@/components/ui/badge'

export const ExtraImagesSelector = forwardRef(
  (
    {
      onChange
    }: {
      value: AddTattooFormTypes['extra_images']
      onChange: (data: any) => void
    },
    ref
  ) => {
    const {
      moveToLeft,
      moveToRight,
      deleteImage,
      handleImageAdd,
      modalOpen,
      setModalOpen,
      images
    } = useExtraImagesSelector({ onChange, ref })

    return (
      <>
        <Button
          type="button"
          variant={'outline'}
          className="flex gap-2"
          onClick={() => {
            setModalOpen(true)
          }}
        >
          <label>Imágenes extra</label>
          {images.length > 0 && <Badge>+{images.length}</Badge>}
        </Button>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <ExtraImagesModal
            deleteImage={deleteImage}
            handleImageAdd={handleImageAdd}
            images={images}
            moveToLeft={moveToLeft}
            moveToRight={moveToRight}
          />
        </Dialog>
      </>
    )
  }
)
