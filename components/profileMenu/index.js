import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaAt, FaSignOutAlt } from 'react-icons/fa'
import useLogout from '../../hooks/useLogout'
import ImageBlur from '../imageBlur'
import styles from './profileMenu.module.css'

export default function ProfileMenu({ user, setIsProfileMenu }) {
  const { logout } = useLogout()
  const router = useRouter()

  const handleClick = () => {
    setIsProfileMenu(false)
    router.push('/profile')
  }
  const handleLogout = () => {
    setIsProfileMenu(false)
    logout()
  }

  const handleClose = (e) => {
    if (e.target.classList.contains(styles.menuWrapper)) {
      setIsProfileMenu(false)
    }
  }

  return (
    <div onClick={handleClose} className={styles.menuWrapper}>
      <div className={styles.menu}>
        <div className={styles.imgDiv}>
          <div className={styles.img}>
            <ImageBlur src={user?.photoURL} />
          </div>

          {user?.displayName}
        </div>

        <button onClick={handleClick} className={styles.btn}>
          <FaAt /> View Profile
        </button>

        <button onClick={handleLogout} className={styles.btnLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  )
}
