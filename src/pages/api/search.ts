// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchTatttoos } from '@/lib/firebase/utils'
import { type Tattoo } from '@/lib/types/tattoo'
import { waitFunc } from '@/lib/waitFunc'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  tattoos?: Tattoo[]
  error?: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') return res.status(405)
  if (typeof req.query?.search !== 'string') { res.status(400).json({ error: 'Se necesita una búsqueda' }); return }

  const search = req.query.search
  if (search.includes('ñ')) { res.status(405).json({ error: 'testing' }); return }

  try {
    const tattoos = await waitFunc(async () => await searchTatttoos({ search }), 5000, 'No se pudo obtener los tatuajes')
    res.status(200).json({ tattoos }); return
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    // eslint-disable-next-line no-useless-return
    res.status(400).json({ error: errorMessage }); return
  }
}
