import { useRouter } from 'next/router'
import Nav from './nav'
import styles from './layout.module.css'
import BottomBar from './bottomBar'

export default function Layout({ children }) {
  const router = useRouter()
  const { id: teamCode, menu } = router.query
  const pathname = router.pathname

  const isBack = pathname !== '/'

  return (
    <div className={styles.layout}>
      <Nav isBack={isBack} />
      {isBack ? (
        <div className={styles.contentDiv}>
          <BottomBar teamCode={teamCode} menu={menu} />
          <main className="wrapper">{children}</main>
        </div>
      ) : (
        <main className="wrapper">{children}</main>
      )}

      {/* {isBack ? <BottomBar teamCode={teamCode} menu={menu} /> : null} */}
    </div>
  )
}
