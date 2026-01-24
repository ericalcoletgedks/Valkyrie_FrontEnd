import { handleError } from "@/utils/utils";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";
import api from "@/lib/axios";

export async function findUserByEmail({projectId, formData} : {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {

        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function addMember({projectId, id} : {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {

        const url = `/projects/${projectId}/team`;
        const { data } = await api.post<string>(url, {id});
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function getProjectTeam(projectId : Project['_id']) {
    try {

        const url = `/projects/${projectId}/team`;
        const { data } = await api(url);
        const response = teamMembersSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        handleError(error);
    }
}

export async function removeMember({projectId, id} : {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {

        const url = `/projects/${projectId}/team/${id}`;
        const { data } = await api.delete<string>(url);
        return data;

    } catch (error) {
        handleError(error);
    }
}
