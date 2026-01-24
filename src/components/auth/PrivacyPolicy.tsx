import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XIcon } from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';

export const PrivacyPolicy = () => {

    // Modal
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const show = queryParams.get('privacy') ? true : false;
    const closeModal = () => navigate('/auth/register', { replace: true });

    return (
        <>
            <Dialog
                open={show}
                onClose={closeModal}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-(--content)  p-4 sm:p-10 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-2xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-10 sm:pb-14">
                    <div className='flex justify-between items-center mb-3 mt-3'>
                        <DialogTitle className="font-bold text-4xl auth-title">Privacy Policy</DialogTitle>
                        <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                    </div>

                    <p className='text-sm text-(--white)/50'>Last updated: September 16, 2025</p>

                    <p className='mt-5'>This Privacy Policy describes how personal data is collected, used, and protected when you use the Valkyrie web application (hereinafter, "the App"). By using the App, you agree to the terms outlined in this policy.</p>

                    <h2 className='text-2xl font-bold mt-8'>Data Controller</h2>

                    <p>Name: Eric Alcoletge Olivé <br />
                        Email: ericalcoletge@outlook.es</p>

                    <h2 className='text-2xl font-bold mt-8'>What Data We Collect</h2>

                    <p>When you use Valkyrie, we may collect the following personal information:</p>

                    <p className='ml-8'>
                        <li>First name and last name</li>

                        <li>Email address</li>

                        <li>Password (encrypted)</li>
                    </p>

                    <h2 className='text-2xl font-bold mt-8'>How We Collect Your Data</h2>

                    <p>Personal data is collected through the registration form that you fill out when creating an account.</p>

                    <h2 className='text-2xl font-bold mt-8'>Purpose of Data Collection</h2>

                    <p>Your data is used solely for authentication and security purposes, to allow you to log into your account and use the App as a registered user.</p>

                    <h2 className='text-2xl font-bold mt-8'>Data Protection</h2>

                    <p>All passwords are encrypted before being stored in the database, and we follow best practices to ensure the protection of your personal information.</p>

                    <h2 className='text-2xl font-bold mt-8'>Data Sharings</h2>

                    <p>Your personal data is not shared with any third parties.</p>

                    <h2 className='text-2xl font-bold mt-8'>User Rights</h2>

                    <p>As a user, you have the right to: <br />
                    Access and use your account and its features</p>

                    <h2 className='text-2xl font-bold mt-8'>Exercising Your Rights</h2>

                    <p>If you wish to exercise your rights or have any concerns about your data, you can contact the data controller at:
                        ericalcoletge@outlook.es</p>

                    <h2 className='text-2xl font-bold mt-8'>Data Storage</h2>

                    <p>All data is stored on a secure cloud database, MongoDB Atlas. While the service is free-tier, it is a reliable and widely used provider in the industry.</p>

                    <h2 className='text-2xl font-bold mt-8'>Changes to This Policy</h2>

                    <p>This Privacy Policy may be updated from time to time. Any changes will be published on this page. Continued use of the App after such changes implies your acceptance of the revised policy.</p>

                    <h2 className='text-2xl font-bold mt-8'>Acceptance</h2>

                    <p>By registering and using Valkyrie, you consent to the collection and use of your personal data as described in this Privacy Policy.</p>

                </DialogPanel>
            </Dialog>
        </>
    )
}
