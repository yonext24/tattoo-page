import { useState } from 'react'
import OptionsIcon from '../icons/options-icon'
import { OptionsBox } from './options-box'
import { DeleteModal } from './delete-modal'

export function Options ({ id, isDesign = false }: { id: string, isDesign?: boolean }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteHandler = () => {
    setOpen(false)
    setIsDeleting(true)
  }
  const closeDelete = () => {
    setIsDeleting(false)
  }
  const linkHandler = async () => {
    await navigator.clipboard.writeText(`https://tattoo-page-gamma.vercel.app/busqueda?tattoo=${id}`).then(() => { setOpen(false) })
  }

  return <>
  <div className='relative'>
    <button onClick={() => { setOpen(true) }} className={`p-2 hover:bg-black/40 ${isDesign ? 'bg-white' : ''} rounded-full group transition-colors`}>
      <OptionsIcon className="w-7 h-7 text-black group-hover:text-white transition-colors" />
    </button>
    {
      open && <OptionsBox deleteHandler={deleteHandler} linkHandler={linkHandler} isDesign={isDesign} />
    }
  </div>
  {
    isDeleting && <DeleteModal close={closeDelete} isDesign={isDesign} />
  }
  </>
}
