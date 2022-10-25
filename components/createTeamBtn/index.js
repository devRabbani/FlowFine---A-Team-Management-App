import styles from './createTeameBtn.module.css'
import { FaTimes } from 'react-icons/fa'

export default function CreateTeamBtn({ isCreate, setIsCreate }) {
  const handleClick = () => setIsCreate((prev) => !prev)
  return (
    <div onClick={handleClick} className={styles.btn}>
      <FaTimes className={isCreate ? styles.active : ''} />
    </div>
  )
}
