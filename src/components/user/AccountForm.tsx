import type { UserProfileForm } from "@/types/index"
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/Profile";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { SquareSpinner } from "../SquareSpinner";

type AccountFormProps = {
    closeModal: () => void | Promise<void>
}

export const AccountForm = ({ closeModal } : AccountFormProps) => {

    const { data } = useAuth();
    const queryClient = useQueryClient();

    const initialValues: UserProfileForm = {} as UserProfileForm;

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => { toast.error(error.message) },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    });

    const handleForm = async (formData: UserProfileForm) => mutate(formData);

    if (!data) return <SquareSpinner />

    return (
        <>
            <p className="mt-3 mb-2 font-bold">My account</p>
            <p className="text-sm text-(--white)/50">Here you can change your credentials, such as your name or email address.</p>

            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <div className="mb-5 flex flex-col gap-3 mt-3">
                    <label htmlFor="projectName" className="text-sm">Name</label>
                    <input
                        defaultValue={data.name}
                        id="name"
                        className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />

                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 flex flex-col gap-3 mt-3">
                    <label htmlFor="projectName" className="text-sm">Last name</label>
                    <input
                        defaultValue={data.lastname}
                        id="lastname"
                        className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                        type="text"
                        placeholder="Enter your last name"
                        {...register("lastname", {
                            required: "Last name is required",
                        })}
                    />

                    {errors.lastname && (
                        <ErrorMessage>{errors.lastname.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 flex flex-col gap-3 mt-3">
                    <label htmlFor="projectName" className="text-sm">Email</label>
                    <input
                        defaultValue={data.email}
                        id="email"
                        className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email name is required",
                        })}
                    />

                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="w-full mt-8 flex justify-end gap-2">
                    <input onClick={ closeModal } value="Cancel" className="w-full border border-(--border) hover:bg-(--hover)/80 cursor-pointer py-2 px-5 text-center text-md text-(--white) rounded-lg" />
                    <input type="submit" value="Save changes" className="w-full bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--black) rounded-lg" />
                </div>
            </form>
        </>
    )
}
