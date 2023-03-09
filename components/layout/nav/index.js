import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { FaCaretLeft } from 'react-icons/fa'

import { useAuth } from '../../../context/AuthContext'
import useLogout from '../../../hooks/useLogout'
import s from './nav.module.css'
import { useRouter } from 'next/router'
import placeholder from '../../../public/placeholder.png'
import ProfileMenu from './profileMenu'
import { useUser } from '../../../context/UserContext'
import Modal from '../../modal'
import CreatePage from '../../teamPages/createPage'
import { RiAddCircleLine, RiAddLine } from 'react-icons/ri'

export default function Nav({ isBack }) {
  const { photoURL, username, displayName } = useUser()

  const [isProfile, setIsProfile] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const avatarRef = useRef()

  // Custom Functions
  const handleProfileMenu = () => setIsProfile((prev) => !prev)
  const handleCloseProfileMenu = () => setIsProfile(false)

  const handleCloseCreate = () => setIsCreate(false)

  console.count('Nav')
  return (
    <>
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
            {isBack ? (
              <div
                className={s.menus_menu_create}
                onClick={() => setIsCreate(true)}
              >
                <RiAddLine />
              </div>
            ) : null}
            <div
              ref={avatarRef}
              className={s.menus_menu_profile}
              onClick={handleProfileMenu}
            >
              {photoURL ? (
                <Image src={photoURL} alt="User Circle" fill />
              ) : null}
            </div>
            {isProfile && (
              <ProfileMenu
                username={username}
                displayName={displayName}
                avatarRef={avatarRef}
                handleCloseMenu={handleCloseProfileMenu}
              />
            )}
          </div>
        </div>
      </nav>
      {isCreate ? (
        <Modal
          title="Create Task"
          handleClose={handleCloseCreate}
          isLoading={createLoading}
        >
          <CreatePage
            handleClose={handleCloseCreate}
            createLoading={createLoading}
            setCreateLoading={setCreateLoading}
          />
        </Modal>
      ) : null}
    </>
  )
}
