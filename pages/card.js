import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import useUser from '../hooks/useUser'
import { useState } from 'react'

import { addCard } from '../firebase/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

// const DRAG_IMAGE_STATES = {
//   ERROR: -1,
//   NONE: 0,
//   DRAG_OVER: 1,
//   UPLOADING: 2,
//   COMPLETE: 3
// }

export default function Card () {
  const user = useUser()
  const router = useRouter()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

  // const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  // const [task, setTask] = useState(null)
  // const [imgURL, setImgURL] = useState(null)

  const [nombre, setNombre] = useState('')
  const [autor, setAutor] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleChangeNombre = (evt) => {
    const { value } = evt.target
    setNombre(value)
    console.log(value)
  }

  const handleChangeAutor = (evt) => {
    const { value } = evt.target
    setAutor(value)
  }

  const handleChangeDescripcion = (evt) => {
    const { value } = evt.target
    setDescripcion(value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addCard({
      avatar: user.avatar,
      nombre,
      autor,
      descripcion,
      userId: user.uid,
      userName: user.username
    }).then(() => {
      router.push('/home')
    }).then(err => {
      console.log(err)
      setStatus(COMPOSE_STATES.ERROR)
    })
  }

  const handleDragEnter = e => {
    e.preventDefault()
    // setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    // setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = e => {
    e.preventDefault()
    console.log(e.dataTransfer.file[0])
    // setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const isButtonDisabled = !nombre.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Link href='/home' className='flex font-bold justify-between items-center h-12 pl-3'>
          <h2>Inicio</h2>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className='m-4'>
            <label className='block'>
              Nombre:
              <input onChange={handleChangeNombre} value={nombre} className='block w-full' />
            </label>
            <label className='block w-full'>
              Autor:
              <input onChange={handleChangeAutor} value={autor} className='block w-full' />
            </label>
            <label className='block'>
              Descripcion:
              <textarea onChange={handleChangeDescripcion} value={descripcion} className='block w-full' />
            </label>
            <label className='block'>
              Imagen:
              <textarea
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                value={descripcion}
                className='block w-full drop-shadow-sm'
                placeholder='Soltar la imagen aqui'
              />
            </label>
            <div className='my-4 w-full flex justify-center'>
              <Button disabled={isButtonDisabled}>Crear</Button>
            </div>
          </div>
        </form>
      </AppLayout>
    </>
  )
}
