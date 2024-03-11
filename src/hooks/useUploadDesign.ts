/* eslint-disable react-hooks/exhaustive-deps */
import { agregarDiseño, generateSlug, subirImagen } from '@/lib/firebase/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import useUser from './useUser'
import { toast } from 'sonner'
import { appFetch } from '@/lib/appFetch'
import { ImageCompressionApiEndpointResponse } from '@/pages/api/upload-image'
import { auth } from '@/lib/firebase/app'
import { DesignWithoutId } from '@/lib/types/design'

const ACCEPTED_TYPES = [
  'image/webp',
  'image/jpg',
  'image/png',
  'image/jpeg',
  'image/jfif'
]
const formSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es obligatorio.' })
    .min(1, { message: 'El nombre debe tener al menos un caracter.' })
    .max(30, { message: 'El nombre no debe tener más de 30 caracteres.' }),
  extra_images: z
    .instanceof(File)
    .refine((image) => ACCEPTED_TYPES.includes(image.type), {
      message: `El formato de una de las imágenes extra no esta permitido, los formatos permitidos son los siguientes ${ACCEPTED_TYPES.map((el) => el.split('/')[1]).join(', ')}.`
    })
    .array(),
  image: z
    .instanceof(File, { message: 'La imágen es obligatoria.' })
    .refine((image) => ACCEPTED_TYPES.includes(image.type), {
      message: `El formato de la imágen no esta permitido, los formatos permitidos son los siguientes ${ACCEPTED_TYPES.map((el) => el.split('/')[1]).join(', ')}.`
    }),
  descripcion: z
    .string()
    .max(800, {
      message: 'El tamaño máximo de la descripción es de 800 caracteres.'
    })
    .optional()
})

export type AddDesignFormTypes = z.infer<typeof formSchema>
const formDefaultValues = {
  descripcion: '',
  image: undefined,
  nombre: '',
  extra_images: []
}

export function useUploadDesign() {
  const form = useForm<AddDesignFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues
  })
  const { handleSubmit, setError } = form
  const user = useUser()

  const imageSelectorRef = useRef<any>()
  const extraImagesSelectorRef = useRef<any>()

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(formDefaultValues)
    }
  }, [form.formState.isSubmitSuccessful])

  const onSubmit = handleSubmit(async (data) => {
    if (!user || !user.isAdmin) {
      setError('root', { message: 'No estás autorizado.' })
      return
    }
    const toastId = 'add-design-loading-toast'
    toast.loading('El diseño se está creando', { id: toastId })

    try {
      const slug = await generateSlug(data.nombre, [], 'design')

      const toSend = new FormData()
      toSend.append('images', data.image)
      data.extra_images.forEach((image) => {
        toSend.append('images', image)
      })
      toSend.append('path', `/designs/${slug}`)
      toSend.append('slug', slug)

      const token = await auth.currentUser?.getIdToken?.(true)
      const images = await appFetch<ImageCompressionApiEndpointResponse>(
        '/api/upload-image',
        {
          body: toSend,
          method: 'POST',
          headers: { authentication: token ?? '' }
        }
      )
      if (!images.data || images.data.length <= 0) return
      const original = images.data[0]
      const extraImages = images.data.length ? images.data.slice(1) : []

      const design: DesignWithoutId = {
        images: {
          original,
          extraImages
        },
        slug,
        nombre: data.nombre,
        descripcion: data.descripcion
      }

      await agregarDiseño(design).then(() => {
        toast.success('Diseño creado con éxito', { id: toastId })
      })
    } catch (error) {
      console.error(error)
      setError('root', { message: 'Ocurrió un error al subir el diseño.' })
      toast.error('Ocurrió un error al subir el diseño.', { id: toastId })
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
