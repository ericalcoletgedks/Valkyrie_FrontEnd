
import { updateProject } from '@/api/ProjectApi';
import EditProjectForm from '@/components/projects/EditProjectForm';
import type { ProjectFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type EditProjectProps = {
    project: ProjectFormData
    projectId: string
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
};

export const EditProject = ({ project, projectId, setIsOpenEdit }: EditProjectProps) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const initialValues: ProjectFormData = {
        projectName: project.projectName,
        clientName: project.clientName,
        description: project.description
    };

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, status } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.success(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectsEdit', projectId] });
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            toast.success(data);
            navigate('/')
        }
    });

    const handleForm = (formData : ProjectFormData) => {
        const data = {
            projectId,
            formData
        }
        mutate(data);
        setIsOpenEdit(false);
    };

    return (
        <>
            <form className='w-full h-64 sm:h-auto overflow-y-scroll' onSubmit={handleSubmit(handleForm)} noValidate>

                <EditProjectForm register={register} errors={errors} />

                <div className="flex justify-end gap-2">
                    <button onClick={() => { setIsOpenEdit(false); navigate('/') }} className="flex items-center gap-1 border border-(--border) hover:bg-(--hover)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--white) rounded-lg">Cancel</button>
                    <input type="submit" disabled={status === "pending"} value="Save changes" className="bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--black) rounded-lg" />
                </div>
            </form>
        </>
    )
}
