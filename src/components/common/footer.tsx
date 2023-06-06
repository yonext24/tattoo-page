import InstagramIcon from '../icons/instagram-icon'
import WhatsappIcon from '../icons/whatsapp-icon'

const redes = [
  { name: 'Instagram', href: 'https://www.instagram.com/alannn.tattoo/', icon: InstagramIcon },
  { name: 'Whatsapp', href: '', icon: WhatsappIcon }
]

export function Footer () {
  return <footer className="gap-y-2 flex flex-col border-t border-neutral-600/50 text-neutral-500 w-3/4 py-2 ml-auto mt-6">
    <div className='text-sm flex justify-end'>
      <span>2023 - Alan Hernandez</span>
    </div>
    <div className="flex justify-end gap-x-2">
      {
        redes.map(el => <a href={el.href} key={el.name} target='_blank' rel="noopener noreferrer" className='group'>
          <el.icon className="text-neutral-500 transition-colors group-hover:text-white" width={25} height={25} />
        </a>)
      }
    </div>
  </footer>
}
