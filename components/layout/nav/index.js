import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { FaCaretLeft } from 'react-icons/fa'
import s from './nav.module.css'
import ProfileMenu from './profileMenu'
import { useUser } from '../../../context/UserContext'
import Modal from '../../modal'
import { RiAddLine, RiUserAddFill, RiUserAddLine } from 'react-icons/ri'
import EditProfile from './editProfile'
import CreatePage from '../../TasksModals/createPage'
import RequestMenu from './requestMenu'

export default function Nav({ isBack }) {
  const { photoURL, username, displayName, uid } = useUser()
  // Local States
  const [isProfile, setIsProfile] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)

  const avatarRef = useRef()

  // Custom Functions
  const handleProfileMenu = () => setIsProfile((prev) => !prev)
  const handleCloseProfileMenu = () => setIsProfile(false)
  const handleCloseRequestMenu = () => setIsRequest(false)
  const handleCloseEditProfile = () => setIsEditProfile(false)
  const handleEditProfile = (value) => setIsEditProfile(value)

  const handleProfileLoading = (value) => setProfileLoading(value)

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
            ) : (
              <div
                className={s.menus_menu_requests}
                onClick={() => setIsRequest((prev) => !prev)}
              >
                {isRequest ? <RiUserAddFill /> : <RiUserAddLine />}
              </div>
            )}
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
                handleEditProfile={handleEditProfile}
                handleCloseMenu={handleCloseProfileMenu}
              />
            )}
            {isRequest && (
              <RequestMenu
                uid={uid}
                username={username}
                handleCloseMenu={handleCloseRequestMenu}
              />
            )}
          </div>
        </div>
      </nav>
      {isEditProfile ? (
        <Modal
          title="Edit Profile"
          handleClose={handleCloseEditProfile}
          isLoading={profileLoading}
        >
          <EditProfile
            photoURL={photoURL}
            uid={uid}
            displayName={displayName}
            handleLoading={handleProfileLoading}
            loading={profileLoading}
          />
        </Modal>
      ) : null}
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
            username={username}
          />
        </Modal>
      ) : null}
    </>
  )
}
