/* eslint-disable react-hooks/exhaustive-deps */
import { editarDiseño } from '@/lib/firebase/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import useUser from './useUser'
import { toast } from 'sonner'
import { Design } from '@/lib/types/design'

const formSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es obligatorio.' })
    .min(1, { message: 'El nombre debe tener al menos un caracter.' })
    .max(30, { message: 'El nombre no debe tener más de 30 caracteres.' }),
  descripcion: z
    .string()
    .max(800, {
      message: 'El tamaño máximo de la descripción es de 800 caracteres.'
    })
    .optional()
})
export type UpdateDesignFormTypes = z.infer<typeof formSchema>

export function useEditDesign({ design }: { design: Design }) {
  const form = useForm<UpdateDesignFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: design.nombre,
      descripcion: design.descripcion
    }
  })
  const { handleSubmit, setError } = form
  const user = useUser()

  const imageSelectorRef = useRef<any>()
  const extraImagesSelectorRef = useRef<any>()

  const onSubmit = handleSubmit(async (data) => {
    if (!user || !user.isAdmin) {
      setError('root', { message: 'No estás autorizado.' })
      return
    }
    const toastId = 'update-design-loading-toast'
    toast.loading('El diseño se está actualizando', { id: toastId })

    try {
      await editarDiseño({ ...data, id: design.id }).then(() => {
        toast.success('Diseño actualizado con éxito', { id: toastId })
        window.location.reload()
      })
    } catch (error) {
      console.error(error)
      setError('root', { message: 'Ocurrió un error al actualizar el diseño.' })
      toast.error('Ocurrió un error al actualizar el diseño.', { id: toastId })
      return
    }
  })

  return {
    form,
    onSubmit,
    imageSelectorRef,
    extraImagesSelectorRef
  }
}
