import { Spinner } from '@/components/common/spinner'
import { ModalContextProvider } from '@/contexts/ModalContext'
import { WindowSizeContextProvider } from '@/contexts/WindowSizeContext'
import '@/styles/globals.css'
import { type NextPage } from 'next'
import type { AppProps } from 'next/app'
import { type ReactNode, Suspense, type ReactElement } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App ({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode): ReactNode => page)

  return <>
    <WindowSizeContextProvider>

      <ModalContextProvider>

        {getLayout(<Component {...pageProps} />)}
        <Suspense fallback={<div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-red-700'><Spinner/></div>} />

      </ModalContextProvider>

    </WindowSizeContextProvider>
  </>
}
