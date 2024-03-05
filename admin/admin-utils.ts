import { auth, bucket } from './config'
import fs from 'fs'
import sharp from 'sharp'

export const checkIfAdmin = async (token: string) => {
  const admin = await auth.verifyIdToken(token)
  const user = await auth.getUser(admin.uid)
  console.log(user, user.customClaims)

  return user.customClaims?.admin === true
}

export const uploadImage = async (
  file: Blob,
  path: string
): Promise<string> => {
  const blobStream = bucket.file(path).createWriteStream({
    metadata: {
      contentType: file.type
    }
  })

  const arr = new Uint8Array(await file.arrayBuffer())
  blobStream.end(arr)

  return await new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      bucket
        .file(path)
        .makePublic()
        .then(() => {
          const imageUrl = bucket.file(path).publicUrl()
          resolve(imageUrl)
        })
    })

    blobStream.on('error', (error) => {
      reject(error)
    })
  })
}

export const optimizeImage = async (
  filepath: Buffer,
  width?: number,
  height?: number
): Promise<Blob> => {
  const instance = sharp(filepath)

  if (width && height) {
    instance.resize(width, height)
  }

  return await instance
    .webp({ quality: 70, effort: 6, lossless: false, preset: 'photo' })
    .toBuffer()
    .then((buff) => new Blob([buff]))
}

export const parseFile = (filepath: string): { blob: Blob; buffer: Buffer } => {
  const srcToFile = fs.readFileSync(filepath)
  const buffer = Buffer.from(srcToFile)
  const blob = new Blob([buffer])
  return { blob, buffer }
}
