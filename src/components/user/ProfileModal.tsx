import { Dialog, DialogPanel } from "@headlessui/react";
import { KeyIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { AccountForm } from "./AccountForm";
import { SecurityForm } from "./SecurityForm";
import { useAuth } from "@/hooks/useAuth";
import { SquareSpinner } from "../SquareSpinner";

export const ProfileModal = () => {

    const {data: user} = useAuth();
    const [account, setAccount] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const show = queryParams.get('profile') ? true : false;
    const closeModal = () => navigate('', { replace: true });

    if (!user) {
        return (<SquareSpinner />)
    }

  return (
        <Dialog
            open={show}
            onClose={closeModal}
            transition
            className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="max-h-full overflow-y-scroll flex flex-col items-center rounded-3xl w-full sm:w-md max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                
                <div className="w-fit border border-(--border) rounded-full p-8"> <UserIcon size={40} /> </div>
                <p className="m-1 text-md">{user.name} {user.lastname}</p>
                <p className="text-(--white)/50 text-sm">{user.email}</p>

                <div className="flex w-full gap-20 items-center justify-center mt-5 border-b border-(--border)">
                    <p onClick={ () => setAccount(true) } className="flex items-center gap-2 cursor-pointer hover:border-b-2 pb-3"> <UserIcon /> Account</p>
                    <p onClick={ () => setAccount(false) } className="flex items-center gap-2 cursor-pointer hover:border-b-2 pb-3"> <KeyIcon /> Security</p>
                </div>

                { account ? <AccountForm closeModal={ closeModal } /> : <SecurityForm closeModal={ closeModal } /> }

            </DialogPanel>
        </Dialog>
    )
}
