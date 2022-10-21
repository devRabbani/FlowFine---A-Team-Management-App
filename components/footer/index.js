import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      All rights are reserved by{' '}
      <a href="http://canwebe.tech" target="_blank" rel="noopener noreferrer">
        CanWeBe!
      </a>
    </footer>
  )
}
