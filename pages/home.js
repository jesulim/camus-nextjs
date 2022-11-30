import AppLayout from '../components/AppLayout'
import { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import useUser from '../hooks/useUser'
import { fetchLatestCards } from '../firebase/client'
import Button from '../components/Button'
import Link from 'next/link'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestCards().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header className='font-bold w-full'>
          <div className='flex justify-between items-center h-12 pl-3'>
            <h2>Inicio</h2>
            <Link href='/card'>
              <Button>Crear Ficha</Button>
            </Link>
          </div>
          <section>
            {timeline.map(card => {
              return (
                <Cards
                  avatar={card.avatar}
                  createdAt={card.createdAt}
                  id={card.id}
                  key={card.id}
                  userName={card.userName}
                  userId={card.userId}
                  nombre={card.nombre}
                  autor={card.autor}
                  descripcion={card.descripcion}
                />
              )
            })}
          </section>
        </header>
        <nav className='w-full sticky h-12 top-0' />
      </AppLayout>
    </>
  )
}
