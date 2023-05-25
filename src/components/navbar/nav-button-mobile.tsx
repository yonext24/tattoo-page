import MenuIcon from '../icons/menu-icon'

interface Props {
  isOpen?: boolean
  handleOpen?: () => void
}

export function NavButtonMobile ({ isOpen, handleOpen }: Props) {
  return <button onClick={handleOpen}>
    <MenuIcon className='w-7 h-7' />
  </button>
}
