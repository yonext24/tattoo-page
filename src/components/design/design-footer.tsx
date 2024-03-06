import { Logo } from '../common/logo'

interface Props {
  loaded: boolean
}

export function DesignFooter({ loaded }: Props) {
  return (
    <div
      className={`h-full ${loaded ? 'group-hover:opacity-0' : ''} text-black transition-all p-2 w-full absolute top-0 left-0 
  rounded-[inherit] flex justify-between items-end`}
    >
      <Logo className="w-16 brightness-0" brightness="0" />
    </div>
  )
}
