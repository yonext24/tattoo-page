import { type tattooType } from '@/reducers/tattooUploadReducer'
import React from 'react'

/* eslint-disable no-extra-boolean-cast */
interface Props {
  tattoo: tattooType
  fetch: {
    loading: boolean
    success: boolean
    error: string | null
  }
  nombreHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  estilosHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function TattooAdminInputs ({ tattoo, fetch, nombreHandler, estilosHandler }: Props) {
  if (typeof tattoo.image.url !== 'string' || typeof tattoo.image.height !== 'number' || typeof tattoo.image.width !== 'number' || typeof tattoo.nombre !== 'string') return null

  return <>
    <div className="gap-y-3 flex flex-col h-max min-[700px]:grid min-[700px]:grid-cols-2 gap-x-2 w-full [&>input[type=text]]:bg-black [&>input[type=text]]:border-2
      [&>input[type=text]]:border-white [&>input[type=text]]:py-3 [&>input[type=text]]:px-4 [&>input[type=text]]:outline-none
      [&>input[type=text]]:rounded-md">

      <input type='text' name='nombre' max={10} required onChange={nombreHandler} placeholder="Nombre" className='min-[700px]:col-span-full' />
      <label htmlFor='homeVisible' className="border-2 border-white py-3 px-2 rounded-md flex gap-x-2 min-[700px]:col-span-full">
        <input type='checkbox' name='homeVisible' id='homeVisible' className="h-5 w-5"></input>
        <span>Visible en la página de tatuajes?</span>
      </label>
      <input type='text' name='descripcion' placeholder="Descripcion"></input>
      <input type='text' name='lugar' placeholder="Lugar"></input>
      <input type='text' name='duracion' placeholder="Duración"></input>
      <input type='text' name='estilos' placeholder="Estilos" onChange={estilosHandler}></input>
      <div className='flex gap-x-2 h-10 items-start'>
        {
          tattoo.estilos.map(el => <div className='bg-white text-black py-1 px-2' key={el}>{el}</div>)
        }
      </div>
    </div>
      <input type='submit' value={fetch.loading ? 'Cargando...' : 'Enviar'} disabled={fetch.loading}
      className='border-2 border-white bg-white text-black font-bold py-2 w-full rounded-md mx-auto
      hover:bg-black hover:text-white cursor-pointer transition-colors' />
  </>
}
