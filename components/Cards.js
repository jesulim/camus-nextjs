import Avatar from '../components/Avatar'
import useTimeAgo from '../hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Cards ({ avatar, nombre, autor, descripcion, id, image, userName, createdAt, userId }) {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <article onClick={handleArticleClick} className='max-w-sm m-4 bg-gray-800 text-white rounded-lg shadow-xl hover:opacity-90 cursor-pointer' key={id}>
      {image && <img className='w-full rounded-t-lg' src={image} />}
      <div className='p-4'>
        <p className='mb-2 text-xl font-bold tracking-tight'> {nombre}</p>
        <p className='mb-3 font-normal text-gray-400'> {autor}</p>
        <div className='flex items-center'>
          <Avatar alt={userName} src={avatar} height={24} width={24} />
          <p className='text-xs w-80 pl-1'>{userName}</p>
          <Link href={`/status/${id}`}>
            <time className='text-xs flex justify-end hover:underline'>{timeago}</time>
          </Link>
        </div>
      </div>
    </article>
  )
}
