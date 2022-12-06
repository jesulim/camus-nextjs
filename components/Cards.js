import Avatar from '../components/Avatar'
import useTimeAgo from '../hooks/useTimeAgo'

export default function Cards ({ avatar, nombre, autor, descripcion, id, image, userName, createdAt, userId }) {
  const timeago = useTimeAgo(createdAt)

  return (
    <article className='m-4 p-2 bg-slate-700 text-white border border-gray-500 rounded-md' key={id}>
      <div className='mb-2'>
        <p className='text-sm w-80'>Nombre:
          <span className='font-normal'> {nombre}</span>
        </p>
        <p className='text-sm w-80 p'>Autor:
          <span className='font-normal'> {autor}</span>
        </p>
        {image && <img className='py-1 w-full' src={image} />}
      </div>
      <div className='flex items-center'>
        <Avatar alt={userName} src={avatar} height={24} width={24} />
        <p className='text-xs w-80 pl-1'>{userName}</p>
        <date className='text-xs w-80 flex justify-end'>{timeago}</date>
      </div>
    </article>
  )
}
