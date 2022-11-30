import Image from 'next/image'

export default function Avatar ({ alt, src, text, width, height }) {
  return (
    <div className='flex items-center text-black'>
      <Image className='rounded-full mr-2' width={width} height={height} alt={alt} src={src} />
      {text && <strong>{text}</strong>}
    </div>
  )
}
