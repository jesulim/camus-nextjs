import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import useUser from '../hooks/useUser'
import { useEffect, useState } from 'react'

import { addCard, uploadImage } from '../firebase/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function Card () {
  const user = useUser()
  const router = useRouter()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const [nombre, setNombre] = useState('')
  const [autor, setAutor] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log('onComplete')
        task.snapshot.ref.getDownloadURL().then(setImgURL).then(setImage)
      }

      task.on('stage_changed',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

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
      userName: user.username,
      image: imgURL
    }).then(() => {
      router.push('/home')
    }).then(err => {
      console.log(err)
      setStatus(COMPOSE_STATES.ERROR)
    })
  }

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !nombre.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Card - Camus</title>
        </Head>
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
                onChange={setImage}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                value={image}
                className='w-full'
                placeholder='Soltar la imagen aqui'
              />
              {imgURL &&
                <div className='relative'>
                  <button
                    className='absolute right-3 top-3 bg-slate-700 border-0 px-2 text-white rounded-full
            ' onClick={() => setImgURL(null)}
                  >X
                  </button>
                  <img className='w-full h-auto rounded-md' src={imgURL} />
                </div>}
            </label>
            {/* <div class=''>
              <label
                class='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
              >
                <span class='flex items-center space-x-2'>
                  <svg
                    class='w-6 h-6 mr-1 text-current-50' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <span class='font-medium text-gray-600'>
                    Coloque una imagen o navegue
                  </span>
                </span>
                <input
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  value={descripcion}
                  className='w-full hidden'
                  type='file'
                  name='file_upload'
                  class='hidden'
                />
              </label>
            </div> */}
            <div className='my-4 w-full flex justify-center'>
              <Button disabled={isButtonDisabled}>Crear</Button>
            </div>
          </div>
        </form>
      </AppLayout>
    </>
  )
}
