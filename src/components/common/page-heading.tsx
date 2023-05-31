import { Glitch } from './glitch'
import { getIntersectionStyles } from '@/lib/getIntersectionStyles'

export function PageHeading ({ text, intersected }: { text: string, intersected: boolean }) {
  const a = getIntersectionStyles({ translate: '-translate-y-1/4', destranslate: 'translate-y-0', opacity: '0', intersected })

  return <div className={`mb-12 mt-6 flex justify-center ${a} transition-[opacity,transform] duration-500 ease-out`}>
  <Glitch text={text} className={'text-5xl title opacity-50 top-[0.33rem] -left-[0.33rem] text-gold'}>
    <h1 className='title text-5xl'>{text}</h1>
  </Glitch>
</div>
}
