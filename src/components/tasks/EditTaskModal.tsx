import { getTaskById, updateTask } from '@/api/TaskApi';
import type { TaskFormData } from '@/types/index';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { WarningCircleIcon, XIcon } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ErrorMessage } from '../ErrorMessage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const EditTaskModal = () => {

    // Modal
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const show = queryParams.get('editTask') ? true : false;
    const closeModal = () => navigate('', { replace: true });
    const queryClient = useQueryClient();

    // Project & Task id
    const params = useParams();
    const projectId = params.projectId!;
    const taskId = queryParams.get('editTask')!;

    // Get Task
    const { data, isLoading, isError } = useQuery({
        queryKey: ['task', projectId, taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: 1
    })

    // React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    // useMutate
    const { mutate, status } = useMutation({
        mutationFn: updateTask,
        onError: () => {
            toast.error('Something went wrong');
            closeModal();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', projectId, taskId] });
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            toast.success('The task was updated successfully');
            reset();
            closeModal();
        }
    });

    // Funcion del formulario
    const handleForm = async (form: TaskFormData) => {
        const data = {
            projectId,
            taskId,
            form
        }
        mutate(data);
    };

    if (!isLoading && !isError) {

        return (
            <>
                <Dialog
                    open={show}
                    onClose={closeModal}
                    transition
                    className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
                >
                    <DialogPanel className="rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                        <div className='flex justify-between items-center mb-3 mt-3'>
                            <DialogTitle className="font-bold text-4xl ">Edit task</DialogTitle>
                            <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                        </div>

                        <p className='text-sm text-(--white)/50 mb-8'>
                            Edit the current task by entering the necessary details such as name and description. Stay organized and keep track of your to-dos efficiently.
                        </p>

                        {data &&
                            (
                                <form onSubmit={handleSubmit(handleForm)} noValidate>
                                    <div className="mb-5 flex flex-col gap-3">
                                        <label htmlFor="clientName" className="text-sm">
                                            Task name:
                                        </label>
                                        <input
                                            id="name"
                                            className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                                            type="text"
                                            placeholder="Type a short, descriptive title"
                                            {...register("name", {
                                                required: "Task name is required"
                                            })}
                                        />

                                        {errors.name && (
                                            <ErrorMessage> {errors.name.message} </ErrorMessage>
                                        )}
                                    </div>

                                    <div className="mb-5 flex flex-col gap-3">
                                        <label htmlFor="description" className="text-sm">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="w-full h-44 p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                                            placeholder="Add more details about the task"
                                            {...register("description", {
                                                required: "Task description is required"
                                            })}
                                        />

                                        {errors.description && (
                                            <ErrorMessage> {errors.description.message} </ErrorMessage>
                                        )}
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button onClick={closeModal} className="flex items-center gap-1 border border-(--border) hover:bg-(--hover)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--white) rounded-lg">Cancel</button>
                                        <input type="submit" disabled={status === 'pending'} value="Update Task" className="bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--black) rounded-lg" />
                                    </div>
                                </form>
                            )}

                    </DialogPanel>
                </Dialog>
            </>
        )

    } else {
        return (<>

            <Dialog
                open={show}
                onClose={closeModal}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">

                    {!isError ?
                        (
                            <>

                                <div className='flex justify-between items-center mb-3 mt-3'>
                                    <DialogTitle className="font-bold text-4xl ">Edit task</DialogTitle>
                                    <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                                </div>

                                <p className='text-sm text-(--white)/50 mb-8'>
                                    Edit the current task by entering the necessary details such as name and description. Stay organized and keep track of your to-dos efficiently.
                                </p>

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
                                <div className='flex justify-end items-center mb-3 mt-3'>
                                    <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                                </div>

                                <div className='flex flex-col mb-10 gap-5 justify-center items-center'>
                                    <WarningCircleIcon className='animate-bounce' size={82} />
                                    <h1 className='text-3xl'>Something went wrong.</h1>
                                </div>
                            </>

                        )
                    }
                </DialogPanel>
            </Dialog>
        </>)
    }


}
