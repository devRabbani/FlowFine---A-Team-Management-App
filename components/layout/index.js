import Footer from '../footer'
import Nav from '../nav'
import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Nav />
      <main className="wrapper">{children}</main>
      <Footer />
    </div>
  )
}
