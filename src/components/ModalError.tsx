import { Dialog, DialogPanel } from "@headlessui/react"
import { WarningCircleIcon, XIcon } from "@phosphor-icons/react";

type ModalErrorProps = {
    show: boolean,
    closeModal: () => void | Promise<void>
};

export const ModalError = ({ show, closeModal }: ModalErrorProps) => {
    return (<>

        <Dialog
            open={show}
            onClose={closeModal}
            transition
            className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                <div className='flex justify-end items-center mb-3 mt-3'>
                    <XIcon onClick={closeModal} size={23} className='cursor-pointer' />
                </div>

                <div className='flex flex-col mb-10 gap-5 justify-center items-center'>
                    <WarningCircleIcon className='animate-bounce' size={82} />
                    <h1 className='text-3xl'>Something went wrong.</h1>
                </div>
            </DialogPanel>
        </Dialog>
    </>)
}
