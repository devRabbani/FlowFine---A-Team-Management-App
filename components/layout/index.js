import { useRouter } from 'next/router'
import Footer from './footer'
import Nav from './nav'
import styles from './layout.module.css'
import BottomBar from './bottomBar'

export default function Layout({ children }) {
  const router = useRouter()
  const { id: teamCode, menu } = router.query
  const pathname = router.pathname

  const backPath = ['/team/[id]', '/team/[id]/create']
  // const isBack = backPath.includes(router.pathname)
  const isBack = pathname !== '/'

  return (
    <div className={styles.layout}>
      <Nav isBack={isBack} />
      <main className="wrapper">{children}</main>
      {isBack ? <BottomBar teamCode={teamCode} menu={menu} /> : <Footer />}
    </div>
  )
}
