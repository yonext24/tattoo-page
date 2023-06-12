import Image from 'next/image'

export function ErrorComponent ({ error, m = true }: { error?: string, m?: boolean }) {
  return <div className={`flex flex-col h-full w-full justify-center items-center ${m ? 'm-auto' : 'mx-auto'}`}>
    <div className='h-[200px] w-[250px] flex flex-col justify-center items-center'>
      <Image height={150} width={150} src='/errorImg.webp' alt='Rodillo de pintura' className='invert' />
      <span className='text-center'>{error}</span>
    </div>
  </div>
}
