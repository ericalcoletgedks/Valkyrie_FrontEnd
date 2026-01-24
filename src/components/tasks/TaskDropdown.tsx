import type { Task } from '@/types/index'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { DotsThreeIcon, EyeIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

type ProjectDropdown = {
  id: Task['_id'],
  canEdit: boolean
}

export function TaskDropdown({ id, canEdit }: ProjectDropdown) {

  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton className="cursor-pointer"> <DotsThreeIcon /> </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="w-48 origin-top bg-(--content) border border-(--border) rounded-lg transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuItem>
          <button onClick={() => navigate(`?viewTask=${id}`)} className="cursor-pointer flex items-center w-full gap-2 data-focus:bg-(--hover) py-2 px-4 text-left">
            <EyeIcon /> View task
          </button>
        </MenuItem>
        <MenuItem>
          <button onClick={() => navigate(`?editTask=${id}`)} className="cursor-pointer flex items-center w-full gap-2 data-focus:bg-(--hover) py-2 px-4 text-left">
            <PencilIcon /> Edit task
          </button>
        </MenuItem>
        {canEdit && (
          <MenuItem>
            <button onClick={() => navigate(`?deleteTask=${id}`)} className="cursor-pointer flex items-center w-full gap-2 data-focus:bg-(--hover) py-2 px-4 text-left border-t border-(--border) text-(--error)">
              <TrashIcon /> Delete
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  )
}