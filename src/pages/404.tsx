import { Seo } from '@/components/common/seo'
import { ErrorComponent } from '@/components/error/errorComponent'
import { Layout } from '@/components/layout/layout'
import Link from 'next/link'

export default function CuatrocientosCuatro () {
  return <>
    <Seo title='404' />
    <main className='flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center'>
      <div className="flex-1 flex flex-col relative justify-center">
        <h1 className="text-4xl text-center font-bold text-gold">404</h1>
        <ErrorComponent m={false} error='Esta página no existe.' />
        <Link href='/' className='text-center text-gold underline'>Volver a la home</Link>
      </div>
    </main>
  </>
}

CuatrocientosCuatro.getLayout = (page: React.ReactNode) => <Layout>
  {page}
</Layout>
