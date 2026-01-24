import { addMember } from '@/api/TeamApi';
import type { TeamMember } from '@/types/index'
import { UserIcon, UserPlusIcon } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Result = ({ user, resetData } : { user : TeamMember, resetData: () => void }) => {

    const params = useParams();
    const projectId = params.projectId!;
    const queryClient = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: addMember,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            resetData();
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
        }
    });

    return (
        <div className='flex flex-col gap-5 pb-3 mb-5 overflow-y-scroll max-h-96 border-b border-(--border) transition-all'>

            <p className='text-sm text-center'>Search result</p>

            <div className='flex items-center justify-between gap-5'>
                <div className='flex truncate gap-3 items-center'>
                    <div className='p-3 border border-(--border) rounded-full'><UserIcon size={32} /></div>
                    <div className='truncate'>
                        <p className='text-md truncate'> {user.name} {user.lastname} </p>
                        <p className='text-sm text-(--white)/50 truncate'> {user.email} </p>
                    </div>
                </div>
                <button disabled={ status === 'pending' } onClick={ () => mutate({ projectId, id: user._id }) } className='p-1 px-8 rounded-lg border border-(--border) hover:bg-(--hover) transition-all cursor-pointer'> <UserPlusIcon size={22} /> </button>
            </div>

        </div>
    )
}
