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
import TeamContextProvider from '../context/TeamContext'
import Script from 'next/script'

const finlandica = Finlandica({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const publicRoutes = ['/welcome','/sitemap.xml','/robots.txt']

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

    useEffect(() => {
      console.log(
        '%cCan%cWeBe!',
        'color: #e47e24; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;',
        'color: #fff; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
      )
      console.log(
        '%cHey explorer!, Are you lost?? Because this is not the right place for you. If you want to work with us at CanWeBe contact us now.',
        'color: #e1e1e1; font-size: 1.5em;'
      )
    }, [])


  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-X6EE2YSEHB"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X6EE2YSEHB', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>FlowFine | Home</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${finlandica.style.fontFamily};
        }
      `}</style>
      <AuthContextProvider>
        <UserContextProvider>
          {publicRoutes.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <TeamContextProvider>
              <PrivateRoute>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PrivateRoute>
            </TeamContextProvider>
          )}
        </UserContextProvider>
      </AuthContextProvider>
      <Toaster
        toastOptions={{
          style: {
            fontSize: '1.7rem',
            overflowX: 'hidden',
          },
        }}
      />
    </>
  )
}

export default MyApp
