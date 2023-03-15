import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'

// **** TASKS ****
export const joinTask = async (
  username,
  taskDocId,
  taskid,
  teamCode,
  handleLoading
) => {
  let id
  try {
    handleLoading(true)
    id = toast.loading(<b>Joining Task Please Wait..</b>)
    const docRef = doc(db, 'taskinfo', taskDocId)
    const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

    const batch = writeBatch(db)
    batch.update(docRef, {
      assignedMembers: arrayUnion(username),
    })
    batch.set(activityRef, {
      message: `Wow @${username} join the task : ID-${taskid}`,
      timestamp: serverTimestamp(),
    })
    await batch.commit()
    toast.success(<b>Joined Successfully</b>, { id })
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}

export const leaveTask = async (
  username,
  taskDocId,
  taskid,
  teamCode,
  handleLoading
) => {
  let id
  try {
    handleLoading(true)
    id = toast.loading(<b>Leaving Task Please Wait..</b>)
    const docRef = doc(db, 'taskinfo', taskDocId)
    const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

    const batch = writeBatch(db)
    batch.update(docRef, {
      assignedMembers: arrayRemove(username),
    })
    batch.set(activityRef, {
      message: `Ohh ho! @${username} leave the task : ID-${taskid}`,
      timestamp: serverTimestamp(),
    })
    await batch.commit()
    toast.success(<b>Leaved Successfully</b>, { id })
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}

export const markTaskStatus = async (
  username,
  status,
  teamcode,
  taskDocId,
  taskid,
  handleLoading,
  handleModal,
  isJoined,
  access,
  taskShortData
) => {
  let id
  try {
    handleLoading(true)
    id = toast.loading(<b>Changing Task Status...</b>)
    const isArchive = status === 'archive'

    if (!isJoined) {
      throw new Error('You need to joined first!')
    }
    if (isArchive && !(access > 0)) {
      throw new Error(
        'You dont have the required permission to archive this task.'
      )
    }

    const teamRef = doc(db, 'teams', teamcode)
    const taskRef = doc(teamRef, 'tasks', taskDocId)
    const activityRef = doc(collection(teamRef, 'activity'))
    const archiveRef = doc(teamRef, 'archives', taskDocId)

    const batch = writeBatch(db)

    if (isArchive) {
      batch.set(archiveRef, {
        ...taskShortData,
        updatedAt: serverTimestamp(),
        status: 'archived',
        archivedBy: username,
      })
      batch.delete(taskRef)
    } else {
      // Changing Status
      batch.update(taskRef, {
        status,
        updatedAt: serverTimestamp(),
      })
    }

    // Writing to Comments Info
    batch.set(activityRef, {
      message: isArchive
        ? `@${username} archived the task ID-${taskid}`
        : `@${username} just set the task ID-${taskid} status to : ${status?.toUpperCase()}`,
      timestamp: serverTimestamp(),
    })
    // Updating Team Last Updates
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })
    // Commiting Changes
    await batch.commit()
    handleModal()
    toast.success(<b>Changed to {status} Successfully</b>, { id })
  } catch (error) {
    console.log('Changing Task Status Error :', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}

// Adding Comment
export const addComment = async (
  username,
  comment,
  taskDocId,
  teamCode,
  handleLoading,
  handleClearComment
) => {
  try {
    handleLoading(true)
    const commentref = doc(collection(db, 'taskinfo', taskDocId, 'comments'))
    const teamRef = doc(db, 'teams', teamCode)
    const taskRef = doc(teamRef, 'tasks', taskDocId)

    const batch = writeBatch(db)

    // Adding Comment
    batch.set(commentref, {
      username,
      comment,
      timestamp: serverTimestamp(),
    })
    handleClearComment()
    // Updating Task time
    batch.update(taskRef, {
      updatedAt: serverTimestamp(),
    })
    // Updating Team Time
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })
    // Commiting Changes
    await batch.commit()
  } catch (error) {
    console.log('Adding Comment error :', error)
    toast.error(<b>{error.message}</b>)
  } finally {
    handleLoading(false)
  }
}
