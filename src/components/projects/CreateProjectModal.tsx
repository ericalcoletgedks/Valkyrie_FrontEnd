import { CreateProject } from '@/views/projects/CreateProject'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XIcon } from '@phosphor-icons/react'

type CreateProjectModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateProjectModal({ isOpen, setIsOpen }: CreateProjectModalProps) {

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
            >
                <DialogPanel className="max-h-full overflow-y-scroll rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
                    <div className='flex justify-between items-center mb-2 mt-5'>
                        <DialogTitle className="flex items-center gap-2 font-bold text-xl">Create a project</DialogTitle>
                        <XIcon onClick={() => setIsOpen(false)} size={23} className='cursor-pointer' />
                    </div>

                    <p className='text-sm text-(--white)/50 mb-8'>
                        Start a new project to organize your work and tasks efficiently.
                    </p>

                    <CreateProject setIsOpen={setIsOpen} />

                </DialogPanel>
            </Dialog>
        </>
    )
}