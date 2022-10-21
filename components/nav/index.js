import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaPlus, FaShare, FaTimes, FaUserFriends } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import useLogout from '../../hooks/useLogout'
import ProfileMenu from '../profileMenu'
import styles from './nav.module.css'
import ImageBlur from '../imageBlur'
import { useRouter } from 'next/router'

export default function Nav() {
  const { logout } = useLogout()
  const { user } = useAuth()
  const [isProfileMenu, setIsProfileMenu] = useState(false)

  const router = useRouter()

  const isTeam = router.pathname === '/team/[id]'
  console.log(router)

  const handleClick = () => setIsProfileMenu((prev) => !prev)

  return (
    <nav className={styles.navWrapper}>
      <div className={`${styles.nav} wrapper`}>
        <Link href="/">
          <a className={styles.logo}>FlowFine</a>
        </Link>

        <div className={styles.rightNav}>
          {isTeam && (
            <Link href={'/create/' + router.query.id}>
              <a>
                <FaPlus />
              </a>
            </Link>
          )}
          <div
            onClick={handleClick}
            className={`${styles.avatar} ${isProfileMenu ? 'active' : ''}`}
          >
            <ImageBlur src={user?.photoURL} priority />

            <FaTimes />
          </div>
        </div>
      </div>
      {isProfileMenu && (
        <ProfileMenu user={user} setIsProfileMenu={setIsProfileMenu} />
      )}
    </nav>
  )
}
