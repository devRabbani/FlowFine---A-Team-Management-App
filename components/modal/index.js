import styles from './modal.module.css'
import { FaTimes } from 'react-icons/fa'

export default function Modal({ children, setIsModal }) {
  const handleClick = (e) => {
    if (e.target.classList.contains(styles.modalWrapper)) {
      setIsModal(false)
    }
  }

  return (
    <div onClick={handleClick} className={styles.modalWrapper}>
      <div className={styles.modal}>
        <FaTimes onClick={() => setIsModal(false)} className={styles.cross} />
        {children}
      </div>
    </div>
  )
}
