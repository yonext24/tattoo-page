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
import { Design } from '@/lib/types/design'
import { EditDesignModal } from './edit-design-modal'

export function DesignOptions({ design }: { design: Design }) {
  const handleDelete = () => {
    addModal(DeleteModal, { isDesign: true, id: design.id })
  }
  const handleEdit = () => {
    addModal(EditDesignModal, { design }, { noScroll: true })
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
