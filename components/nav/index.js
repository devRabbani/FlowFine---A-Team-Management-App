import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import useLogout from '../../hooks/useLogout'
import ProfileMenu from '../profileMenu'
import styles from './nav.module.css'

export default function Nav() {
  const { logout } = useLogout()
  const { user } = useAuth()
  const [isProfileMenu, setIsProfileMenu] = useState(false)

  const handleClick = () => setIsProfileMenu((prev) => !prev)

  return (
    <nav className={styles.navWrapper}>
      <div className={`${styles.nav} wrapper`}>
        <Link href="/">
          <a className={styles.logo}>FlowFine</a>
        </Link>
        <div
          onClick={handleClick}
          className={`${styles.avatar} ${isProfileMenu ? 'active' : ''}`}
        >
          <Image
            src={user?.photoURL}
            alt="User Avatar"
            layout="responsive"
            width="200px"
            height="200px"
          />

          <FaTimes />
        </div>
      </div>
      {isProfileMenu && (
        <ProfileMenu user={user} setIsProfileMenu={setIsProfileMenu} />
      )}
    </nav>
  )
}
