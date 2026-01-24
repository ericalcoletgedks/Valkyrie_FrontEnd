import { getTaskById } from "@/api/TaskApi";
import { statusToPrint } from "@/locales/en";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { ArrowDownIcon, CheckIcon, ClockIcon, MagnifyingGlassIcon, PauseIcon, SpinnerIcon, XIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { SquareSpinner } from "../SquareSpinner";
import { useState } from "react";
import { NotesPanel } from "../notes/NotesPanel";

export const ViewTaskModal = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const queryParams = new URLSearchParams(location.search);
    const [showHistory, setShowHistory] = useState(false);

    const show = queryParams.get('viewTask') ? true : false;
    const closeModal = () => navigate('', { replace: true });

    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    // useQuery
    const { data, isLoading, isError } = useQuery({
        queryKey: ['task', projectId, taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: 1
    });

    /*
    const queryClient = useQueryClient();

    
    // UseMutation - status
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: () => {
            toast.error('Something went wrong');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            queryClient.invalidateQueries({ queryKey: ['task', projectId, taskId] });
            toast.success('Task status updated.');
        }
    });

    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as Task['status'];
        const data = { projectId, taskId, status };

        mutate(data);
    }*/

    return (
        <>
            <Dialog
                open={show}
                onClose={closeModal}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">

                    {data &&
                        (
                            <>

                                <div className='flex justify-between items-center mb-3 mt-3'>
                                    <DialogTitle className="font-bold text-4xl "> {data.name} </DialogTitle>
                                    <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                                </div>

                                <div className="flex gap-2 items-center truncate">
                                    <p className="flex items-center gap-1 text-xs rounded-md bg-(--warning)/30 px-2 w-fit"> <span className='w-2 h-2 rounded-full bg-(--warning)'></span>Medium</p>
                                    {/** <p className="flex items-center gap-1 text-xs rounded-md bg-(--white)/30 px-2 w-fit"> <span className='w-2 h-2 rounded-full bg-(--white)'></span>Front</p> */}
                                </div>

                                <p className='text-sm text-(--white)/50 bg-(--hover)/40 p-5 rounded-lg'>
                                    {data.description}
                                </p>

                                <NotesPanel notes={data.notes} />

                                {/* <select onChange={handleChange} defaultValue={data.status} className="my-5 w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none">
                                    {
                                        Object.entries(statusToPrint).map(([key, value]) => (
                                            <option key={key} value={key} className="bg-(--content) text-(--white)">
                                                {value}
                                            </option>
                                        ))
                                    }
                                </select> */}

                                <p onClick={() => setShowHistory(!showHistory)} className="text-sm text-center cursor-pointer hover:underline">
                                    {showHistory ? 'Hide status history' : 'Show status history'}
                                </p>
                                {showHistory && (
                                    <div className="flex flex-col items-center justify-center">
                                        {data.completedBy.map((log) => (
                                            <>
                                                <p className={`flex items-center gap-1 text-sm rounded-md  ${log.status === 'completed' ? 'bg-(--success)' : 'bg-(--white)'} text-(--black) px-2 w-fit`}>

                                                    {log.status === 'pending' && <ClockIcon />}
                                                    {log.status === 'onHold' && <PauseIcon />}
                                                    {log.status === 'inProgress' && <SpinnerIcon />}
                                                    {log.status === 'underReview' && <MagnifyingGlassIcon />}
                                                    {log.status === 'completed' && <CheckIcon />}

                                                    {statusToPrint[log.status]}
                                                </p>
                                                <p className="text-xs text-(--white)/50 mt-2">By {log.user.name} {log.user.lastname} </p>
                                                <div className="last:hidden my-3"> <ArrowDownIcon size={18} /> </div>
                                            </>
                                        ))}
                                    </div>
                                )}

                            </>
                        )
                    }

                    {isLoading &&
                        (
                            <SquareSpinner />
                        )
                    }
                    {isError &&
                        (
                            <p className="text-center">Something went wrong...</p>
                        )
                    }

                </DialogPanel>
            </Dialog>
        </>
    )
}

