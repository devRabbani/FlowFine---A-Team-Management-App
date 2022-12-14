import { useRouter } from 'next/router'
import Footer from './footer'
import Nav from './nav'
import styles from './layout.module.css'
import BottomBar from './bottomBar'

export default function Layout({ children }) {
  const router = useRouter()
  const teamCode = router.query?.id
  const backPath = ['/team/[id]', '/team/[id]/create']
  // const isBack = backPath.includes(router.pathname)
  const isBack = router.pathname !== '/'
  const isTeam = router.pathname === '/'
  return (
    <div className={styles.layout}>
      <Nav isBack={isBack} />
      <div className="wrapper">{children}</div>
      {router.pathname !== '/' ? <BottomBar teamCode={teamCode} /> : <Footer />}
    </div>
  )
}
