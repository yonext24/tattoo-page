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
      <link rel="icon" href="/favicon.ico" />
      {description !== undefined && <meta name='description' content={description} />}
      {description !== undefined && <meta name='og:description' content={description} />}
      {image !== undefined && <meta property='og:image' content={image} />}
      <meta
        name='og:url'
        content={`${siteURL}${asPath === '/' ? '' : asPath}`}
      />
    </Head>
  )
}
