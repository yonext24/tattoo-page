import { DesignAdminImageRender } from '@/components/admin/design-admin-image-render'
import { DesignAdminInputs } from '@/components/admin/design-admin-inputs'
import { Seo } from '@/components/common/seo'
import { Spinner } from '@/components/common/spinner'
import { Layout } from '@/components/layout/layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { useUploadDesign } from '@/hooks/useUploadDesign'

export default function DesignUploadPage() {
  const {
    submitHandler,
    precioHandler,
    uploadImageHandler,
    state,
    fileInputRef
  } = useUploadDesign()
  const { design, fetch } = state
  return (
    <>
      <Seo title="Designs / Neptuno Black Tattoos" />
      <main
        className="flex-1 h-max overflow-y-hidden pr-2 flex flex-col min-h-screen items-center max-w-xl pl-2 relative
      max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none"
      >
        <h1 className="text-4xl title mb-12 mt-4">Subir Diseño</h1>

        <form
          onSubmit={submitHandler}
          className="flex-1 flex flex-col items-center mx-auto relatie"
        >
          <input
            onChange={uploadImageHandler}
            ref={fileInputRef}
            className="hidden"
            required
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
          />
          <label
            htmlFor="image"
            className="bg-white py-3 px-8 text-black font-bold text-xl mb-2 cursor-pointer border-2 rounded-md hover:bg-black hover:text-white transition-colors"
          >
            {design.image.url === null ? 'Subir Imagen' : 'Cambiar Imágen'}
          </label>

          <DesignAdminImageRender design={design} />
          <DesignAdminInputs
            design={design}
            fetch={fetch}
            precioHandler={precioHandler}
          />
          {fetch.error ? (
            <span className="text-red-500 text-center w-full">
              {fetch.error}
            </span>
          ) : (
            <div className="h-12"></div>
          )}
        </form>

        <div
          id="loading_screen"
          className={`absolute top-0 left-0 transition-colors z-20 w-full h-full flex justify-center items-center
      max-[630px]:fixed pointer-events-none 
      ${fetch.loading ? 'bg-white/50 pointer-events-auto' : ''}
      ${fetch.success ? 'bg-green-400/60 pointer-events-auto' : ''}
      ${fetch.error ? 'bg-red-400/70 pointer-events-auto' : ''}`}
        >
          {fetch.loading && <Spinner className="w-8 h-8" />}
          {fetch.success && (
            <span className="text-black text-xl font-bold text-center">
              El diseño se subió correctamente.
            </span>
          )}
          {fetch.error && (
            <span className="text-black text-xl font-bold text-center">
              {fetch.error}
            </span>
          )}
        </div>
      </main>
    </>
  )
}

DesignUploadPage.getLayout = (page: React.ReactNode) => (
  <Layout>
    <ProtectedRoute>{page}</ProtectedRoute>
  </Layout>
)
