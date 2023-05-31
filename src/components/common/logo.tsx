import Image from 'next/image'

interface Props {
  className?: string
  brightness: string
}

export function Logo ({ className, brightness }: Props) {
  return <Image alt='logo' loading='lazy' width={90} height={28} src='/logo.webp' className={`grayscale brightness-${brightness} aspect-[3.2] ${className ?? ''}`} />
}
