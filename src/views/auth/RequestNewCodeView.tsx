import { requestConfirmationCode } from "@/api/Auth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Spinner } from "@/components/Spinner";
import type { requestConfirmationCodeForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RequestNewCodeView = () => {

    const navigate = useNavigate();
    const initialValues: requestConfirmationCodeForm = {} as requestConfirmationCodeForm;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, status } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/auth/validation#content');
            reset();
        }
    })

    const handleRequestCode = (formData: requestConfirmationCodeForm) => mutate(formData);

    return (
        <form onSubmit={handleSubmit(handleRequestCode)} noValidate>
            <div className="mb-5 flex flex-col gap-3">
                <label htmlFor="email" className="text-sm">Email</label>
                <input
                    id="email"
                    className="w-full p-2 rounded-lg border border-(--border) outline-none"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Not valid email",
                        },
                    })}
                />

                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>

            <div className="mt-5 flex items-center gap-2">
                <button disabled={ status === 'pending' } className="disabled:cursor-auto disabled:bg-(--white)/40 disabled:hover:bg-(--white)/40 flex items-center gap-2 justify-center w-full p-2 rounded-lg bg-(--white) text-(--black) border border-(--border) cursor-pointer hover:bg-(--white)/80 transition-all">
                    { status === 'pending' ? <Spinner /> : 'Send code' }
                </button>
            </div>
        </form>
    )
}
