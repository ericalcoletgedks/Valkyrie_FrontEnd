import type { updateCurrentPassword } from "@/types/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/Profile";
import { toast } from "react-toastify";

type SecurityFormProps = {
  closeModal: () => void | Promise<void>
}

export const SecurityForm = ({ closeModal }: SecurityFormProps) => {

  const initialValues: updateCurrentPassword = {} as updateCurrentPassword;

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues });
  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
    }
  });

  const handleForm = async (formData: updateCurrentPassword) => mutate(formData);

  return (
    <>
      <p className="mt-3 mb-2 font-bold">Security</p>
      <p className="text-sm text-(--white)/50">Here you can change your password in two easy steps: validation and update.</p>

      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <div className="mb-5 flex flex-col gap-3 mt-3">
          <label htmlFor="projectName" className="text-sm">Current password</label>
          <input

            id="current_password"
            className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
            type="password"
            placeholder="Enter your current password"
            {...register("current_password", {
              required: "Current password is required",
            })}
          />

          {errors.current_password && (
            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-3 mt-3">
          <label htmlFor="projectName" className="text-sm">New password</label>
          <input

            id="password"
            className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
            type="password"
            placeholder="Enter your new password"
            {...register("password", {
              required: "New password is required",
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-3 mt-3">
          <label htmlFor="projectName" className="text-sm">Repeat password</label>
          <input

            id="password_confirmation"
            className="w-full p-2 rounded-lg bg-(--border)/20 border border-(--border) outline-none"
            type="password"
            placeholder="Repeat your new password"
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

        <div className="w-full mt-8 flex justify-end gap-2">
          <input onClick={closeModal} value="Cancel" className="w-full border border-(--border) hover:bg-(--hover)/80 cursor-pointer py-2 px-5 text-center text-md text-(--white) rounded-lg" />
          <input type="submit" value="Save changes" className="w-full bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-5 text-nowrap text-md text-(--black) rounded-lg" />
        </div>
      </form>
    </>
  )
}
