import { handleError } from "@/utils/utils";
import type { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

export type NoteApiType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export async function createNote({ formData, projectId, taskId } : Pick<NoteApiType, 'formData' | 'projectId' | 'taskId'>) {
    try {

        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function deleteNote({ noteId, projectId, taskId } : Pick<NoteApiType, 'noteId' | 'projectId' | 'taskId'>) {
    try {

        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const { data } = await api.delete<string>(url);
        return data;

    } catch (error) {
        handleError(error);
    }
}