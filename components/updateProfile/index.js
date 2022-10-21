import Image from 'next/image'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import styles from './updateProfile.module.css'

export default function UpdateProfile({ setIsUpdate, displayName, photoURL }) {
  const [name, setName] = useState(displayName)
  const [photoSrc, setPhotoSrc] = useState(photoURL)
  const [file, setFile] = useState()

  const fileRef = useRef(null)

  const handleChange = (e) => {
    const selected = e.target.files[0]
    console.log(selected)
    setFile(selected)
    if (selected) {
      const url = URL.createObjectURL(selected)
      setPhotoSrc(url)
    }
  }

  const handleClick = () => {
    fileRef.current.click()
  }

  const updateProfile = () => {}

  return (
    <>
      <div className={styles.img}>
        <Image
          src={photoSrc}
          alt="User Avatar"
          layout="responsive"
          width="200px"
          height="200px"
        />
      </div>
      <input
        className={styles.inputFile}
        ref={fileRef}
        type="file"
        name="file"
        accept="image/png,image/jpeg"
        onChange={handleChange}
      />
      <button className={styles.changePic} onClick={handleClick}>
        Change Profile Pic
      </button>
      <input
        className={styles.inputName}
        type="text"
        placeholder="Your Display Name"
        value={name}
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.btnDiv}>
        <button onClick={() => setIsUpdate(false)} className={styles.btn}>
          Cancel
        </button>
        <button
          onClick={() => toast.error('Update function not supported currently')}
          className={styles.btn}
        >
          Confirm Update
        </button>
      </div>
    </>
  )
}
