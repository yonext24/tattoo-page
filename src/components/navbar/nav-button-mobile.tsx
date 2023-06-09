import MenuIcon from '../icons/menu-icon'

interface Props {
  isOpen?: boolean
  handleOpen?: () => void
}

export function NavButtonMobile ({ isOpen, handleOpen }: Props) {
  return <button name='Abrir ventana de navegación' aria-label='Abrir ventana de navegación' onClick={handleOpen}>
    <MenuIcon className='w-7 h-7' />
  </button>
}
