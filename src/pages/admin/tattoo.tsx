/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { TattooAdminImageRender } from '@/components/admin/tattoo-admin-image-render'
import { TattooAdminInputs } from '@/components/admin/tattoo-admin-inputs'
import { Seo } from '@/components/common/seo'
import { Spinner } from '@/components/common/spinner'
import { Layout } from '@/components/layout/layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { useUploadTattoo } from '@/hooks/useUploadTattoo'

export default function TattooUploadPage () {
  const { nombreHandler, submitHandler, estilosHandler, uploadImageHandler, state } = useUploadTattoo()
  const { tattoo, fetch } = state
  return <>

  <Seo title='Designs / Neptuno Black Tattoos' />
    <main className='flex-1 h-max overflow-y-hidden pr-2 flex flex-col min-h-screen items-center max-w-xl pl-2 relative
      max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none'>
      <h1 className='text-4xl title mb-12 mt-4'>Subir Tatuaje</h1>

      <form onSubmit={submitHandler} className='flex-1 flex flex-col items-center mx-auto relatie'>

        <input onChange={uploadImageHandler} className='hidden' required id='image' name='image' type='file' accept="image/png, image/jpeg" />
        <label htmlFor='image'
        className='bg-white py-3 px-8 text-black font-bold text-xl cursor-pointer border-2 rounded-md hover:bg-black hover:text-white transition-colors'>
          {tattoo.image.url === null ? 'Subir Imagen' : 'Cambiar Imágen'}
        </label>

        <TattooAdminImageRender tattoo={tattoo} />
        <TattooAdminInputs estilosHandler={estilosHandler} nombreHandler={nombreHandler} tattoo={tattoo} fetch={fetch} />
        {
          fetch.error
            ? <span className='text-red-500 text-center w-full'>{fetch.error}</span>
            : <div className='h-12'></div>
        }
      </form>

      <div id='loading_screen' className={`absolute top-0 left-0 transition-colors z-20 w-full h-full flex justify-center items-center
      max-[630px]:fixed
      ${fetch.loading ? 'bg-white/50 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}>
        {
          fetch.loading
            ? <Spinner className='w-8 h-8' />
            : null
        }
      </div>

    </main>

  </>
}

TattooUploadPage.getLayout = (page: React.ReactNode) => (
  <Layout>
    <ProtectedRoute>
      {page}
    </ProtectedRoute>
  </Layout>

)
