import Image from 'next/image'

interface Props {
  className?: string
}

export function Logo ({ className }: Props) {
  return <Image alt='logo' loading='lazy' width={90} height={28} src='/logo.webp' className={`grayscale brightness-[20] aspect-[3.2] ${className ?? ''}`} />
}
