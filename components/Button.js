export default function Button({ children, onClick }) {
  return (
    <>
      <button className="bg-black text-white rounded-full py-1 px-4 cursor-pointer" onClick={onClick}>
        {children}
      </button>
    </>
  )
}