
import { AuthHeader } from "@/components/auth/AuthHeader"
import { ForgotPasswordHeader } from "@/components/auth/ForgotPasswordHeader";
import { NewPasswordHeader } from "@/components/auth/NewPasswordHeader";
import { PrivacyPolicy } from "@/components/auth/PrivacyPolicy";
import { SendCodeHeader } from "@/components/auth/SendCodeHeader";
import { TermsModal } from "@/components/auth/TermsModal";
import { ValidationHeader } from "@/components/auth/ValidationHeader";
import { SparkleIcon } from "@phosphor-icons/react"
import { Outlet, useLocation } from "react-router-dom"
import { Flip, ToastContainer } from "react-toastify";

export const AuthLayout = () => {

    const location = useLocation();
    console.log(location.pathname)

    return (
        <>
            <div className="flex flex-col xl:flex-row min-h-screen bg-(--bg)">
                <div className="relative xl:w-[40%] h-screen">
                    <img src="/auth-bg2.jpg" alt="" className="p-3 overflow-hidden rounded-4xl xl:rounded-tr-none w-screen h-screen object-cover brightness-50" />
                    <div className="absolute top-0 w-full h-full">
                        <div className="flex flex-col items-center w-full h-full justify-between">

                            <img src="/Valkyrie_white2.png" alt="" className='h-30 w-30 mt-3 overflow-hidden' />

                            {location.pathname === '/auth/new-password' ?
                                <a href="#content" className="xl:hidden p-2 px-15 rounded-lg backdrop-blur-3xl text-white border border-white">Change password</a>
                                :
                                <a href="#content" className="xl:hidden p-2 px-15 rounded-lg backdrop-blur-3xl text-white border border-white">Let's start</a>}


                            <div className="w-full">

                                <h2 className="text-6xl mb-10 text-white text-center auth-title font-light">Make your way</h2>

                                <div className="flex flex-col gap-3 sm:flex-row items-center text-white/80 text-sm w-full p-8 justify-between">
                                    <p>&copy; Developed by Eric Alcoletge</p>
                                    <div className="flex items-center gap-5">
                                        <a className="hover:underline" href="https://www.linkedin.com/in/eric-alcoletge-oliv%C3%A9-7718b5283/" target="_blank">Web</a> <SparkleIcon weight="fill" />
                                        <a className="hover:underline" href="https://www.linkedin.com/in/eric-alcoletge-oliv%C3%A9-7718b5283/" target="_blank">Linkedin</a> <SparkleIcon weight="fill" />
                                        <a className="hover:underline" href="mailto:ealcoletge@outlook.es">Contact me</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div id="content" className="flex m-auto px-3 xl:w-[60%] h-screen xl:h-auto overflow-y-scroll">
                    <div className='max-w-xs xl:w-md m-auto xl:max-w-md'>
                        {location.pathname === '/auth/login' && <AuthHeader />}
                        {location.pathname === '/auth/register' && <AuthHeader />}
                        {location.pathname === '/auth/validation' && <ValidationHeader />}
                        {location.pathname === '/auth/request-code' && <SendCodeHeader />}
                        {location.pathname === '/auth/forgot-password' && <ForgotPasswordHeader />}
                        {location.pathname === '/auth/new-password' && <NewPasswordHeader />}

                        <Outlet />
                    </div>
                </div>

                <ToastContainer
                    position="top-right"
                    transition={Flip}
                />
            </div>

            <TermsModal />
            <PrivacyPolicy />
        </>
    )
}
