import type { Project, Task, TaskProject } from "@/types/index"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { CheckIcon, ClockIcon, DotsThreeIcon, MagnifyingGlassIcon, PauseIcon, PlusIcon, SpinnerIcon } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import { statusToPrint } from "@/locales/en";
import { TaskCard } from "./TaskCard";
import { DropTask } from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";


type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean
}

type GroupTask = {
    // key, ej. pending, Task: tarea entera
    [key: string]: TaskProject[]
};

// Esto retorna el reduce
const initialGroups: GroupTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

export const TaskList = ({ tasks, canEdit }: TaskListProps) => {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialGroups);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const params = useParams();
    const projectId = params.projectId!;

    // UseMutation - status
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: () => {
            toast.error('Something went wrong');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            toast.success('Task status updated.');
        }
    });

    // mejorar el comportamiento con headlessui
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    // mejorar el comportamiento con headlessui
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event: DragEndEvent) => {

        const { active, over } = event;

        if (over && over.id) {
            const taskId = active.id.toString();
            const status = over.id as Task['status'];

            mutate({ projectId, taskId, status });
            queryClient.setQueryData(['project', projectId], (oldData : Project) => {
                const updatedTasks = oldData.tasks.map((task) => {
                    if (task._id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })

                return {
                    ...oldData,
                    tasks: updatedTasks
                }
            })
        }

    }

    return (
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 h-full`}>

            <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className="flex flex-col gap-3">

                        {tasks.length > 0 ?
                            (
                                <>
                                    <div className="flex  justify-between items-center">
                                        <h2 className="flex items-center gap-2">
                                            {status === 'pending' && <ClockIcon />}
                                            {status === 'onHold' && <PauseIcon />}
                                            {status === 'inProgress' && <SpinnerIcon />}
                                            {status === 'underReview' && <MagnifyingGlassIcon />}
                                            {status === 'completed' && <CheckIcon />}
                                            {statusToPrint[status]}
                                        </h2>

                                        <div className="flex items-center gap-2">
                                            <PlusIcon onClick={() => navigate('?newTask=true')} className="cursor-pointer" />
                                            {/** <DotsThreeIcon /> */}
                                        </div>
                                    </div>

                                    <DropTask status={status} />

                                    {
                                        tasks.map((task) => (
                                            <TaskCard key={task._id} task={task} canEdit={canEdit} />
                                        ))
                                    }

                                    <p onClick={() => navigate('?newTask=true')} className="flex items-center cursor-pointer gap-1 text-xs hover:underline">
                                        <PlusIcon className="fill-(--white)" /> Add new task
                                    </p>
                                </>
                            )
                            : (
                                <>
                                    <div className="flex justify-between items-center">
                                        <h2 className="flex items-center gap-2">
                                            {status === 'pending' && <ClockIcon />}
                                            {status === 'onHold' && <PauseIcon />}
                                            {status === 'inProgress' && <SpinnerIcon />}
                                            {status === 'underReview' && <MagnifyingGlassIcon />}
                                            {status === 'completed' && <CheckIcon />}
                                            {statusToPrint[status]}
                                        </h2>

                                        <div className="flex items-center gap-2">
                                            <PlusIcon onClick={() => navigate('?newTask=true')} className="cursor-pointer" />
                                            <DotsThreeIcon />
                                        </div>
                                    </div>

                                    <DropTask status={status} />
                                </>
                            )}
                    </div>
                ))}
            </DndContext>

        </div>
    )
}
