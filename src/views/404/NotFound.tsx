import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div>
        <h1 className="text-center text-4xl text-(--white)">404</h1>
        <h2 className="text-center text-2xl text-(--white)">Page not found.</h2>
        <Link to="/" className="mt-2 flex justify-center underline">Dashboard</Link>
    </div>
  )
}
