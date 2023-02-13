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
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri'

import { useAuth } from '../../../context/AuthContext'
import useLogout from '../../../hooks/useLogout'
import ProfileMenu from '../../profileMenu'
import s from './nav.module.css'
import { useRouter } from 'next/router'
import placeholder from '../../../public/placeholder.png'

export default function Nav({ isBack }) {
  const { user } = useAuth()
  const [isProfileMenu, setIsProfileMenu] = useState(false)
  const router = useRouter()

  const handleClick = () => setIsProfileMenu((prev) => !prev)
  console.count('Nav')
  return (
    <nav className={s.navWrapper}>
      <div className={`${s.nav} wrapper`}>
        {isBack ? (
          <Link href="/" className={s.backBtn}>
            <FaCaretLeft />
            Home
          </Link>
        ) : (
          <Link href="/" className={s.logo}>
            FlowFine
          </Link>
        )}
        <span onClick={handleClick}>
          {isProfileMenu ? (
            <RiCloseFill className={s.close} />
          ) : (
            <RiMenu3Fill className={s.menu} />
          )}
        </span>
      </div>
      {isProfileMenu && (
        <ProfileMenu user={user} setIsProfileMenu={setIsProfileMenu} />
      )}
    </nav>
  )
}
