import Link from 'next/link'
import InstagramIcon from '../icons/instagram-icon'
import WhatsappIcon from '../icons/whatsapp-icon'

const redes = [
  { name: 'Instagram', href: 'https://www.instagram.com/alannn.tattoo/', icon: InstagramIcon, htmlName: 'Abrir instagram' },
  { name: 'Whatsapp', href: 'https://wa.link/iafyq7', icon: WhatsappIcon, htmlName: 'Abrir whatsapp' }
]

export function Footer () {
  return <footer className="gap-y-2 flex flex-col border-t border-neutral-600/50 text-neutral-500 w-4/5 py-2 ml-auto mt-6 max-[730px]:w-full max-[630px]:px-2">
    <div className='flex w-full justify-between items-center'>
      <div className='grid grid-cols-2 gap-y-[3px]'>
        <Link className='text-xs hover:underline' href='/'>Home</Link>
        <Link className='text-xs hover:underline' href='/designs'>Diseños</Link>
        <Link className='text-xs hover:underline' href='/tatuajes'>Tatuajes</Link>
        <Link className='text-xs hover:underline' href='/busqueda'>Búsqueda</Link>
      </div>
      <div className='flex flex-col gap-y-[2px]'>
        <div className='text-sm flex justify-end gap-x-2 items-center'>
          <span>2023 - Alan Hernandez</span>
        </div>
        <div className="flex justify-end gap-x-2 items-center">
          {
            redes.map(el => <a href={el.href} aria-label={el.htmlName} key={el.name} target='_blank' rel="noopener noreferrer" className='group'>
              <el.icon className="text-neutral-500 transition-colors group-hover:text-white max-[630px]:w-5 max-[630px]:h-5" width={22} height={22} />
            </a>)
          }
        </div>
      </div>
    </div>
  </footer>
}
