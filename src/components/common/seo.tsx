import { siteURL } from '@/lib/env'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  title: string
  image?: string
  description?: string
  height?: string
  width?: string
  imageType?: string
}

export function Seo({
  title,
  image,
  description,
  width,
  height,
  imageType
}: Props) {
  const { asPath } = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="og:type" content="website" />
      <meta name="theme-color" content="#000000" />
      <meta name="og:site_name" content="Neptuno Ink Tattoos" />
      <meta
        name="keyword"
        content="tatuador en zona sur,tatuador en lanus,tatuajes zona sur,tatuajes lanus,tattoos zona sur,tattoos lanus,tatuador lanus,tatuador zona sur,tatuajes argentina,tatuajes gba"
      ></meta>

      <link rel="icon" href="/favicon.ico" />
      {description !== undefined && description !== '' && (
        <>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}
      {image !== undefined && (
        <>
          <meta property="og:image:type" content={imageType} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="og:image" content={`${image}`} />
          <meta property="twitter:image" content={`${image}`} />
          {width !== undefined && height !== undefined && (
            <>
              <meta property="og:image:width" content={width} />
              <meta property="og:image:height" content={height} />
            </>
          )}
        </>
      )}
      <meta
        name="og:url"
        content={`${siteURL as string}${asPath === '/' ? '' : asPath}`}
      />
      <meta
        property="twitter:url"
        content={`${siteURL as string}${asPath === '/' ? '' : asPath}`}
      />
    </Head>
  )
}
