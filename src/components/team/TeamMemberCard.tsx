import { removeMember } from "@/api/TeamApi";
import type { TeamMember } from "@/types/index"
import { UserIcon } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type TeamMemberCardProps = {
    member: TeamMember,
};

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {

    const params = useParams();
    const projectId = params.projectId!;
    const queryClient = useQueryClient();

    // Delete member
    const { mutate, status } = useMutation({
        mutationFn: removeMember,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
        }
    });

    return (
        <>
            <div className='flex items-center justify-between gap-5'>
                <div className='flex truncate gap-3 items-center'>
                    <div className='p-3 border border-(--border) rounded-full'><UserIcon size={32} /></div>
                    <div className='truncate'>
                        <p className='text-md truncate'> {member.name} {member.lastname} </p>
                        <p className='text-sm text-(--white)/50 truncate'> {member.email} </p>
                    </div>
                </div>
                <button disabled={status === 'pending'} onClick={() => mutate({ projectId, id: member._id })} className='p-1 px-3 rounded-lg border border-(--border) hover:bg-(--error) transition-all cursor-pointer'>
                    remove
                </button>
            </div>
        </>
    )
}
