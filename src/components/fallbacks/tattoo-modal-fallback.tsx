import { Spinner } from '../common/spinner'

export function TattooModalFallback () {
  return <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center'><Spinner className='w-16 h-16' /></div>
}
