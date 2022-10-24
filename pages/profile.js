import Image from 'next/image'
import { useState } from 'react'
import ImageBlur from '../components/imageBlur'
import UpdateProfile from '../components/updateProfile'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Profile.module.css'

export default function Profile() {
  const [isUpdate, setIsUpdate] = useState(false)

  const { user } = useAuth()
  const { uid, displayName, photoURL } = user
  // const { data, isLoading } = useProfile(user?.uid)
  return (
    <div className={styles.body}>
      {/* {isLoading ? (
        <p className={styles.loading}>Please wait getting profile info</p>
      ) : ( */}

      {/* )} */}
      {isUpdate ? (
        <UpdateProfile
          displayName={displayName}
          photoURL={photoURL}
          uid={uid}
          setIsUpdate={setIsUpdate}
        />
      ) : (
        <>
          <div className={styles.img}>
            <ImageBlur src={photoURL} />
          </div>
          <p className={styles.name}>Hey @{displayName}</p>
          <button onClick={() => setIsUpdate(true)} className={styles.btn}>
            Update Your Profile
          </button>
        </>
      )}
    </div>
  )
}
