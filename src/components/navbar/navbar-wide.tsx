import { navEntrys } from '@/lib/navEntrys'
import { NavEntry } from './nav-entry'
import useUser from '@/hooks/useUser'
import { cerrarSesion } from '@/lib/firebase/utils'

export default function Navbar () {
  const admin = useUser()
  const handleClick = () => {
    void cerrarSesion()
  }

  return <>
    <div className="w-[40vw] mr-auto">
    </div>
    <nav className='w-[40vw] h-screen fixed top-0 left-0 flex flex-col'>
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-full">
        <h2 className={'text-center text-[2rem] title'}>Neptuno Black Tattoos</h2>
      </div>
      <ul className='text-2xl tracking-widest flex flex-col gap-y-1 m-auto [&>li]:cursor-pointer'>
        {
          navEntrys.map(el => <NavEntry url={el.url} name={el.name} key={el.name} />)
        }
        {
          Boolean(admin) && <>
            <NavEntry url='/admin' name={'Admin'} />
            <li className='group bg-gold'>
              <div onClick={handleClick} className='bg-pageblack block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform p-[0.15rem] border
              border-transparent group-hover:border-t-gray-700/30 group-hover:border-r-gray-700/30'>
                <span className=''>Cerrar Sesión</span>
              </div>
            </li>
          </>
        }
      </ul>
    </nav>
  </>
}
