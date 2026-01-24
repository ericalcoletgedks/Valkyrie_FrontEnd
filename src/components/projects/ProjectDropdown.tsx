import { useAuth } from '@/hooks/useAuth'
import type { DashboardProject, Project } from '@/types/index'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { DoorOpenIcon, DotsThreeIcon, EyeIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

type ProjectDropdown = {
  id: Project['_id'],
  project: DashboardProject
}

export function ProjectDropdown({ id, project }: ProjectDropdown) {

  const location = useLocation();
  const { data: user } = useAuth();

  return (
    <Menu>
      <MenuButton className="cursor-pointer"> <DotsThreeIcon size={20} /> </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="z-20 w-48 origin-top bg-(--content) border border-(--border) rounded-lg transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuItem>
          <Link to={`projects/${id}`} className="flex items-center gap-2 data-focus:bg-(--hover) py-2 px-4 text-left">
            <EyeIcon /> View project
          </Link>
        </MenuItem>

        {project.manager !== user?._id && (
          <MenuItem>
            <Link to={`projects/${id}/delete`} state={{ backgroundLocation: location }} className="flex text-(--error) items-center gap-2 border-t border-(--border) data-focus:bg-(--hover) py-2 px-4 text-left">
              <DoorOpenIcon /> Leave project
            </Link>
          </MenuItem>
        )}

        {project.manager === user?._id && (
          <>
            <MenuItem>
              <Link to={`projects/${id}/edit`} className="flex items-center w-full gap-2 data-focus:bg-(--hover) py-2 px-4 text-left">
                <PencilIcon /> Edit
              </Link>
            </MenuItem>

            <MenuItem>
              <Link to={`projects/${id}/delete`} state={{ backgroundLocation: location }} className="flex text-(--error) items-center gap-2 border-t border-(--border) data-focus:bg-(--hover) py-2 px-4 text-left">
                <TrashIcon /> Delete
              </Link>
            </MenuItem>
          </>
        )}
      </MenuItems>
    </Menu>
  )
}