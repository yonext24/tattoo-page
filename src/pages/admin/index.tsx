import { Layout } from '@/components/layout/layout'
import { Seo } from '@/components/common/seo'
import { type ReactNode } from 'react'
import { ProtectedRoute } from '@/components/layout/protected-route'
import Link from 'next/link'

export default function Admin () {
  return <>
    <Seo title='Designs / Neptuno Black Tattoos' />
    <main className='flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
      max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center'>
      <h1 className='text-4xl title mb-12'>Admin Panel</h1>
      <div className='w-full flex justify-center gap-x-6'>
        <Link className='border border-white p-8 aspect-square' href='/admin/design'>
          <span>Subir diseño</span>
        </Link>
        <Link className='border border-white p-8 aspect-square' href='/admin/tattoo'>
          <span>Subir Tatuaje</span>
        </Link>
      </div>
    </main>

  </>
}

Admin.getLayout = (page: ReactNode) => (
  <Layout>
    <ProtectedRoute>
      {page}
    </ProtectedRoute>
  </Layout>
)
