import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { toast } from 'react-hot-toast'
import { db, storage } from '../../lib/firebase'

// **** CREATE TASKS

// File uploads
export const handleAttachments = async (attachments, teamcode, taskid) => {
  let promises = []
  for (const attachment of attachments) {
    const filename = Date.now() + '-' + attachment.name
    const fileRef = ref(storage, `${teamcode}/${taskid}/${filename}`)
    const uploadTask = uploadBytes(fileRef, attachment).then(async () => {
      const url = await getDownloadURL(fileRef)
      return {
        name: attachment.name,
        filename,
        url,
      }
    })
    promises.push(uploadTask)
  }
  return await Promise.all(promises)
}

//  Create Task
export const createTask = async (
  taskData,
  taskInfoData,
  teamCode,
  username,
  taskid
) => {
  const teamRef = doc(db, 'teams', teamCode)
  const taskRef = doc(collection(teamRef, 'tasks'))
  const taskInfoRef = doc(db, 'taskinfo', taskRef.id)
  const activityRef = doc(collection(teamRef, 'activity'))

  // Creating Batch
  const batch = writeBatch(db)

  // Setting intial data
  batch.set(taskRef, {
    ...taskData,
    taskid,
    updatedAt: serverTimestamp(),
  })
  // Setting addintional data
  batch.set(taskInfoRef, taskInfoData)

  //Update Team
  batch.update(teamRef, {
    updatedAt: serverTimestamp(),
  })

  // Setting Activity
  batch.set(activityRef, {
    message: `Attention members! @${username} created the task : ID-${taskid}`,
    timestamp: serverTimestamp(),
  })

  await batch.commit()
}

// Delete Attachments
export const deleteAttachment = async (
  taskDocId,
  taskid,
  teamcode,
  attachment,
  handleLoading,
  isEditLoading,
  handleUploaded,
  access
) => {
  try {
    if (isEditLoading) return
    const isConfirm = confirm(
      'Are you sure you want to download this attachment?'
    )
    if (!isConfirm) return
    // Loading STart
    handleLoading(true)
    toast.loading(<b>Deleting this attachment...</b>, {
      id: 'deleteattachment',
    })

    // Checking Acces
    if (!access) throw new Error('You need to be an editor first to do this!')

    // Refs
    const fileRef = ref(
      storage,
      `${teamcode}/${taskid}/${attachment?.filename}`
    )
    const docRef = doc(db, 'taskinfo', taskDocId)

    // Deleting File
    await deleteObject(fileRef)

    // Updating Doc
    await updateDoc(docRef, {
      attachments: arrayRemove(attachment),
    })
    handleUploaded(attachment)
    toast.success(<b>Deleted Successfully</b>, { id: 'deleteattachment' })
  } catch (error) {
    console.log('File Deleting', error)
    toast.error(<b>{error?.message}</b>, { id: 'deleteattachment' })
  } finally {
    handleLoading(false)
  }
}

// Update Task
export const updateTask = async (
  taskDocId,
  taskid,
  teamCode,
  username,
  attachments,
  uploaded,
  shortInfo,
  fullInfo,
  access = 0,
  handleLoading,
  handleClose
) => {
  try {
    // Start Loading
    handleLoading(true)
    toast.loading(<b>Updating Task Please wait!!!</b>, { id: 'updatetask' })

    // Checking If attachments exceed
    const newAttachments = [...attachments, ...uploaded]
    if (newAttachments?.length > 8)
      throw new Error('Please remove some attachments, Max limit is 8!')

    // Checking Access
    if (!access)
      throw new Error('You need to be an editor to do this operation!')

    // Checking Confirmation
    const isConfirm = confirm('Are you sure you want to update this task??')
    if (!isConfirm) throw new Error('User canceled the operation')

    // Main Operation

    let taskInfoData = fullInfo

    if (attachments?.length) {
      const attachmentsLists = await handleAttachments(
        attachments,
        teamCode,
        taskid
      )

      taskInfoData = {
        ...fullInfo,
        attachments: arrayUnion(...attachmentsLists),
      }
    }

    // Refs
    const teamRef = doc(db, 'teams', teamCode)
    const taskRef = doc(teamRef, 'tasks', taskDocId)
    const taskInfoRef = doc(db, 'taskinfo', taskDocId)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Updating Task
    batch.update(taskRef, {
      ...shortInfo,
      updatedAt: serverTimestamp(),
    })

    // Updating TaskInfo

    batch.update(taskInfoRef, taskInfoData)

    // Update Team Time
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })

    // Setting Up Activity
    batch.set(activityRef, {
      message: `@${username} updated the Task ID-${taskid}`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()

    toast.success(<b>Updated Successfully</b>, { id: 'updatetask' })
    handleLoading(false)
    handleClose()
  } catch (error) {
    console.log('Update Task Error', error)
    toast.error(<b>{error.message}</b>, { id: 'updatetask' })
    handleLoading(false)
  }
}
