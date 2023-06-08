import Link from 'next/link'
import InstagramIcon from '../icons/instagram-icon'
import WhatsappIcon from '../icons/whatsapp-icon'

const redes = [
  { name: 'Instagram', href: 'https://www.instagram.com/alannn.tattoo/', icon: InstagramIcon },
  { name: 'Whatsapp', href: '', icon: WhatsappIcon }
]

export function Footer () {
  return <footer className="gap-y-2 flex justify-between items-center border-t border-neutral-600/50 text-neutral-500 w-4/5 py-2 ml-auto mt-6">
    <div className='grid grid-cols-2 gap-y-[3px]'>
      <Link className='text-xs hover:underline' href='/'>Home</Link>
      <Link className='text-xs hover:underline' href='/designs'>Diseños</Link>
      <Link className='text-xs hover:underline' href='/tatuajes'>Tatuajes</Link>
      <Link className='text-xs hover:underline' href='/busqueda'>Búsqueda</Link>
    </div>
    <div className='flex flex-col gap-y-[2px]'>
      <div className='text-sm flex justify-end gap-x-2'>
        <span>2023 - Alan Hernandez</span>
        {
          redes.map(el => <a href={el.href} key={el.name} target='_blank' rel="noopener noreferrer" className='group'>
            <el.icon className="text-neutral-500 transition-colors group-hover:text-white" width={22} height={22} />
          </a>)
        }
      </div>
      <div className="flex justify-end gap-x-2 items-center">
        <a className='text-xs group' href='https://yonathan-portfolio.netlify.app/' target='_blank' rel='noopener noreferrer'>
          Page made by
          <span className='group-hover:underline'> Jonathan Picone</span>
        </a>
      </div>
    </div>
  </footer>
}
