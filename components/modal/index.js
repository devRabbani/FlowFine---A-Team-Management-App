import styles from './modal.module.css'
import { FaTimes } from 'react-icons/fa'

export default function Modal({ children, handleClose }) {
  return (
    <div className={styles.modalWrapper}>
      <FaTimes onClick={handleClose} className={styles.cross} />
      {children}
    </div>
  )
}
