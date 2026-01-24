
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { WarningCircleIcon, XIcon } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/api/ProjectApi'
import { EditProject } from '@/views/projects/EditProject'

type EditProjectModalProps = {
    isOpenEdit: boolean
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
    id: string
}

export function EditProjectModal({ isOpenEdit, setIsOpenEdit }: EditProjectModalProps) {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.id!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectsEdit', projectId],
        queryFn: () => getProjectById(projectId),
        retry: 1
    });

    if (!isLoading && !isError) {

        return (
            <Dialog
                open={isOpenEdit}
                onClose={() => { setIsOpenEdit(false); navigate('/') }}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                    <div className='flex justify-between items-center mb-8 mt-3'>
                        <DialogTitle className="font-bold text-4xl ">Edit project</DialogTitle>
                        <XIcon onClick={() => { setIsOpenEdit(false); navigate('/') }} size={23} className='cursor-pointer' />
                    </div>

                    {data && (<EditProject setIsOpenEdit={setIsOpenEdit} project={data} projectId={projectId} />)}

                </DialogPanel>
            </Dialog>
        )

    } else {
        return (
            <>
                <Dialog
                    open={isOpenEdit}
                    onClose={() => { setIsOpenEdit(false); navigate('/') }}
                    transition
                    className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
                >
                    <DialogPanel className="rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                        <div className='flex justify-between items-center mb-8 mt-3'>
                            <DialogTitle className="font-bold text-4xl "> {!isError && 'Edit project'} </DialogTitle>
                            <XIcon onClick={() => { setIsOpenEdit(false); navigate('/') }} size={23} className='cursor-pointer' />
                        </div>

                        {!isError ?
                            (
                                <>
                                    <div className="mb-10 flex flex-col gap-3 mt-3">
                                        <label htmlFor="projectName" className="bg-(--hover) animate-pulse w-28 h-4 rounded-lg"></label>
                                        <div className="bg-(--hover) animate-pulse w-full h-10 rounded-lg"></div>
                                    </div>

                                    <div className="mb-10 flex flex-col gap-3 mt-3">
                                        <label htmlFor="projectName" className="bg-(--hover) animate-pulse w-28 h-4 rounded-lg"></label>
                                        <div className="bg-(--hover) animate-pulse w-full h-10 rounded-lg"></div>
                                    </div>

                                    <div className="mb-5 flex flex-col gap-3 mt-3">
                                        <label htmlFor="projectName" className="bg-(--hover) animate-pulse w-28 h-4 rounded-lg"></label>
                                        <div className="bg-(--hover) animate-pulse w-full h-44 rounded-lg"></div>
                                    </div>

                                    <div className="mb-5 flex flex-flex justify-end gap-3 mt-3">
                                        <div className="bg-(--hover) animate-pulse w-28 h-10 rounded-lg"></div>
                                        <div className="bg-(--hover) animate-pulse w-28 h-10 rounded-lg"></div>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <div className='flex flex-col mb-10 gap-5 justify-center items-center'>
                                        <WarningCircleIcon className='animate-bounce' size={82} />
                                        <h1 className='text-3xl'>Something went wrong.</h1>
                                    </div>
                                </>
                            )}

                    </DialogPanel>
                </Dialog>
            </>
        )
    }
}