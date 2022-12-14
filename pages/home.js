import { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import useUser from '../hooks/useUser'
import { fetchLatestCards } from '../firebase/client'
import Link from 'next/link'
import Create from '../components/Icons/Create'
import Head from 'next/head'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestCards().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio - Camus</title>
      </Head>
      <header className='font-bold w-full'>
        <div className='flex sticky backdrop-blur-sm top-0 justify-between items-center h-12 pl-3'>
          <h2 className='px-1'>Inicio</h2>
          <Link href='/card' className='px-4 hover:scale-110'>
            <Create />
          </Link>
        </div>
        <section className='flex-1'>
          {timeline.map(card => {
            return (
              <Cards
                avatar={card.avatar}
                createdAt={card.createdAt}
                id={card.id}
                image={card.image}
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
    </>
  )
}
