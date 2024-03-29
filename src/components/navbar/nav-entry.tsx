import Link from 'next/link'

interface Props {
  name: string
  url: string
  isCurrent: boolean
}

export function NavEntry ({ name, url, isCurrent }: Props) {
  return <li key={name} className='group bg-gold'>
  <Link href={url}
  className={`bg-pageblack block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform p-[0.15rem] border
  border-transparent group-hover:border-t-gray-700/30 group-hover:border-r-gray-700/30`}>
    <span className={isCurrent ? 'text-gold' : ''}>{name}</span>
  </Link>
</li>
}
