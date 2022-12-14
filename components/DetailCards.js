import Avatar from './Avatar'
import useTimeAgo from '../hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function DetailCards ({ avatar, nombre, autor, descripcion, id, image, userName, createdAt, userId }) {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <Head>
        <title>Detalle Card - Camus</title>
      </Head>
      <Link href='/home' className='flex font-bold justify-between items-center h-12 pl-3'>
        <h2 className='px-1'>Inicio</h2>
      </Link>
      <article onClick={handleArticleClick} className='max-w-sm m-4 bg-gray-800 text-white rounded-lg shadow-xl' key={id}>
        {image && <img className='w-full rounded-t-lg' src={image} />}
        <div className='p-4'>
          <p className='mb-2 text-xl font-bold tracking-tight'> {nombre}</p>
          <p className='mb-3 font-normal text-gray-400'>
            <span className='text-white text-sm'>Autor:</span> {autor}
          </p>
          <p className='mb-3 font-normal text-gray-400'>
            <span className='text-white text-sm'>Descripcion:</span> {descripcion}
          </p>
          <div className='flex items-center'>
            <Avatar alt={userName} src={avatar} height={24} width={24} />
            <p className='text-xs w-80 pl-1'>{userName}</p>
            <Link href={`/status/${id}`}>
              <time className='text-xs flex justify-end hover:underline'>{timeago}</time>
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
