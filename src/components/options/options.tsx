import { useState } from 'react'
import OptionsIcon from '../icons/options-icon'
import { OptionsBox } from './options-box'
import { DeleteModal } from './delete-modal'
import { siteURL } from '@/lib/env'

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
    const string = !isDesign
      ? `${siteURL}/busqueda?tattoo=${id}`
      : `${siteURL}/designs?design=${id}`
    await navigator.clipboard.writeText(string).then(() => { setOpen(false) })
  }

  return <>
  <div className='relative'>
    <button onClick={(e) => { setOpen(prev => !prev) }} className={`p-2 bg-black/40 ${isDesign ? 'bg-white' : ''} rounded-full group transition-colors`}>
      <OptionsIcon className={`w-7 h-7 transition-colors ${isDesign ? 'text-black' : 'text-white'}`} />
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
