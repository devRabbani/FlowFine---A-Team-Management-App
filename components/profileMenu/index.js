import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaAt, FaSignOutAlt } from 'react-icons/fa'
import { useUser } from '../../context/UserContext'
import useLogout from '../../hooks/useLogout'
import s from './profileMenu.module.css'

export default function ProfileMenu({ user, setIsProfileMenu }) {
  const { logout } = useLogout()
  const router = useRouter()
  const { username, displayName, photoURL } = useUser()

  const handleClick = () => {
    setIsProfileMenu(false)
    router.push('/profile')
  }
  const handleLogout = () => {
    setIsProfileMenu(false)
    logout()
  }

  const handleClose = (e) => {
    if (e.target.classList.contains(s.menuWrapper)) {
      setIsProfileMenu(false)
    }
  }

  return (
    <div onClick={handleClose} className={s.menuWrapper}>
      <div className={s.menu}>
        <div className={s.imgDiv}>
          <div className={s.img}>
            <Image src={photoURL} alt={displayName} fill sizes="33vw" />
          </div>
          <div className={s.nameDiv}>
            <p className={s.displayName}>{displayName || 'Display Name'}</p>
            <p className={s.userName}>@{username || 'username'}</p>
          </div>
        </div>

        <button onClick={handleClick} className={s.btn}>
          <FaAt /> View Profile
        </button>

        <button onClick={handleLogout} className={s.btnLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  )
}
