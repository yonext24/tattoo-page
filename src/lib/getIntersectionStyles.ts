interface Props {
  destranslate: string
  translate: string
  opacity: string
  intersected: boolean
}
export function getIntersectionStyles ({ translate, opacity, intersected, destranslate }: Props): string {
  const intersectionStyles = `${intersected ? 'opacity-100' : `opacity-${opacity} ${!intersected ? translate : destranslate}`}`

  return intersectionStyles
}
