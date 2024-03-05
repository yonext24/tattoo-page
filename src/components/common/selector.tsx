import { useState } from 'react'
import { Button } from '../ui/button'
import { FormControl, FormDescription } from '../ui/form'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

export function Selector ({
  selectedValues,
  onChange,
  description
}: {
  selectedValues: string[]
  onChange: (values: string[]) => void
  description?: string
}) {
  const [value, setValue] = useState<string>('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (value === '') return
      const isValueIncluded = selectedValues.includes(value)
      if (isValueIncluded) return

      const newSelectedValues = [...selectedValues, value]

      onChange(newSelectedValues)
      setValue('')
    }
  }

  const handleDelete = (removed: string) => {
    const newValue = selectedValues.filter((el) => el !== removed)
    onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex gap-2 flex-wrap">
        {selectedValues.map((value) => (
          <Button
            onClick={() => { handleDelete(value) }}
            key={value}
            variant="outline"
            size="sm"
            className="px-2 h-auto py-1 bg-black"
          >
            {value}
          </Button>
        ))}
      </div>

      <FormControl>
        <Input
          onChange={(e) => { setValue(e.target.value) }}
          value={value}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full py-1',
            selectedValues.length > 0 && 'border-border'
          )}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  )
}
