import { NavLink } from 'react-router-dom'

export const NewPasswordHeader = () => {
    return (
        <>
            <div className="mb-10">
                <h1 className="mb-5 text-4xl auth-title font-bold">Set a New Password</h1>
                <p className="text-(--white)/50 text-wrap">
                    Please enter the token and then your new password below to complete the reset process.
                </p>
            </div>

            <div className="w-full flex gap-24 items-center justify-center mb-8 border-b border-(--border)">
                <NavLink to='/auth/login#content' className={({ isActive }) => isActive ? `font-bold border-b border-(--white) pb-2 transition-all` : `hover:border-b border-(--border) pb-2 transition-all`}>Go back</NavLink>
            </div>
        </>
    )
}