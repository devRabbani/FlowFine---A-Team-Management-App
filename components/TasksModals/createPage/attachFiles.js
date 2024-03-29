import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../../button'
import s from './attachFiles.module.css'
import { RiCloseLine, RiAttachment2, RiDeleteBin5Line } from 'react-icons/ri'
import { deleteAttachment } from '../../../utils/firebase/createTasks'

export default function AttachFiles({
  isLoading,
  setAttachments,
  attachments,
  uploaded,
  taskDocId,
  teamCode,
  taskid,
  handleLoading,
  isEditLoading,
  handleUploaded,
  access,
}) {
  // Ref
  const inputRef = useRef()

  // Custom Functions
  const handleFileClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  // Handling Files
  const handleFileChange = async (e) => {
    let added = [...attachments]
    const files = e.target.files

    const maxsize = 15 * 1000 * 1000 //15MB

    // If files exist
    if (files?.length) {
      // If no of files is more than 8
      if (added?.length > 8 || files?.length > 8) {
        toast.error(<b>Max limit 8 items reach! </b>)
        return
      }
      // Traversing over files
      for (const file of files) {
        // To remove same file
        if (added.findIndex((item) => item.name === file.name) === -1) {
          // If less than Max size
          if (file.size < maxsize) {
            added.push(file) // added
            if (added.length >= 8) break // If max length
          } else {
            toast.error(<b>Max size limit per file is 15mb!</b>)
          }
        }
      }
    }
    setAttachments(added)
    e.target.value = null // To clear file selection
  }

  // Handle Delete
  const handleDelete = async (e, i) => {
    e.preventDefault()
    if (isLoading) {
      return
    }
    let added = [...attachments]
    added.splice(i, 1) // Removing with index
    setAttachments(added)
  }

  return (
    <div className={s.attachFileBody}>
      <input
        maxLength={4}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        multiple
      />

      {attachments?.length ? (
        <div className={s.attachmentsDiv}>
          {attachments.map((item, i) => (
            <div key={i} className={s.attachment}>
              <RiCloseLine onClick={(e) => handleDelete(e, i)} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      ) : null}

      <Button
        disabled={isLoading}
        onClick={handleFileClick}
        variant="primary md"
      >
        <RiAttachment2 /> Attach files
      </Button>
      {uploaded?.length ? (
        <>
          <p className={s.uploadedHeader}>Uploaded</p>
          <div className={s.uploadedDiv}>
            {uploaded?.map((item, i) => (
              <div key={i} className={s.attachment}>
                <RiDeleteBin5Line
                  onClick={(e) =>
                    deleteAttachment(
                      taskDocId,
                      taskid,
                      teamCode,
                      item,
                      handleLoading,
                      isEditLoading,
                      handleUploaded,
                      access
                    )
                  }
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
