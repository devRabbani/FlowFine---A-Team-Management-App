import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { storage } from '../../../lib/firebase'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import Button from '../../button'
import s from './attachFiles.module.css'
import { RiDeleteBin5Line } from 'react-icons/ri'

export default function AttachFiles({ teamcode, setFiles, files }) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploaded, setUploaded] = useState([])

  // Ref
  const inputRef = useRef()

  // Custom Functions
  const handleFileClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  // Handling Files
  const handleFileChange = async (e) => {
    try {
      const attachments = e.target.files

      // If no of files is more than 8
      if (attachments?.length > 8) {
        toast.error(<b>Max limit 8 items reach! </b>)
        return
      }

      const maxsize = 15 * 1000 * 1000 //15MB
      // If files exist
      if (attachments?.length) {
        let promises = []
        setIsLoading(true)
        for (const attachment of attachments) {
          if (attachment.size < maxsize) {
            handleUpload(attachment, promises)
          } else {
            toast.error(<b>Max size limit per file is 20mb!</b>)
          }
        }
        await Promise.all(promises)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error.message)
      setProgress(0)
      setIsLoading(false)
    }
  }

  // Handle Upload
  const handleUpload = async (attachment, promises) => {
    const filename = Date.now() + '-' + attachment.name
    const uploadTask = uploadBytesResumable(
      ref(storage, `${teamcode}/${filename}`),
      attachment
    )
    promises.push(uploadTask)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress((prev) => ({ ...prev, [attachment.name]: p }))
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        setUploaded((prev) => [
          ...prev,
          { name: attachment.name, fileRef: uploadTask.snapshot.ref, url },
        ])
        setProgress((prev) => {
          const newProg = Object.keys(prev)
            .filter((name) => name !== attachment.name)
            .reduce((acc, name) => ({ [name]: prev[name] }), {})
          return newProg
        })
      }
    )
  }

  // Handle Delete
  const handleDelete = async (e, fileRef, i) => {
    e.preventDefault()
    try {
      await deleteObject(fileRef)
      setFiles((prev) => prev.splice(i, 1))
    } catch (error) {
      console.log(error.message)
    }
  }

  console.log(files, progress, uploaded)

  return (
    <div className={s.attachFileBody}>
      <input
        maxLength={4}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        multiple
      />
      {/* {files?.length ? (
        <div className={s.attachmentsDiv}>
          {files.map((item, i) => (
            <div key={i} onClick>
              {item.name}{' '}
              <RiDeleteBin5Line onClick={(e) => handleDelete(e, item.ref, i)} />
            </div>
          ))}
        </div>
      ) : null} */}
      {Object.keys(progress).map((filename) => (
        <>
          <p className={s.fileName}>{filename}</p>
          <div className={s.progressBar}>
            <div
              style={{ width: progress[filename] + '%' }}
              className={s.progress}
            />
          </div>
        </>
      ))}
      {/* {currentFile ? (
        <>
          <p className={s.fileName}>{currentFile}</p>
          <div className={s.progressBar}>
            <div style={{ width: progress + '%' }} className={s.progress} />
          </div>
        </>
      ) : null} */}

      <div className={s.btnDiv}>
        <Button disabled={isLoading} onClick={handleFileClick} type="primary">
          Attach file
        </Button>
      </div>
    </div>
  )
}
