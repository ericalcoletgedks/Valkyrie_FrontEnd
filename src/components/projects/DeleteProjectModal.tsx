import { deletePoject } from '@/api/ProjectApi';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function DeleteProjectModal() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.idToDelete!;
  const closeModal = () => navigate(-1);

  const { mutate, status } = useMutation({
    mutationFn: deletePoject,
    onError: (error) => {
      toast.error(error.message);
      closeModal();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success(data);
      closeModal();
    }
  });

  return (
    <>
      <>
        <Dialog
          open={true}
          onClose={closeModal}
          transition
          className="fixed inset-0 flex w-screen items-center justify-center bg-(--content) sm:bg-black/30 backdrop-blur-xs p-4 transition duration-300 ease-out data-closed:opacity-0"
        >
          <DialogPanel className="rounded-3xl w-full sm:w-xl max-w-4xl space-y-4 bg-(--content) p-5 sm:p-8 sm:pb-8">
            <DialogTitle className="font-bold text-2xl">Delete project</DialogTitle>
            <Description>This will permanently delete this project</Description>
            <p>Are you sure you want to delete this project? All of the tasks will be permanently removed.</p>
            <div className="flex justify-end gap-5">
              <button onClick={closeModal} className='cursor-pointer'>Cancel</button>
              <button onClick={ () => mutate(id) } disabled={ status === 'pending' } className='text-(--error) hover:underline cursor-pointer'>Delete</button>
            </div>
          </DialogPanel>
        </Dialog>
      </>
    </>
  )
}

export default DeleteProjectModal;