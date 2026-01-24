import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XIcon } from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';

export const TermsModal = () => {

    // Modal
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const show = queryParams.get('terms') ? true : false;
    const closeModal = () => navigate('/auth/register', { replace: true });

    return (
        <>
            <Dialog
                open={show}
                onClose={closeModal}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) p-4 sm:p-10 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                    <div className='flex justify-between items-center mb-3 mt-3'>
                        <DialogTitle className="font-bold text-4xl auth-title">Terms and conditions</DialogTitle>
                        <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                    </div>

                    <p className='text-sm text-(--white)/50'>Last updated: September 16, 2025</p>

                    <p className='mt-5'>Welcome to Valkyrie (hereinafter referred to as "the App"). By accessing or using this App, you agree to comply with the following Terms and Conditions. If you do not agree with any part of these terms, please do not use the App.</p>

                    <h2 className='text-2xl font-bold mt-8'>Owner Information</h2>

                    <p>
                        Owner: Eric Alcoletge Olivé <br />
                        Contact email: ericalcoletge@outlook.es
                        <p className='text-(--white)/50 mt-5'>This App was developed for demonstration and personal portfolio purposes.</p>
                    </p>




                    <h2 className='text-2xl font-bold mt-8'>Use of the App</h2>

                    <p>
                        Access to and use of Valkyrie is free of charge.<br />

                        This App is intended solely for educational, informational, or technical demonstration purposes.<br />

                        Any misuse or activity that violates local, national, or international laws is strictly prohibited.
                    </p>

                    <h2 className='text-2xl font-bold mt-8'>User Accounts</h2>

                    <p>
                        Some features of the App may require you to create an account.<br />

                        You are responsible for maintaining the confidentiality of your login credentials and for any activity conducted under your account.<br />

                        The owner reserves the right to suspend or delete accounts without prior notice in case of misuse or suspicious activity.
                    </p>

                    <h2 className='text-2xl font-bold mt-8'>Disclaimer of Liability</h2>

                    <p>
                        Valkyrie is hosted on free-tier servers chosen for their reliability and security, though some limitations may apply due to the nature of the service.<br />

                        While care has been taken to select a trustworthy hosting provider, continuous availability and permanent data integrity cannot be guaranteed.<br />

                        The owner is not liable for any data loss, service interruptions, or other issues that may occur while using the App.<br />

                        Use of Valkyrie is at your own risk.
                    </p>

                    <h2 className='text-2xl font-bold mt-8'>Intellectual Property</h2>

                    <p>
                        All code, design, and content of Valkyrie are the intellectual property of Eric Alcoletge Olivé unless otherwise stated.<br />

                        Content created or submitted by users remains their property, but by using the App, users grant permission for it to be displayed and temporarily stored as needed for the App's normal functionality.
                    </p>

                    <h2 className='text-2xl font-bold mt-8'>Changes to the Terms</h2>

                    <p>The owner reserves the right to modify these Terms and Conditions at any time. Changes will be posted on this page. Continued use of the App after such changes constitutes acceptance of the new terms.</p>

                    <h2 className='text-2xl font-bold mt-8'>Contact</h2>

                    <p>
                        For any questions regarding these Terms and Conditions, you may contact:<br />
                        ericalcoletge@outlook.es
                    </p>

                    <h2 className='text-2xl font-bold mt-8'>Acceptance of Terms</h2>

                    <p>By using Valkyrie, you fully accept these Terms and Conditions without reservation.</p>

                </DialogPanel>
            </Dialog>
        </>
    )
}
