import CloseIcon from '@/components/icons/close-icon'

interface Props {
  closeModal: () => void
}

export function CloseModalButton ({ closeModal }: Props) {
  return <button onClick={closeModal} className='rounded-full bg-black/40 text-white absolute top-2 left-2 p-2'>
    <CloseIcon className='h-6 w-6' />
  </button>
}
