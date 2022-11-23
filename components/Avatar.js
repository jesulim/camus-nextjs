import Image from "next/image"

export default function Avatar({ alt, src, text }) {
  return (
    <div className="flex items-center text-black">
      <img className="rounded-full w-12 h-12 mr-2" alt={alt} src={src} />
      {text && <strong>{text}</strong>}
    </div>
  )
}