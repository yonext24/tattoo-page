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

export interface ImageCompressionApiEndpointResponse {
  data?: ImageData[]
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
  fields: z.object({
    path: z
      .array(z.string().min(1))
      .max(1)
      .transform((val) => val[0]),
    slug: z
      .array(z.string().min(1))
      .max(1)
      .transform((val) => val[0])
  }),
  files: z.array(
    z.object({
      file: z.instanceof(Blob),
      buffer: z.instanceof(Buffer),
      filepath: z.string(),
      originalFileName: z.string().min(1)
    })
  )
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

  const images = parsedBody.data.files
  const path = parsedBody.data.fields.path
  const slug = parsedBody.data.fields.slug
  const result: ImageData[] = []

  const promises = images.map(async (image, i) => {
    const dimensions = imageSize(image.buffer)
    const optimized = await optimizeImage(
      image.buffer,
      dimensions.width,
      dimensions.height
    )
    const imageName = `${slug}${i === 0 ? '' : `-image-${i}`}`
    const url = await uploadImage(optimized, `${path}/${imageName}.webp`)

    result.push({
      src: url,
      width: dimensions.width,
      height: dimensions.height,
      path
    } as ImageData)
  })

  await Promise.all(promises)

  // @ts-ignore
  res.json({ data: result })
}

const parseBody = async (req: any): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const form = new Formidable()

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      const data: BlobWithName[] = []
      files.images &&
        files.images.map((el) => {
          const { blob, buffer } = parseFile(el.filepath)
          data.push({
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
