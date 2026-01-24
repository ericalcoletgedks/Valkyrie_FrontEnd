
export const ErrorMessage = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="text-center text-(--white) p-2 text-sm rounded-lg bg-(--white)/20">
        { children }
    </div>
  )
}
