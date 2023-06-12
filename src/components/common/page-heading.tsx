import { Glitch } from './glitch'

export function PageHeading ({ text }: { text: string }) {
  return <div className={'mb-12 mt-6 flex justify-center animate-fadeRight transition-[opacity,transform] duration-500 ease-out'}>
  <Glitch text={text} className={'text-5xl title opacity-50 top-[0.33rem] -left-[0.33rem] text-gold'}>
    <h1 className='title text-5xl'>{text}</h1>
  </Glitch>
</div>
}
