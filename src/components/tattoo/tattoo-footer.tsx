import { Logo } from '../common/logo'

interface Props {
  name: string
  loaded: boolean
}

export function TattooFooter ({ name, loaded }: Props) {
  return <div className={`h-full ${loaded ? 'group-hover:opacity-0' : ''} transition-all p-2 w-full absolute top-0 left-0 bg-gradient-to-b from-transparent
  to-black via-transparent rounded-[inherit] flex flex-col justify-end items-end`}>
    <Logo className='w-16 brightness-[20]' brightness='[20]' />
   <h5 className='text-2xl select-none max-[370px]:text-xl capitalize'>{name}</h5>
 </div>
}
