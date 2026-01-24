
import { useAuth } from '@/hooks/useAuth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FoldersIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

export function UserHeaderDropdown() {

    const { data } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('VALKYRIE_TOKEN');
        queryClient.removeQueries({queryKey: ['user']})
        navigate('/auth/login');
    }

    return (
        <Menu>
            <MenuButton className="hover:bg-(--hover) border-1 border-(--border) cursor-pointer p-2 rounded-full"><UserIcon className="fill-(--white)" /></MenuButton>
            <MenuItems
                anchor="bottom end"
                transition
                className="w-48 mt-2 origin-top bg-(--content) border border-(--border) rounded-lg transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <div className='flex flex-col items-center gap-2 justify-center mt-4 mb-2'>
                        <div className='text-xs text-(--white)/50'>Hello{ data && `, ${data.name}` } </div>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div onClick={ () => navigate(`?profile=true`) } className="cursor-pointer flex items-center gap-2 data-focus:bg-(--hover) py-2 px-4 text-left">
                        <UserIcon /> Profile
                    </div>
                </MenuItem>
                <MenuItem>
                    <Link to={`/`} className="flex items-center w-full gap-2 data-focus:bg-(--hover) py-2 px-4 text-left">
                        <FoldersIcon /> My projects
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button onClick={logout} className="flex items-center w-full cursor-pointer gap-2 border-t border-(--border) data-focus:bg-(--hover) py-2 px-4 text-left">
                        <SignOutIcon /> Log out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}