import { type NextApiRequest, type NextApiResponse } from 'next'
import { Formidable } from 'formidable'
import * as z from 'zod'
import {
  checkIfAdmin,
  optimizeImage,
  parseFile,
  uploadImage
} from '../../../admin/admin-utils'
import imageSize from 'buffer-image-size'
import { ImageData } from '@/lib/types/tattoo'

interface PrimaryImageData {
  original: ImageData
  compressed: ImageData
}
export interface ImageCompressionApiEndpointResponse {
  data?: {
    primary: PrimaryImageData
    extra: ImageData[]
  }
  error?: string
}

interface BlobWithName {
  file: Blob
  buffer: Buffer
  originalFileName: string | null
  filepath: string
}

export const config = {
  api: {
    bodyParser: false
  }
}

const validator = z.object({
  files: z.object({
    primary: z
      .object({
        file: z.instanceof(Blob),
        buffer: z.instanceof(Buffer),
        filepath: z.string(),
        originalFileName: z.string().min(1)
      })
      .array(),
    extra: z
      .object({
        file: z.instanceof(Blob),
        buffer: z.instanceof(Buffer),
        filepath: z.string(),
        originalFileName: z.string().min(1)
      })
      .array()
      .optional()
  }),
  fields: z.object({
    slug: z
      .array(z.string().min(1))
      .max(1)
      .transform((val) => val[0])
  })
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageCompressionApiEndpointResponse>
) {
  if (req.method !== 'POST') return res.status(405)
  if (!req.headers.authentication)
    return res.status(401).json({ error: 'No estás autorizado.' })
  const isAdmin = await checkIfAdmin(req.headers['authentication'] as string)
  if (!isAdmin) return res.status(401).json({ error: 'No estás autorizado.' })

  const body = await parseBody(req)
  const parsedBody = validator.safeParse(body)

  if (!parsedBody.success) {
    console.error(parsedBody.error)
    return res.status(400).json({ error: 'Salió algo mal' })
  }

  const primary = parsedBody.data.files.primary
  const extra = parsedBody.data.files.extra || []
  const slug = parsedBody.data.fields.slug

  const dic: ImageCompressionApiEndpointResponse['data'] = {
    primary: {
      original: {
        width: 0,
        height: 0,
        path: '',
        src: ''
      },
      compressed: {
        width: 0,
        height: 0,
        path: '',
        src: ''
      }
    },
    extra: []
  }

  const promises = primary.map(async (image) => {
    const dimensions = imageSize(image.buffer)

    const mapper: {
      path: string
      dicPath: keyof PrimaryImageData
      width: number
      height: number
    }[] = [
      {
        path: `/tattoos/${slug}/primary.webp`,
        dicPath: 'original',
        width: dimensions.width,
        height: dimensions.height
      },
      {
        path: `/tattoos/${slug}/compressed.webp`,
        dicPath: 'compressed',
        width: dimensions.width / 2,
        height: dimensions.height / 2
      }
    ]

    const promises = mapper.map(async (el) => {
      const optimized = await optimizeImage(image.buffer, el.width, el.height)
      return await uploadImage(optimized, el.path).then((url) => {
        dic.primary[el.dicPath].src = url
        dic.primary[el.dicPath].path = el.path
        dic.primary[el.dicPath].width = el.width
        dic.primary[el.dicPath].height = el.height
      })
    })

    return await Promise.all(promises)
  })
  const promises2 = extra.map(async (image, i) => {
    const dimensions = imageSize(image.buffer)
    const optimized = await optimizeImage(
      image.buffer,
      dimensions.width,
      dimensions.height
    )
    const path = `/tattoos/${slug}/extra-${i + 1}.webp`

    return await uploadImage(optimized, path).then((url) => {
      dic.extra.push({
        src: url,
        path,
        width: dimensions.width,
        height: dimensions.height
      })
    })
  })
  await Promise.all(promises)
  await Promise.all(promises2)

  res.json({ data: dic })
}

const parseBody = async (req: any): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const form = new Formidable()

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      const data: { primary: BlobWithName[]; extra: BlobWithName[] } = {
        primary: [],
        extra: []
      }

      files.primary &&
        files.primary.map((el) => {
          const { blob, buffer } = parseFile(el.filepath)
          data.primary.push({
            file: blob,
            buffer,
            originalFileName: el.originalFilename,
            filepath: el.filepath
          })
        })
      files.extra &&
        files.extra.map((el) => {
          const { blob, buffer } = parseFile(el.filepath)
          data.extra.push({
            file: blob,
            buffer,
            originalFileName: el.originalFilename,
            filepath: el.filepath
          })
        })

      resolve({ files: data, fields })
    })
  })
}
