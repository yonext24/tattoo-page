import { type Design } from './design'
import { type Tattoo } from './tattoo'

export interface StateType {
  open: boolean
  tattoo: Tattoo | null
  design: Design | null
}
