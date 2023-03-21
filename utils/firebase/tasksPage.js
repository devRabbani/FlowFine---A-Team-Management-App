import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
    // Initialization Loading
    handleLoading(true)
    id = toast.loading(<b>Joining Task Please Wait..</b>)

    // Refs
    const docRef = doc(db, 'taskinfo', taskDocId)
    const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

    const batch = writeBatch(db)

    // update task info
    batch.update(docRef, {
      assignedMembers: arrayUnion(username),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `Wow @${username} joined the task : ID-${taskid}`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()
    toast.success(<b>Joined Successfully</b>, { id })
  } catch (error) {
    console.log('Joining Task Error', error)
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
    // Initialization Loading
    handleLoading(true)
    id = toast.loading(<b>Leaving Task Please Wait..</b>)

    // Refs
    const docRef = doc(db, 'taskinfo', taskDocId)
    const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

    const batch = writeBatch(db)

    // Updates Task Info
    batch.update(docRef, {
      assignedMembers: arrayRemove(username),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `Ohh ho! @${username} left the task : ID-${taskid}`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()
    toast.success(<b>Leaved Successfully</b>, { id })
  } catch (error) {
    console.log('Leaving Task Error', error)
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
  access = 0,
  taskShortData
) => {
  try {
    // Initialization Loading
    handleLoading(true)
    toast.loading(<b>Changing Task Status...</b>, { id: 'marktask' })
    const isArchive = status === 'archive'

    // If Not Joined
    if (!isJoined) throw new Error('You need to joined first!')

    // If Status Archived and User is not an editor
    if (isArchive && !access)
      throw new Error(
        'You dont have the required permission to archive this task.'
      )

    // Refs
    const teamRef = doc(db, 'teams', teamcode)
    const taskRef = doc(teamRef, 'tasks', taskDocId)
    const activityRef = doc(collection(teamRef, 'activity'))
    const archiveRef = doc(teamRef, 'archives', taskDocId)

    const batch = writeBatch(db)

    // If Status Archive
    if (isArchive) {
      // Setting ARchive
      batch.set(archiveRef, {
        ...taskShortData,
        updatedAt: serverTimestamp(),
        status: 'archived',
        archivedBy: username,
      })
      // Deleting from Tasks List
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
        : `@${username} set the task ID-${taskid} status to : ${status?.toUpperCase()}`,
      timestamp: serverTimestamp(),
    })
    // Updating Team Last Updates
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })
    // Commiting Changes
    await batch.commit()
    handleModal()
    toast.success(<b>Changed to {status} Successfully</b>, { id: 'marktask' })
  } catch (error) {
    console.log('Changing Task Status Error :', error)
    toast.error(<b>{error.message}</b>, { id: 'marktask' })
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
    // Initialization Loading
    handleLoading(true)

    // Refs
    const commentref = doc(collection(db, 'taskinfo', taskDocId, 'comments'))
    const teamRef = doc(db, 'teams', teamCode)
    const taskRef = doc(teamRef, 'tasks', taskDocId)

    const batch = writeBatch(db)

    // Adding Comment
    batch.set(commentref, {
      username,
      comment,
      timestamp: serverTimestamp(),
      teamcode: teamCode,
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

// Delete Comment
export const deleteComment = async (taskDocId, commentId, handleLoading) => {
  try {
    // Confirmation
    const isConfirm = confirm('Are you sure you want to delete this comment?')
    if (!isConfirm) return

    handleLoading(true)
    await deleteDoc(doc(db, 'taskinfo', taskDocId, 'comments', commentId))
  } catch (error) {
    console.log('Delete comment', error)
    toast.error(<b>{error.message}</b>)
  } finally {
    handleLoading(false)
  }
}

// Kanban Task Change
export const changeStatusKanban = async (
  taskDocId,
  username,
  status,
  taskid,
  teamcode
) => {
  const taskinfoRef = doc(db, 'taskinfo', taskDocId)
  const taskinfoData = await getDoc(taskinfoRef)
  const isJoined = taskinfoData.data()?.assignedMembers?.includes(username)

  if (!isJoined) {
    throw new Error('You need to join first')
  }

  // Main Process
  // Refs
  const teamRef = doc(db, 'teams', teamcode)
  const taskRef = doc(teamRef, 'tasks', taskDocId)
  const activityRef = doc(collection(teamRef, 'activity'))

  const batch = writeBatch(db)

  // Updating The Task
  batch.update(taskRef, {
    status,
    updatedAt: serverTimestamp(),
  })

  // Updating Team
  batch.update(teamRef, {
    updatedAt: serverTimestamp(),
  })

  // Setting Activity
  batch.set(activityRef, {
    message: `@${username} set the Task ID-${taskid} status to ${status?.toUpperCase()}`,
    timestamp: serverTimestamp(),
  })

  // Committing the changes
  await batch.commit()
}
