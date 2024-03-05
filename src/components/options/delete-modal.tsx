import { deleteDesign, deleteTattoo } from '@/lib/firebase/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
  closeModal: () => void
  isDesign: boolean
  id: string
}

export function DeleteModal({ closeModal, isDesign, id }: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const onDelete = async () => {
    setLoading(true)
    if (isDesign) {
      if (!id) return
      await deleteDesign(id).finally(() => {
        setLoading(false)
      })
    } else {
      if (!id) return
      await deleteTattoo(id)
        .then(() => {
          router.replace('/')
          closeModal()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div className="bg-neutral-900 flex flex-col gap-y-4 p-4 rounded-lg">
      <h3 className="text-xl font-bold">
        Querés borrar este {isDesign ? 'diseño' : 'tatuaje'}?
      </h3>
      <div className="flex [&>button]:p-2 [&>button]:flex-1 [&>button:nth-of-type(1)]:bg-red-500 [&>button]:rounded-sm">
        <button
          name="Borrar"
          onClick={() => {
            void onDelete()
          }}
        >
          {loading ? 'Borrando' : 'Borrar'}
        </button>
        <button name="Cancelar" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
