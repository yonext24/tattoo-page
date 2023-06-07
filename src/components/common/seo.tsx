import { siteURL } from '@/lib/env'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  title: string
  image?: string
  description?: string
  height?: string
  width?: string
}

export function Seo ({ title, image, description, width, height }: Props) {
  const { asPath } = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta name='og:title' content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="og:type" content="website" />

      <link rel="icon" href="/favicon.ico" />
      {
        description !== undefined && <>
        <meta name='description' content={description} />
        <meta name='og:description' content={description} />
        <meta property="twitter:description" content={description} />
      </>
      }
      {
        image !== undefined && <>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property='og:image' content={`${image}`} />
        <meta property="twitter:image" content={`${image}`} />
        {
          width !== undefined && height !== undefined && <>

            <meta property="og:image:width" content={width} />
            <meta property="og:image:height" content={height} />

          </>
        }
      </>
      }
      <meta
        name='og:url'
        content={`${siteURL as string}${asPath === '/' ? '' : asPath}`}
      />
      <meta
        property="twitter:url"
        content={`${siteURL as string}${asPath === '/' ? '' : asPath}`}
      />
    </Head>
  )
}
