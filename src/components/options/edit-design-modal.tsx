/* eslint-disable @next/next/no-img-element */
import { SubmitButton } from '@/components/common/submit-button'
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
import { useEditDesign } from '@/hooks/useEditDesign'
import { Design } from '@/lib/types/design'

export function EditDesignModal({
  design
}: {
  design: Design
  closeModal: () => void
}) {
  const { form, onSubmit } = useEditDesign({ design })

  return (
    <div className="bg-black overflow-y-auto max-w-[500px] p-4 max-h-[95vh] border-border border">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col items-center mx-auto relative gap-4 [&>*]:w-full"
        >
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
                    página del diseño, y también se utiliza para generar la url.
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
    </div>
  )
}
