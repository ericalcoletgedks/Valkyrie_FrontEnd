import type { TaskProject } from "@/types/index"
import { useNavigate } from "react-router-dom"
import { TaskDropdown } from "./TaskDropdown";
import { CalendarBlankIcon, ClockIcon, NoteBlankIcon } from "@phosphor-icons/react";
import { formatDate } from "@/utils/utils";
import { useDraggable } from '@dnd-kit/core';

export const TaskCard = ({ task, canEdit }: { task: TaskProject, canEdit: boolean }) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id
    });
    const navigate = useNavigate();

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined

    return (
        <div {...listeners} {...attributes} ref={setNodeRef} style={style} className="p-5 mb-0 border border-(--border) hover:border-(--white)/50 bg-(--content) rounded-lg">

            <div className="flex justify-between gap-3">
                <div className="flex gap-2 items-center mb-2 truncate">
                    <p className="flex items-center gap-1 text-xs rounded-md bg-(--warning)/30 px-2 w-fit"> <span className='w-2 h-2 rounded-full bg-(--warning)'></span>Medium</p>
                    {/** <p className="flex items-center gap-1 text-xs rounded-md bg-(--white)/30 px-2 w-fit"> <span className='w-2 h-2 rounded-full bg-(--white)'></span>Front</p> */}
                </div>
                <div className="flex items-center gap-1">
                    {/* <ArrowsOutCardinalIcon /> */}
                    <TaskDropdown id={task._id} canEdit={ canEdit } />
                </div>
            </div>

            <h3 onClick={() => navigate(`?viewTask=${task._id}`)} className="hover:underline cursor-pointer text-md truncate text-(--white)/80 font-bold"> {task.name} </h3>

            <p className=" text-sm mt-1 text-(--white)/50 line-clamp-3"> {task.description} </p>

            <div className="flex mt-2 items-center gap-2">
                <p className="flex items-center gap-1 text-xs 2xl:text-sm truncate"> <NoteBlankIcon /> {task.notes.length} </p>
                <p className='flex items-center gap-1 text-xs 2xl:text-sm truncate'> <CalendarBlankIcon weight='duotone' /> {formatDate(task.createdAt)} </p>
                <p className='flex items-center gap-1 text-xs 2xl:text-sm truncate'> <ClockIcon /> No deadline </p>
                {/* <p className='flex items-center gap-1 text-xs 2xl:text-sm truncate text-(--error) animate-pulse'> <ClockIcon /> 4 days </p> */}
            </div>
        </div>
    )
}
