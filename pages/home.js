import Avatar from "../components/Avatar";
import AppLayout from "../components/AppLayout";
import { useState, useEffect } from "react";
import Cards from "../components/Cards";

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header className="font-bold w-full fixed h-12 top-0 border-b">
          <Avatar />
          <h2>Inicio</h2>
          <section className="pt-4">
            {timeline.map(card => {
              return (
                <Cards 
                  key={card.id} 
                  username={card.username}
                  avatar={card.avatar}
                  message={card.message}
                  id={card.id}
                />
              )
            })}
          </section>
        </header>
        <nav className="w-full sticky h-12 top-0 border-zinc-900 border-t">

        </nav>
      </AppLayout>
    </>
  )
}