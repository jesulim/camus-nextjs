import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Google from '../components/Icons/Google'
import { useEffect } from 'react'

import { loginWithGoogle } from '../firebase/client'

import { useRouter } from 'next/router'
import useUser, { USER_STATES } from '../hooks/useUser'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGoogle().then(user => {
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <Head>
        <title>Camus</title>
        <meta name='description' content='Sistema de Catalogación de Museos' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppLayout>
        <div className='grid place-content-center justify-items-center h-full text-blue-600'>
          <h1 className='font-bold text-2xl'>Camus</h1>
          <div className='mt-4'>
            {
              user === USER_STATES.NOT_LOGGED &&
                <Button onClick={handleClick}>
                  <Google width={32} heigth={32} className='inline mr-1' />
                  Login with Google
                </Button>
            }
            {
              user === USER_STATES.NOT_KNOWN && <span>Loading...</span>
            }
          </div>
        </div>
      </AppLayout>
    </div>
  )
}
