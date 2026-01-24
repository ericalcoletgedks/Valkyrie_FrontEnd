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
      <div className="flex items-center justify-center h-screen">

        <SquareSpinner />
      </div>
    );
  };
};