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

export function Options({
  id,
  isDesign = false
}: {
  id: string
  isDesign?: boolean
}) {
  const handleDelete = () => {
    addModal(DeleteModal, { isDesign, id })
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
          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
