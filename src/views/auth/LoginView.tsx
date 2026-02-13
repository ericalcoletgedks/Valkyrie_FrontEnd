import { login } from "@/api/Auth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Spinner } from "@/components/Spinner";
import type { UserLoginForm } from "@/types/index"
import { SignInIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginView = () => {

    const navigate = useNavigate();
    const initialValues: UserLoginForm = {} as UserLoginForm;
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, status } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
            if (error.message === 'This account has not been confirmed yet, please check your email.') {
                navigate('/auth/validation')
            }
        },
        onSuccess: () => {
            navigate('/');
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    return (
        <>

            <form onSubmit={handleSubmit(handleLogin)} noValidate>
                <div className="mb-5 flex flex-col gap-3 mt-3">
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

                <div className="flex items-center gap-2">
                    <input id="remember" type="checkbox" className="accent-(--white)" />
                    <label htmlFor="remember">Remember me</label>
                </div>

                <div className="mt-5 flex items-center gap-2">
                    <Link to={'/auth/register'} className="flex items-center gap-2 justify-center w-full p-2 rounded-lg border border-(--border) cursor-pointer hover:bg-(--hover) transition-all">Create account</Link>
                    <button className="flex items-center gap-2 justify-center w-full p-2 rounded-lg bg-(--white) text-(--black) border border-(--border) cursor-pointer hover:bg-(--white)/80 transition-all"> 
                    { status === 'pending' ? <Spinner /> : (<> <SignInIcon /> Login</>) }
                    </button>
                </div>

                <div className='w-full mt-5 text-center'>
                    <Link to='/auth/forgot-password#content' className="hover:underline cursor-pointer text-(--white)/50  text-sm">I don't remember my password</Link>
                </div>
            </form>
        </>
    )
}
