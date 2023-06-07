import { siteURL } from '@/lib/env'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  title: string
  image?: string
  description?: string
}

export function Seo ({ title, image, description }: Props) {
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
        <meta property='og:image' content={image} />
        <meta property="twitter:image" content={image} />
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
