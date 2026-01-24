
import { validateToken } from '@/api/Auth';
import type { ConfirmToken } from '@/types/index';
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type props = {
    token: ConfirmToken['token'],
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewPasswordToken = ({token, setToken, setIsValidToken} : props) => {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            setIsValidToken(true)
        }
    })

    const handleComplete = (token: ConfirmToken['token']) => mutate({token});

    return (
        <form className='transition-all'>
            <div className="mb-5 flex flex-col gap-3 mt-3">
                <label htmlFor="email" className="text-sm">Validation code</label>
                <div className='w-full flex justify-center gap-5'>
                    <PinInput value={token} onChange={(token: ConfirmToken['token']) => setToken(token)} onComplete={handleComplete}>
                        <PinInputField className='w-full p-2 rounded-lg border border-(--border) outline-none placeholder-transparent' />
                        <PinInputField className='w-full p-2 rounded-lg border border-(--border) outline-none placeholder-transparent' />
                        <PinInputField className='w-full p-2 rounded-lg border border-(--border) outline-none placeholder-transparent' />
                        <PinInputField className='w-full p-2 rounded-lg border border-(--border) outline-none placeholder-transparent' />
                        <PinInputField className='w-full p-2 rounded-lg border border-(--border) outline-none placeholder-transparent' />
                        <PinInputField className='w-full p-2 rounded-lg border border-(--border) outline-none placeholder-transparent' />
                    </PinInput>
                </div>
            </div>

            <div className='w-full mt-5 text-center'>
                <Link to='/auth/forgot-password#content' className="hover:underline cursor-pointer text-(--white)/50  text-sm">Send me a new code</Link>
            </div>
        </form>
    )
}
