/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from '@/components/layout/layout'
import { Seo } from '@/components/common/seo'
import { Spinner } from '@/components/common/spinner'
import useUser from '@/hooks/useUser'
import { iniciarSesion } from '@/lib/firebase/utils'
import { useRouter } from 'next/router'
import { useEffect, type ReactNode, type FormEvent, useState } from 'react'

export default function Login() {
  const [error, setError] = useState<false | string>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const admin = useUser()
  const router = useRouter()

  useEffect(() => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(admin)) {
      void router.replace('/')
    }
  }, [admin])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const { email, password } = Object.fromEntries(data)
    setLoading(true)
    setError(false)
    iniciarSesion(String(email), String(password))
      .catch((err) => {
        console.log(err.code)
        if (['auth/invalid-email', 'auth/wrong-password'].includes(err.code)) {
          setError('Email inválido')
        } else if (err.code === 'auth/too-many-requests') {
          setError('Demasiados intentos, espera unos segundos')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Seo title="Login / Neptuno Black" />

      <main
        className="flex-1 pr-2 h-max overflow-y-hidden flex flex-col min-h-screen max-w-xl justify-center
    max-[630px]:overflow-y-auto max-[630px]:min-h-0 max-[630px]:max-w-none items-center relative"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-4 bg-black w-full max-w-sm gap-y-4 relative max-[630px]:w-[90%]"
        >
          <input
            name="email"
            type="text"
            placeholder="Email"
            className={
              'bg-black border-2 w-full border-white/60 text-white py-3 px-4 outline-none rounded-md tracking-widest ml-auto focus:bg-neutral-950 focus:text-slate-100 focus:border-white transition-all duration-500 placeholder:text-white/25'
            }
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className={
              'bg-black border-2 w-full border-white/60 text-white py-3 px-4 outline-none rounded-md tracking-widest ml-auto focus:bg-neutral-950 focus:text-slate-100 focus:border-white transition-all duration-500 placeholder:text-white/25'
            }
          />
          <input
            type="submit"
            className="bg-white text-black rounded-lg font-bold py-3 max-w-sm border-2 border-white cursor-pointer hover:bg-transparent hover:text-white transition-colors"
            value="Iniciar Sesión"
          />
          {error !== false && (
            <span className="absolute bottom-0 translate-y-full text-red-600">
              {error}
            </span>
          )}
        </form>
        <div
          className={`w-full h-full absolute top-0 left-0 transition-colors flex justify-center items-center
        ${loading ? 'bg-white/20 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}
        >
          {loading && <Spinner className="h-8 w-8" />}
        </div>
      </main>
    </>
  )
}

Login.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
