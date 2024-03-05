import { cn } from '@/lib/utils'
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { buttonVariants } from '../ui/button'

export const ImagePicker = forwardRef(function ImagePicker(
  {
    onChange,
    accept = 'image/webp',
    render
  }: {
    onChange: (props: any) => void
    accept: string
    render: (url: string) => JSX.Element
  },
  ref
) {
  const [, setImage] = useState<File | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)

  const reset = useCallback(() => {
    setImage(null)
    setUrl(null)
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }, [])

  useImperativeHandle(ref, () => ({
    reset
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return

    if (file) {
      setImage(file)
      onChange(file)
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={imageInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id={id}
      />
      <label
        htmlFor={id}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'w-max bg-black rounded-sm cursor-pointer'
        )}
      >
        Seleccionar imágen
      </label>
      {url && render(url)}
    </div>
  )
})
