import { confirmAccount } from '@/api/Auth';
import { Spinner } from '@/components/Spinner';
import type { ConfirmToken } from '@/types/index';
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ValidationView = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState<ConfirmToken['token']>('');
    const handleComplete = (token: ConfirmToken['token']) => setToken(token);

    const { mutate, status } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            navigate('/auth/login#content');
            toast.success(data);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(token);
    }

    return (
        <form onSubmit={handleSubmit}>
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

            <div className="mt-5 flex items-center gap-2">
                <button disabled={token?.length < 6 || status === 'pending'} className="disabled:cursor-auto disabled:bg-(--white)/40 disabled:hover:bg-(--white)/40 flex items-center gap-2 justify-center w-full p-2 rounded-lg bg-(--white) text-(--black) border border-(--border) cursor-pointer hover:bg-(--white)/80 transition-all">
                    { status === 'pending' ? <Spinner /> : 'Validate' }
                </button>
            </div>

            <div className='w-full mt-5 text-center'>
                <Link to='/auth/request-code' className="hover:underline cursor-pointer text-(--white)/50  text-sm">Send me a new code</Link>
            </div>
        </form>
    )
}
