import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  intersected: boolean
}

export function SearchInput ({ onChange, value, intersected }: Props) {
  const a = getIntersectionStyles({ translate: 'translate-x-4', destranslate: 'translate-x-0', opacity: '0', intersected })

  return <input
  type="text"
  className={`bg-black border-2 w-[calc(100%-10px)] border-white/60 text-white py-3 px-4 outline-none rounded-md tracking-widest
  ml-auto focus:bg-neutral-950 focus:text-slate-100 focus:border-white transition-all duration-500 placeholder:text-white/25 ${a}`}
  onChange={onChange}
  value={value}
  spellCheck={false}
  placeholder="Buscar tatuaje"
  />
}
