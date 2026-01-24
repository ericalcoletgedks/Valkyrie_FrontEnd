
import { createNote } from "@/api/NoteApi";
import type { NoteFormData } from "@/types/index";
import { PaperPlaneRightIcon } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const NoteForm = () => {

    const params = useParams();
    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;
    const queryClient = useQueryClient();

    const [noteForm, setNoteForm] = useState<NoteFormData>({ content: '' });

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            setNoteForm({ content: '' });
            queryClient.invalidateQueries({ queryKey: ['task', projectId, taskId] });
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        mutate({
            formData: noteForm,
            projectId,
            taskId
        });

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex my-5 w-full items-end p-2 rounded-lg bg-(--border)/20 border border-(--border)">
                    <textarea value={noteForm.content} onChange={(event) => setNoteForm({ content: event.target.value })} id="content" className="w-full outline-none resize-none" placeholder="Include task-specific notes here" />
                    <button disabled={!noteForm.content} className="p-3 bg-(--white) disabled:bg-(--white)/30 rounded-full"> <PaperPlaneRightIcon className="fill-(--black)" size={20} /> </button>
                </div>
            </form>
        </>
    )
}
