import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDateFull, formatTimeShort, todaysDate } from "@/utils/utils"
import { UserIcon } from "@phosphor-icons/react"
import { SquareSpinner } from "../SquareSpinner"
import { useMemo, useState } from "react"
import { NotesDropdown } from "./NotesDropdown"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type DetailProps = {
    note: Note
}

export const NoteDetail = ({ note }: DetailProps) => {

    const { data, isLoading } = useAuth();
    const isAuthor = useMemo(() => note.createdBy._id === data?._id, [data]);
    const [showDropdown, setShowDropdown] = useState(false);
    const queryClient = useQueryClient();
    const params = useParams();
    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', projectId, taskId] });
        }
    });

    if (isLoading) return <SquareSpinner />

    return (

        <>
            <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className="flex gap-3 my-10">
                <div>
                    <div className="hover:bg-(--hover) border-1 border-(--border) cursor-pointer p-3 rounded-full"><UserIcon size={28} className="fill-(--white)" /></div>
                </div>
                <div>
                    <div className="flex justify-between">
                        {isAuthor ? (<p>You</p>) : (<p> {note.createdBy.name} {note.createdBy.lastname} </p>)}
                        {data && showDropdown && isAuthor ? <NotesDropdown id={note._id} mutate={mutate} /> : <p></p>}
                        
                    </div>


                    {todaysDate(note.createdAt) ? (
                        <p className="text-(--white)/50 text-xs"> Today - {formatTimeShort(note.createdAt)} </p>
                    ) : (
                        <p className="text-(--white)/50 text-xs"> {formatDateFull(note.createdAt)} - {formatTimeShort(note.createdAt)} </p>
                    )}

                    <p className="mt-2"> {note.content} </p>
                </div>
            </div>
        </>

    )
}
