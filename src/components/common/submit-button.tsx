import { Button } from '../ui/button'
import { Spinner } from './spinner'

export function SubmitButton ({ loading }: { loading: boolean }) {
  return <Button type='submit' variant='default'>
    {
      loading ? <Spinner /> : 'Subir'
    }
  </Button>
}
