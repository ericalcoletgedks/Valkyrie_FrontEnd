import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { NewPasswordToken } from "@/components/auth/NewPasswordToken";
import type { ConfirmToken } from "@/types/index";
import { useState } from "react"

export const NewPasswordView = () => {

  const [token, setToken] = useState<ConfirmToken['token']>('');
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      { isValidToken ? <NewPasswordForm token={token} /> : <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> } 
    </>
  )
}
