import { NavLink } from 'react-router-dom'

export const SendCodeHeader = () => {
  return (
        <>
            <div className="mb-10">
                <h1 className="mb-5 text-4xl auth-title font-bold">Send a new code</h1>
                <p className="text-(--white)/50 text-wrap">To validate your account we will send you a code to your email.</p>
            </div>

            <div className="w-full flex gap-24 items-center justify-center mb-8 border-b border-(--border)">
                <NavLink to='/auth/login' className={({ isActive }) => isActive ? `font-bold border-b border-(--white) pb-2 transition-all` : `hover:border-b border-(--border) pb-2 transition-all`}>Go back</NavLink>
            </div>
        </>
    )
}
