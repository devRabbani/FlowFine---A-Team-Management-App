import Router, { useRouter } from 'next/router'
import '../styles/globals.css'
import '../styles/nprogress.css'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import { Finlandica } from '@next/font/google'
import PrivateRoute from '../components/privateRoute'
import AuthContextProvider from '../context/AuthContext'
import Layout from '../components/layout'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import UserContextProvider from '../context/UserContext'
import TeamDataContextProvider from '../context/TeamDataContext'

const finlandica = Finlandica({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const publicRoutes = ['/welcome']

  // Loading Animation
  nProgress.configure({ showSpinner: false })

  useEffect(() => {
    const handleStart = () => nProgress.start()
    const handleStop = () => nProgress.done()
    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [])

  return (
    <>
      <Head>
        <title>FlowFine - Perfect Ways to Manage Team</title>
      </Head>
      <main className={finlandica.className}>
        <AuthContextProvider>
          <UserContextProvider>
            {publicRoutes.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <TeamDataContextProvider>
                <PrivateRoute>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </PrivateRoute>
              </TeamDataContextProvider>
            )}
          </UserContextProvider>
        </AuthContextProvider>
        <Toaster />
      </main>
    </>
  )
}

export default MyApp
