import { createAccount } from "@/api/Auth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Spinner } from "@/components/Spinner";
import type { UserRegistrationForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RegisterView = () => {

    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    const initialValues: UserRegistrationForm = {} as UserRegistrationForm;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, status } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
            console.log(error)
        },
        onSuccess: (data) => {
            toast.success(data);
            reset()
            navigate('/auth/validation#content');
        }
    });

    const password = watch('password')

    const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

    return (
        <>

            <form onSubmit={handleSubmit(handleRegister)} noValidate className="pb-3">

                <div className="pr-3 max-h-96 overflow-y-scroll relative">

                    <div className="mb-5 flex flex-col gap-3 mt-3">
                        <label htmlFor="email" className="text-sm">Name</label>
                        <input
                            id="name"
                            className="w-full p-2 rounded-lg border border-(--border) outline-none"
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

                    <div className="mb-5 flex flex-col gap-3">
                        <label htmlFor="email" className="text-sm">Last name</label>
                        <input
                            id="lastname"
                            className="w-full p-2 rounded-lg border border-(--border) outline-none"
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

                    <div className="mb-5 flex flex-col gap-3">
                        <label htmlFor="password" className="text-sm">
                            Password
                        </label>
                        <input
                            id="password"
                            className="w-full p-2 rounded-lg border border-(--border) outline-none"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 flex flex-col gap-3">
                        <label htmlFor="password_confirmation" className="text-sm">
                            Repeat password
                        </label>
                        <input
                            id="password_confirmation"
                            className="w-full p-2 rounded-lg border border-(--border) outline-none"
                            type="password"
                            placeholder="Repeat password"
                            {...register("password_confirmation", {
                                required: "Please repeat your password",
                                validate: value => value === password || 'The passwords do not match'
                            })}
                        />

                        {errors.password_confirmation && (
                            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                        )}
                    </div>

                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" checked={check} onChange={ () => setCheck(!check) } id="remember" className="accent-(--white)" />
                    <label className="" >I accept the <span onClick={ () => navigate('?privacy=true') } className="cursor-pointer underline">Privacy Policy</span> and the <span onClick={ () => navigate('?terms=true') } className="cursor-pointer underline">Terms and Conditions</span>. </label>
                </div>

                <div className="mt-5 flex items-center gap-2">
                    <Link to={'/auth/login'} className="flex items-center gap-2 justify-center w-full p-2 rounded-lg border border-(--border) cursor-pointer hover:bg-(--hover) transition-all">Back to login</Link>
                    <button type="submit" disabled={ status === "pending" || !check } className="disabled:cursor-auto disabled:bg-(--white)/40 disabled:hover:bg-(--white)/40 flex items-center gap-2 justify-center w-full p-2 rounded-lg bg-(--white) text-(--black) border border-(--border) cursor-pointer hover:bg-(--white)/80 transition-all">
                        { status === 'pending' ? <Spinner /> : 'Create account' }
                    </button>
                </div>
            </form>
        </>
    )
}
