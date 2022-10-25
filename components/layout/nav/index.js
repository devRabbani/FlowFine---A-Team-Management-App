import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  FaCaretLeft,
  FaPlus,
  FaShare,
  FaTimes,
  FaUserFriends,
} from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'
import useLogout from '../../../hooks/useLogout'
import ProfileMenu from '../../profileMenu'
import styles from './nav.module.css'
import ImageBlur from '../../imageBlur'
import { useRouter } from 'next/router'

export default function Nav({ isBack }) {
  const { user } = useAuth()
  const [isProfileMenu, setIsProfileMenu] = useState(false)
  const router = useRouter()

  const handleClick = () => setIsProfileMenu((prev) => !prev)
  console.count('Nav')
  return (
    <nav className={styles.navWrapper}>
      <div className={`${styles.nav} wrapper`}>
        {isBack ? (
          <div onClick={() => router.back()} className={styles.backBtn}>
            <FaCaretLeft />
            Back
          </div>
        ) : (
          <Link href="/">
            <a className={styles.logo}>FlowFine</a>
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
      {isProfileMenu && (
        <ProfileMenu user={user} setIsProfileMenu={setIsProfileMenu} />
      )}
    </nav>
  )
}
