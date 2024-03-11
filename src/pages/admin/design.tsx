/* eslint-disable @next/next/no-img-element */
import { ExtraImagesSelector } from '@/components/admin/add-tatuaje/extra-image-selector/extra-image-selector'
import { ImagePicker } from '@/components/common/image-picker'
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
import { Textarea } from '@/components/ui/textarea'
import { useUploadDesign } from '@/hooks/useUploadDesign'

export default function DesignUploadPage() {
  const { form, onSubmit, imageSelectorRef, extraImagesSelectorRef } =
    useUploadDesign()

  console.log(form.watch('nombre'))

  return (
    <>
      <Seo title="Designs / Neptuno Ink Tattoos" />
      <main
        className="flex-1 h-max overflow-y-hidden pr-2 flex flex-col min-h-screen items-center max-w-xl pl-2 relative
      max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none"
      >
        <h1 className="text-4xl title mb-12 mt-4">Subir Diseño</h1>

        <Form {...form}>
          <form
            onSubmit={onSubmit}
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
                        ref={extraImagesSelectorRef}
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
                      página del diseño, y también se utiliza para generar la
                      url.
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
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      La descripción que aparecerá en la página del diseño.
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            {form.formState.errors.root && (
              <span className="text-destructive">
                {form.formState.errors.root.message}
              </span>
            )}
            <SubmitButton loading={form.formState.isSubmitting} />
          </form>
        </Form>
      </main>
    </>
  )
}

DesignUploadPage.getLayout = (page: React.ReactNode) => (
  <Layout>
    <ProtectedRoute>{page}</ProtectedRoute>
  </Layout>
)
