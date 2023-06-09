import { Logo } from '../common/logo'

interface Props {
  precio: string
  loaded: boolean
}

export function DesignFooter ({ precio, loaded }: Props) {
  return <div className={`h-full ${loaded ? 'group-hover:opacity-0' : ''} text-black transition-all p-2 w-full absolute top-0 left-0 
  rounded-[inherit] flex justify-between items-end`}>
    {
      precio !== '' && <h5 className='text-lg font-bold leading-[1rem]'>${precio}</h5>
    }
    <Logo className='w-16 brightness-0' brightness='0'/>
 </div>
}
