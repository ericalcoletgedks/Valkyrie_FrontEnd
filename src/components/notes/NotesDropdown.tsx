import type { NoteApiType } from '@/api/NoteApi'
import type { Note } from '@/types/index'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { DotsThreeIcon, TrashIcon } from '@phosphor-icons/react'
import type { UseMutateFunction } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

type ProjectDropdown = {
  id: Note['_id'],
  mutate: UseMutateFunction<string | undefined, Error, Pick<NoteApiType, "noteId" | "projectId" | "taskId">, unknown>
}

export function NotesDropdown({ id, mutate }: ProjectDropdown) {

  const params = useParams();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get('viewTask')!;

  return (
    <Menu>
      <MenuButton className="cursor-pointer"> <DotsThreeIcon /> </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="w-48 origin-top bg-(--content) border border-(--border) rounded-lg transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
      >

        <MenuItem>
          <button onClick={() => mutate({ noteId: id, projectId, taskId })} className="cursor-pointer flex items-center w-full gap-2 data-focus:bg-(--hover) py-2 px-4 text-left text-(--error)">
            <TrashIcon /> Delete
          </button>
        </MenuItem>

      </MenuItems>
    </Menu>
  )
}