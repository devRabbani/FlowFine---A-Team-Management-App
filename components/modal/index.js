import styles from './modal.module.css'
import { RiCloseLine } from 'react-icons/ri'
import { createPortal } from 'react-dom'

export default function Modal({ children, title, handleClose, isLoading }) {
  const handleClick = () => {
    if (isLoading) return
    handleClose()
  }
  return createPortal(
    <div className={styles.modalWrapper}>
      <div className={`${styles.modal_header} flexBetween headerDiv wrapper`}>
        <h3 className="header2">{title || ''}</h3>
        <RiCloseLine onClick={handleClick} className={styles.cross} />
      </div>

      {children}
    </div>,
    document.body
  )
}
