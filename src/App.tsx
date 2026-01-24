
function App() {

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      

      <main className="bg-(--bg) p-10 overflow-auto transition-all duration-300 ease-in-out">
        <div className="bg-(--content) w-xs h-sm p-5 border-1 border-(--border) rounded-md">
        </div>
      </main>

      <footer className="bg-(--content) text-(--white)/50 border-t-1 border-(--border) p-1 text-center">
        <p className="text-xs text-(--white)/50">&copy; Developed by Eric Alcoletge</p>
      </footer>
    </div>

  )
}

export default App
