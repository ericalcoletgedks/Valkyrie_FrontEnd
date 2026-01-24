import { NavLink } from "react-router-dom"

export const ValidationHeader = () => {
    return (
        <>
            <div className="mb-10">
                <h1 className="mb-5 text-4xl auth-title font-bold">Account validation</h1>
                <p className="text-(--white)/50 text-wrap">Please check your email, we have sent you an email with the verification code.</p>
            </div>

            <div className="w-full flex gap-24 items-center justify-center mb-8 border-b border-(--border)">
                <NavLink to='/auth/login' className={({ isActive }) => isActive ? `font-bold border-b border-(--white) pb-2 transition-all` : `hover:border-b border-(--border) pb-2 transition-all`}>Go back</NavLink>
            </div>
        </>
    )
}