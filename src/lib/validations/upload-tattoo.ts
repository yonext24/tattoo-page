import * as z from 'zod'

export const imageCompressionApiEndpointSchema = z.object({
  primary: z.object({
    original: z.object({
      width: z.number(),
      height: z.number(),
      path: z.string(),
      src: z.string()
    }),
    compressed: z.object({
      width: z.number(),
      height: z.number(),
      path: z.string(),
      src: z.string()
    })
  }),
  extra: z.array(
    z.object({
      width: z.number(),
      height: z.number(),
      path: z.string(),
      src: z.string()
    })
  )
})
