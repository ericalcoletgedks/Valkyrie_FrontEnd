import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import { SquareSpinner } from "@/components/SquareSpinner";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth();

  if (isError) {
    return <Navigate to='/auth/login' />
  }


  if (!isLoading && data) {
    return (
      <div className="h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />

        <main className="bg-(--bg) py-10 px-5 2xl:px-60 overflow-auto transition-all duration-300 ease-in-out">
          <Outlet />
        </main>


        <footer className="bg-(--content) border-t-1 border-(--border) p-2 text-center transition-all duration-300 ease-in-out">
          <p className="text-xs text-(--white)/50">&copy; {new Date().getFullYear()} | Developed by Eric Alcoletge </p>
        </footer>

        <ToastContainer
          position="bottom-left"
          transition={Flip}
          className='last:mb-3'
        />

      </div>

    )
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-dvh">
        <SquareSpinner />
        <p className="text-(--white)/50 text-sm text-center p-4">The server is starting. This may take a few seconds if it was inactive. Thank you for your patience.</p>
      </div>
    );
  };
};