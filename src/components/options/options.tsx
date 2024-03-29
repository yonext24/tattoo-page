import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { addModal } from 'react-modal-observer'
import { DeleteModal } from './delete-modal'
import { EditModal } from './edit-modal'
import { Tattoo } from '@/lib/types/tattoo'

export function Options({
  tattoo,
  isDesign = false
}: {
  tattoo: Tattoo
  isDesign?: boolean
}) {
  const handleDelete = () => {
    addModal(DeleteModal, { isDesign, id: tattoo.id })
  }
  const handleEdit = () => {
    addModal(EditModal, { tattoo }, { noScroll: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-9 h-9 !p-0 rounded-full ">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className="" onClick={handleEdit}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
