import { useModalContext } from '@/hooks/useModalContext'
import { deleteDesign, deleteTattoo } from '@/lib/firebase/utils'
import { useRouter } from 'next/router'

interface Props {
  close: () => void
  isDesign: boolean
}

export function DeleteModal ({ close, isDesign }: Props) {
  const { state } = useModalContext() ?? {}
  const router = useRouter()
  const onDelete = async () => {
    if (isDesign) {
      const design = state?.design
      if (design === undefined || design === null) return
      await deleteDesign(design.id, design.image)
    } else {
      const tattoo = state?.tattoo
      if (tattoo === undefined || tattoo === null) return
      await deleteTattoo(tattoo.id, tattoo.image)
        .then(() => {
          router.reload()
        })
    }
  }

  return <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black/50" id='modalBackground' onClick={close}>
    <div className="bg-neutral-900 flex flex-col gap-y-4 p-4 rounded-lg">
      <h3 className='text-xl font-bold'>Querés borrar este {isDesign ? 'diseño' : 'tatuaje'}?</h3>
      <div className="flex [&>button]:p-2 [&>button]:flex-1 [&>button:nth-of-type(1)]:bg-red-500 [&>button]:rounded-sm">
        <button name='Borrar' onClick={() => { void onDelete() }}>Borrar</button>
        <button name='Cancelar'>Cancelar</button>
      </div>
    </div>
  </div>
}
