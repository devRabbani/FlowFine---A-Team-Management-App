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
import {
  RiCloseFill,
  RiMenu3Fill,
  RiNotification3Fill,
  RiNotification3Line,
} from 'react-icons/ri'

import { useAuth } from '../../../context/AuthContext'
import useLogout from '../../../hooks/useLogout'
import s from './nav.module.css'
import { useRouter } from 'next/router'
import placeholder from '../../../public/placeholder.png'
import ProfileMenu from './profileMenu'
import { useUser } from '../../../context/UserContext'

export default function Nav({ isBack }) {
  const { user } = useAuth()
  const { photoURL, username, displayName } = useUser()

  const [isProfile, setIsProfile] = useState(false)

  const router = useRouter()
  const {
    query: { id: teamCode },
  } = router
  // Custom Functions
  const handleProfileMenu = () => setIsProfile((prev) => !prev)
  const handleCloseMenu = () => setIsProfile(false)

  console.count('Nav')
  return (
    <nav className={s.navWrapper}>
      <div className={`${s.nav} wrapper`}>
        {isBack ? (
          <Link href="/" className={s.backBtn}>
            <FaCaretLeft />
            All Teams
          </Link>
        ) : (
          <Link href="/" className={s.logo}>
            FlowFine
          </Link>
        )}
        <div className={s.menus}>
          <div className={s.menus_menu_profile} onClick={handleProfileMenu}>
            {photoURL ? <Image src={photoURL} alt="User Circle" fill /> : null}
          </div>
          {isProfile && (
            <ProfileMenu
              username={username}
              displayName={displayName}
              handleCloseMenu={handleCloseMenu}
            />
          )}
        </div>
      </div>
    </nav>
  )
}
