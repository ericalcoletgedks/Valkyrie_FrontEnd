import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XIcon } from '@phosphor-icons/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AddTeamMember } from './AddTeamMember';
import { TeamMemberCard } from './TeamMemberCard';
import { useQuery } from '@tanstack/react-query';
import { getProjectTeam } from '@/api/TeamApi';
import { SquareSpinner } from '../SquareSpinner';
import { ModalError } from '../ModalError';

export const ProjectTeamModal = () => {

    const params = useParams();
    const projectId = params.projectId!;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const show = queryParams.get('projectTeam') ? true : false;
    const closeModal = () => navigate('', { replace: true });

    // List members
    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        enabled: show,
        retry: 1
    });

    if (isError) return <ModalError show={show} closeModal={closeModal} />

    return (
        <Dialog
            open={show}
            onClose={closeModal}
            transition
            className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                <div className='flex justify-between items-center mb-3 mt-3'>
                    <DialogTitle className="font-bold text-4xl ">Project team</DialogTitle>
                    <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                </div>

                <p className='text-sm text-(--white)/50 mb-8'>
                    View and manage the members involved in this project. You can add new users to collaborate or remove existing ones to keep your team up to date.
                </p>

                <AddTeamMember />

                <div className='flex flex-col gap-5 mb-3 overflow-y-scroll max-h-96'>

                    {isLoading && <SquareSpinner />}

                    {data && (
                        data?.length > 0 ? (
                            <>
                                <p className='text-sm text-(--white)/50 text-center'>List of users in this project</p>
                                {data.map(member => (
                                    <TeamMemberCard key={member._id} member={member} />
                                ))}
                            </>
                        ) : (
                            <p className='text-sm text-(--white)/50 text-center'>This project has no members yet</p>
                        )

                    )}

                </div>

            </DialogPanel>
        </Dialog>
    )
}
