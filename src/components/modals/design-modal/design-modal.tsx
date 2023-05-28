interface Props {
  closeModal: () => void
}

export function DesignModal ({ closeModal }: Props) {
  return (
    <div id='modal-background' className='fixed z-10 top-0 left-0 w-full h-full bg-black/80 supports-[backdrop-blur]:bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto' onClick={closeModal}>
    </div>
  )
}
