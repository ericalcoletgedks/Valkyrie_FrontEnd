import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import type { ProjectFormData } from "types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function EditProjectForm({register, errors} : ProjectFormProps) {
    return (
        <>
            <div className="mb-5 flex flex-col gap-3 mt-3">
                <label htmlFor="projectName" className="text-sm">Project Name</label>
                <input
                    id="projectName"
                    className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                    type="text"
                    placeholder="Project name"
                    {...register("projectName", {
                        required: "Project name is required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 flex flex-col gap-3">
                <label htmlFor="clientName" className="text-sm">
                    Client name
                </label>
                <input
                    id="clientName"
                    className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                    type="text"
                    placeholder="Client name"
                    {...register("clientName", {
                        required: "Client name is required",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 flex flex-col gap-3">
                <label htmlFor="description" className="text-sm">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full h-44 p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                    placeholder="Project description"
                    {...register("description", {
                        required: "Project description is required"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}