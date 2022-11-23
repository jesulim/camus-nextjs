export default function AppLayout({ children }) {
  return (
    <>
      <div className="bg-slate-200 grid place-content-center h-screen">
        <main className="rounded-xl shadow-2xl w-[350px] h-[90vh]">
          {children}
        </main>
      </div>
    </>
  )
}