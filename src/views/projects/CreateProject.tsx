
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

type CreateProjectProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const CreateProject = ({ setIsOpen }: CreateProjectProps) => {

    const queryClient = useQueryClient()


    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    });

    const initialValues: ProjectFormData = {} as ProjectFormData;
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleForm = (formData: ProjectFormData) => {
        mutation.mutate(formData);
        setIsOpen(false)
    };

    console.log(`register: ${register}`)

    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} noValidate>

                <ProjectForm register={register} errors={errors} />

                <div className="flex justify-end gap-2 mt-8">
                    <p onClick={() => setIsOpen(false)} className="flex items-center gap-1 border border-(--border) hover:bg-(--hover)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--white) rounded-lg">Cancel</p>

                    <input type="submit" disabled={mutation.status === "pending"} value="Create Project" className="bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--black) rounded-lg" />

                </div>
            </form>
        </>
    )
}
