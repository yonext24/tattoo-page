/* eslint-disable @next/next/no-img-element */
import { ExtraImagesSelector } from '@/components/admin/add-tatuaje/extra-image-selector/extra-image-selector'
import { ImagePicker } from '@/components/common/image-picker'
import { Selector } from '@/components/common/selector'
import { Seo } from '@/components/common/seo'
import { SubmitButton } from '@/components/common/submit-button'
import { Layout } from '@/components/layout/layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useUploadTattoo } from '@/hooks/useUploadTattoo'

export default function TattooUploadPage() {
  const { submitHandler, form, imageSelectorRef, extraImageSelectorRef } =
    useUploadTattoo()
  const {
    formState: { isSubmitting }
  } = form

  return (
    <>
      <Seo title="Designs / Neptuno Black Tattoos" />
      <main
        className="flex-1 py-2 h-max overflow-y-hidden pr-2 flex flex-col min-h-screen items-center max-w-[450px] pl-2 relative
      max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none"
      >
        <h1 className="text-4xl title mb-12 mt-4">Subir Tatuaje</h1>

        <Form {...form}>
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col items-center mx-auto relative gap-4 [&>*]:w-full"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => {
                return (
                  <FormItem>
                    <FormLabel>Imágen</FormLabel>
                    <FormControl>
                      <ImagePicker
                        ref={imageSelectorRef}
                        onChange={onChange}
                        accept="image/webp,image/jpg,image/png,image/jpeg"
                        render={(url) => <img src={url} alt="" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="extra_images"
              render={({ field: { value, onChange } }) => {
                return (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Imágenes extra del tatuaje</FormLabel>
                    <FormControl>
                      <ExtraImagesSelector
                        ref={extraImageSelectorRef}
                        value={value}
                        onChange={onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Las imágenes secundarias del tatuaje.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Este nombre será el que se utilizará en el título de la
                      página del tatuaje, también para generar la url del mismo,
                      es obligatorio.
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Visible en la página de tatuajes</FormLabel>
                    <FormControl>
                      <Switch {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Esta opción controla si el tatuaje va a ser mostrado en la
                      página principal /tatuajes, si seteas la opción en no, el
                      tatuaje sólo aparecerá en la página de búsqueda, la idea
                      detrás de estro es que sólo tengas tus mejores tatuajes en
                      /tatuajes, y que en búsqueda los subas todos, para después
                      poder filtrarlos. Si seteas la opción en sí, el tatuaje
                      también aparecerá en la página de búsqueda.
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      La descripción del tatuaje, es opcional, podes dejarla
                      vacía si no tenes nada que decir sobre el tatuaje.
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="estilos"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Estilos</FormLabel>
                    <FormControl>
                      <Selector
                        selectedValues={field.value}
                        onChange={field.onChange}
                        description="Los estilos del tatuaje, por ejemplo: realismo, tradicional, blackwork, etc. No son obligatorios, pero ayudan a la hora de buscar tatuajes."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Selector
                        selectedValues={field.value}
                        onChange={field.onChange}
                        description="Los tags del tatuaje, por ejemplo: brazo, flores, etc. No son obligatorios, pero ayudan a la hora de buscar tatuajes y linkearlos entre sí."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            {form.formState.errors.root && (
              <span className="text-destructive">
                {form.formState.errors.root.message}
              </span>
            )}
            <SubmitButton loading={isSubmitting} />
          </form>
        </Form>
      </main>
    </>
  )
}

TattooUploadPage.getLayout = (page: React.ReactNode) => (
  <Layout>
    <ProtectedRoute>{page}</ProtectedRoute>
  </Layout>
)
