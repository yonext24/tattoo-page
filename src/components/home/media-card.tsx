interface Props {
  name: string
  url: string
}

export function MediaCard ({ name, url }: Props) {
  return <a href={url} className='border border-white px-16 transition-all relative overflow-hidden group hover:after:left-0 hover:border-gold
  after:bg-gold after:h-full after:w-full after:absolute after:-left-full after:z-10 after:pointer-events-none after:transition-all after:ease-in-out after:duration-300'>
    <span className="title relative z-20 group-hover:text-black transition-colors">{name}</span>
  </a>
}