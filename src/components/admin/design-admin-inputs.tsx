import { type designType } from '@/reducers/designUploadReducer'
import React from 'react'

/* eslint-disable no-extra-boolean-cast */
interface Props {
  design: designType
  fetch: {
    loading: boolean
    success: boolean
    error: string | null
  }
  precioHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DesignAdminInputs ({ design, fetch, precioHandler }: Props) {
  if (typeof design.image.url !== 'string' || typeof design.nombre !== 'string') return null

  return <>
    <div className="gap-y-3 flex flex-col h-max min-[700px]:grid min-[700px]:grid-cols-2 gap-x-2 w-full [&>input[type=text]]:bg-black [&>input[type=text]]:border-2
      [&>input[type=text]]:border-white [&>input[type=text]]:py-3 [&>input[type=text]]:px-4 [&>input[type=text]]:outline-none
      [&>input[type=text]]:rounded-md">

      <input type='text' name='nombre' max={10} placeholder="Nombre..." className='min-[700px]:col-span-full' />
      <input type='text' name='precio' max={20} onChange={precioHandler} placeholder="Precio..." className='min-[700px]:col-span-full' />
      <div className='flex gap-x-2 h-10 items-start'>
      </div>
    </div>
      <input type='submit' value={fetch.loading ? 'Cargando...' : 'Enviar'} disabled={fetch.loading}
      className='border-2 border-white bg-white text-black font-bold py-2 w-full rounded-md mx-auto
      hover:bg-black hover:text-white cursor-pointer transition-colors' />
  </>
}
