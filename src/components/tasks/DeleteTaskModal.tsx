import { deleteTask } from '@/api/TaskApi';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function DeleteTaskModal() {

    // Modal
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const show = queryParams.get('deleteTask') ? true : false;
    const closeModal = () => { navigate('', { replace: true }) };

    // Params
    const taskId = queryParams.get('deleteTask')!;
    const projectId = params.projectId!;

    const queryClient = useQueryClient();

    // UseMutation
    const { mutate, status } = useMutation({
        mutationFn: deleteTask,
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            toast.error('Something went wrong.');
            closeModal();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            toast.success('Successfully removed task.');
            closeModal();
        }
    });

    return (
        <>
            <>
                <Dialog
                    open={show}
                    onClose={closeModal}
                    transition
                    className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
                >
                    <DialogPanel className="rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                        <DialogTitle className="font-bold text-2xl">Delete task</DialogTitle>
                        <Description>This will permanently remove this task.  Are you sure?</Description>
                        <div className="flex justify-end gap-5">
                            <button onClick={closeModal} className='cursor-pointer'>Cancel</button>
                            <button onClick={() => mutate({ taskId, projectId }) } disabled={status === 'pending'} className='text-(--error) hover:underline cursor-pointer'>Delete</button>
                        </div>
                    </DialogPanel>
                </Dialog>
            </>
        </>
    )
}

export default DeleteTaskModal;