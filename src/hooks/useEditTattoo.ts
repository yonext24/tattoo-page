/* eslint-disable react-hooks/exhaustive-deps */
import { editarTatuaje } from '@/lib/firebase/utils'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useUser from './useUser'
import { toast } from 'sonner'
import { Tattoo } from '@/lib/types/tattoo'

const formSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es obligatorio.' })
    .min(1, { message: 'El nombre debe tener al menos un caracter.' })
    .max(30, { message: 'El nombre no debe tener más de 30 caracteres.' })
    .transform((s) => s.trim()),
  descripcion: z
    .string()
    .max(400, {
      message: 'La descripción no debe tener más de 400 caracteres.'
    })
    .optional(),
  homeVisible: z.boolean().default(true),
  estilos: z.array(
    z
      .string()
      .min(1, { message: 'Los estilos deben tener mínimo un caracter' })
      .transform((s) => s.trim())
  ),
  tags: z.array(
    z
      .string()
      .min(1, { message: 'Los estilos deben tener mínimo un caracter' })
      .transform((s) => s.trim())
  )
})

export type EditTattooFormTypes = z.infer<typeof formSchema>

export function useEditTattoo({ tattoo }: { tattoo: Tattoo }) {
  const form = useForm<EditTattooFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      estilos: tattoo.estilos,
      tags: tattoo.tags,
      homeVisible: tattoo.homeVisible,
      descripcion: tattoo.descripcion,
      nombre: tattoo.nombre
    }
  })

  const { handleSubmit, setError } = form
  const user = useUser()

  const submitHandler = handleSubmit(async (data) => {
    if (!user || !user.isAdmin) {
      setError('root', { message: 'No estás autorizado.' })
      return
    }
    const toastId = 'add-tatuaje-loading-toast'
    toast.loading('El tatuaje se está actualizando', { id: toastId })

    try {
      await editarTatuaje({ ...data, id: tattoo.id }).then(() => {
        toast.success('Tatuaje actualizado con éxito', { id: toastId })
      })
      window.location.reload()
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError('root', { message })
      toast.error(message, { id: toastId })
    }
  })

  return { submitHandler, form }
}
