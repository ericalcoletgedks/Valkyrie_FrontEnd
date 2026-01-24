import { updatePasswordWithToken } from "@/api/Auth";
import type { newPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import { toast } from "react-toastify";

export const NewPasswordForm = ({ token }: { token: string }) => {

  const navigate = useNavigate();
  const initialValues: newPasswordForm = {} as newPasswordForm;
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate, status } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate('/auth/login#content');
    }
  });

  const password = watch('password')

  const handleRegister = (formData: newPasswordForm) => mutate({ formData, token });

  return (
    <form onSubmit={handleSubmit(handleRegister)} noValidate className="pb-3">

      <div className="pr-3 max-h-96 overflow-y-scroll relative">

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
              validate: value => {
                if (value !== password) return "The passwords do not match.";
                if (value.length < 8) return "Password must be at least 8 characters.";
                return true;
              }
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

      </div>

      <div className="mt-5 flex items-center gap-2">

        <button type="submit" disabled={status === 'pending'} className="disabled:cursor-auto disabled:bg-(--white)/40 disabled:hover:bg-(--white)/40 flex items-center gap-2 justify-center w-full p-2 rounded-lg bg-(--white) text-(--black) border border-(--border) cursor-pointer hover:bg-(--white)/80 transition-all">
          {status === 'pending' ? <Spinner /> : 'Change password'}
        </button>
      </div>
    </form>
  )
}