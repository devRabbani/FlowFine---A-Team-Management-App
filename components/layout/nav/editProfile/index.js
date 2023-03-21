import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  RiCloseFill,
  RiCloseLine,
  RiDeleteBin5Line,
  RiImageAddFill,
} from 'react-icons/ri'
import { MdHideImage } from 'react-icons/md'
import Button from '../../../button'
import s from './editProfile.module.css'
import { updateProfile } from '../../../../utils/firebase/user'

export default function EditProfile({
  displayName,
  uid,
  photoURL,
  loading,
  handleLoading,
}) {
  // Local States
  const [name, setName] = useState(displayName || '')
  const [img, setImg] = useState(photoURL || '')
  const [file, setFile] = useState(null)

  const isChanged =
    name?.toLowerCase().trim() !== displayName?.toLowerCase().trim()

  const isImgChanged = img !== photoURL

  const fileRef = useRef()

  // functions
  const handleClick = () => fileRef.current.click()

  const handleCancel = () => {
    setImg(photoURL)
    setName(displayName)
    setFile(null)
  }

  const handleChange = (e) => {
    const selected = e.target.files[0]
    const accepted = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

    // No file
    if (!selected) return

    // Not supported format
    if (!accepted.includes(selected?.type)) {
      toast.error(<b>File Type not supported</b>)
      return
    }

    // Set The File
    setFile(selected)

    // Generating IMG
    const img = URL.createObjectURL(selected)
    setImg(img)
    // At End Clear Input
    fileRef.current.value = ''
  }

  return (
    <div className={`${s.editProfileWrapper} wrapper`}>
      {img ? (
        <div className={s.imgDiv}>
          <div onClick={handleClick} className={s.img}>
            <Image
              src={img}
              alt={displayName || 'User'}
              width={180}
              height={180}
            />
            <div className={s.editIcon}>
              <RiImageAddFill />
            </div>
          </div>
          <input
            ref={fileRef}
            accept="image/png, image/jpg,image/jpeg, image/webp"
            type="file"
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      ) : null}

      <div className={s.changeNameDiv}>
        <div className="formDiv">
          <label htmlFor="name">Change Display Name</label>
          <input
            type="text"
            placeholder="Display Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={s.btnDiv}>
          <Button
            onClick={() =>
              updateProfile(uid, name, file, isImgChanged, handleLoading)
            }
            disabled={!(isChanged || isImgChanged) || loading}
            variant="primary"
          >
            {loading ? 'Updating' : 'Update'}
          </Button>
          <Button disabled={loading} onClick={handleCancel} variant="grey">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
