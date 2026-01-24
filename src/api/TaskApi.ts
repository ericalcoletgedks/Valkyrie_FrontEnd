import { isAxiosError } from "axios";
import { TaskSchema, type Project, type Task, type TaskFormData } from "../types";
import api from "@/lib/axios";

type TaskApi = {
    form: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export const createTask = async ({ form, projectId } : Pick<TaskApi, 'form' | 'projectId'>)  => {
    try {

        const data = api.post<string>(`/projects/${projectId}/tasks`, form);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getTaskById = async ({ projectId, taskId } : Pick<TaskApi, 'projectId' | 'taskId'>) => {
    try {

        const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);
        
        const response = TaskSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        };
    };
};

export const updateTask = async ({ projectId, taskId, form } : Pick<TaskApi, 'projectId' | 'taskId' | 'form'>) => {
    try {

        const data = await api.put<string>(`/projects/${projectId}/tasks/${taskId}`, form);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        };
    }
}

export const deleteTask = async ({ projectId, taskId } : Pick<TaskApi, 'projectId' | 'taskId'>) => {
    try {
        
        const data = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}`);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        };
    }
}

export const updateStatus = async ({ projectId, taskId, status } : Pick<TaskApi, 'projectId' | 'taskId' | 'status'>) => {
    try {
        
        const data = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
        
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        };
    }
}