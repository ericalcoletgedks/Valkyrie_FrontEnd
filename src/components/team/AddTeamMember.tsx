import type { TeamMemberForm } from "@/types/index";
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { findUserByEmail } from "@/api/TeamApi";
import { useParams } from "react-router-dom";
import { Result } from "./Result";
import { ResultLoading } from "./ResultLoading";

export const AddTeamMember = () => {

    const params = useParams();
    const projectId = params.projectId!;

    // React hook form
    const initialValues: TeamMemberForm = {} as TeamMemberForm;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    // react query
    const mutation = useMutation({
        mutationFn: findUserByEmail
    });

    const handleForm = (formData: TeamMemberForm) => {
        const data = {
            projectId,
            formData
        }
        mutation.mutate(data);
        console.log(mutation);
    };

    const resetData = () => {
        reset();
        mutation.reset();
    };

    return (
        <>
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}

            <form onSubmit={handleSubmit(handleForm)} noValidate className="flex justify-between gap-2 mb-8">
                <input
                    id="email"
                    className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                    type="text"
                    placeholder="Search by email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Not valid email",
                        },

                    })}
                />
                <button className='p-2 px-5 rounded-lg bg-(--white) hover:bg-(--white)/80 cursor-pointer transition-all border border-(--border) outline-none'>
                    <MagnifyingGlassIcon size={22} className='fill-(--black)' />
                </button>
            </form>

                    
            {mutation.isPending && <ResultLoading /> }
            {mutation.isError && <div className="pb-3 border-b border-(--border) flex justify-center"><p className="w-fit px-2 bg-(--error)/20 rounded-full text-(--error)"> {mutation.error.message} </p></div>}
            {mutation.data && <Result user={mutation.data} resetData={ resetData } /> }
        </>
    )
}
