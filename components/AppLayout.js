export default function AppLayout ({ children }) {
  return (
    <>
      <div className='bg-gray-500 grid place-content-center h-screen'>
        <main className='bg-gray-300 rounded-xl shadow-2xl w-[370px] h-[85vh] overflow-y-auto'>
          {children}
        </main>
      </div>
    </>
  )
}
