export default function Button ({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} className='bg-black text-white rounded-full py-1 px-4 cursor-pointer disabled:opacity-25' onClick={onClick}>
        {children}
      </button>
    </>
  )
}
