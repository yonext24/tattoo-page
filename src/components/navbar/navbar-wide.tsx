import { navEntrys } from '@/lib/navEntrys'
import { NavEntry } from './nav-entry'

export default function Navbar () {
  return <>
  <div className="w-[40vw]">
  </div>
  <nav className='w-[40vw] h-screen fixed top-0 left-0 flex flex-col'>
    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-full">
      <h2 className={'text-center text-[2rem] title'}>Neptuno Black Tattoos</h2>
    </div>
    <ul className='text-2xl tracking-widest flex flex-col gap-y-1 m-auto [&>li]:cursor-pointer'>
      {
        navEntrys.map(el => <NavEntry url={el.url} name={el.name} key={el.name} />)
      }
    </ul>
  </nav>
  </>
}
