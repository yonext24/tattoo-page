/* eslint-disable react-hooks/exhaustive-deps */
import { agregarTatuaje, generateSlug } from '@/lib/firebase/utils'
import { TattooWithoutId, type Tattoo } from '@/lib/types/tattoo'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { appFetch } from '@/lib/appFetch'
import { ImageCompressionApiEndpointResponse } from '@/pages/api/images'
import { imageCompressionApiEndpointSchema } from '@/lib/validations/upload-tattoo'
import useUser from './useUser'
import { toast } from 'sonner'
import { auth } from '@/lib/firebase/app'

const ACCEPTED_TYPES = [
  'image/webp',
  'image/jpg',
  'image/png',
  'image/jpeg',
  'image/jfif'
]

const formSchema = z.object({
  image: z
    .instanceof(File, { message: 'La imágen es obligatoria.' })
    .refine((image) => ACCEPTED_TYPES.includes(image.type), {
      message: `El formato de la imágen no esta permitido, los formatos permitidos son los siguientes ${ACCEPTED_TYPES.map((el) => el.split('/')[1]).join(', ')}.`
    }),
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
  ),
  extra_images: z
    .instanceof(File)
    .refine((image) => ACCEPTED_TYPES.includes(image.type), {
      message: `El formato de una de las imágenes extra no esta permitido, los formatos permitidos son los siguientes ${ACCEPTED_TYPES.map((el) => el.split('/')[1]).join(', ')}.`
    })
    .array()
})

export type AddTattooFormTypes = z.infer<typeof formSchema>
const formDefaultValues = {
  estilos: [],
  tags: [],
  homeVisible: true,
  descripcion: '',
  image: undefined,
  nombre: '',
  extra_images: []
}

export function useUploadTattoo() {
  const form = useForm<AddTattooFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues
  })

  const { handleSubmit, setError } = form
  const user = useUser()

  const imageSelectorRef = useRef<any>()
  const extraImageSelectorRef = useRef<any>()

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      imageSelectorRef?.current?.reset()
      extraImageSelectorRef?.current?.reset()
      form.reset(formDefaultValues)
    }
  }, [form.formState.isSubmitSuccessful])

  const submitHandler = handleSubmit(async (data) => {
    if (!user || !user.isAdmin) {
      setError('root', { message: 'No estás autorizado.' })
      return
    }
    const toastId = 'add-tatuaje-loading-toast'
    toast.loading('El tatuaje se está creando', { id: toastId })

    try {
      const { descripcion, nombre, image, estilos, homeVisible } = data
      const slug = await generateSlug(nombre, estilos)
      const toSend = new FormData()
      toSend.set('slug', slug)
      toSend.append('primary', image)
      for (const img of data.extra_images) {
        toSend.append('extra', img)
      }

      const token = await auth.currentUser?.getIdToken?.(true)
      const images = await appFetch<ImageCompressionApiEndpointResponse>(
        '/api/images',
        {
          body: toSend,
          method: 'POST',
          headers: { authentication: token ?? '' }
        }
      )

      const parsedImages = imageCompressionApiEndpointSchema.safeParse(
        images?.data
      )

      if (!parsedImages.success) {
        console.error(parsedImages.error)
        setError('image', { message: 'Ocurrió un error al subir la imágen' })
        return
      }

      const tattoo: TattooWithoutId = {
        descripcion: descripcion as string,
        nombre,
        estilos,
        tags: data.tags,
        slug,
        homeVisible,
        images: {
          original: parsedImages.data.primary.original,
          compressed: parsedImages.data.primary.compressed,
          extra: parsedImages.data.extra
        }
      }

      await agregarTatuaje(tattoo).then(() => {
        toast.success('Tatuaje creado con éxito', { id: toastId })
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError('root', { message })
      toast.error(message, { id: toastId })
    }
  })

  return { submitHandler, form, imageSelectorRef, extraImageSelectorRef }
}
