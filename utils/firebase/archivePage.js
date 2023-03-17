import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'
import { deleteCollection, deleteFiles } from './common'

// **** ARCHIVE ****

// Re opening Task
export const reOpenTask = async (
  teamCode,
  taskDocId,
  data,
  access = 0,
  username,
  handleLoading
) => {
  let id
  try {
    // Initialization Loading
    handleLoading(true)
    id = toast.loading(<b>Reopening task please wait!!</b>)

    // Checking Permission if not an editor
    if (!access) throw new Error('You need to be an editor for this operation')

    // Confirmation
    const isConfirm = confirm('Are you sure you want to reopen it??')

    if (!isConfirm) throw new Error('User canceled')

    // Assigning Refs
    const teamRef = doc(db, 'teams', teamCode)
    const archiveRef = doc(teamRef, 'archives', taskDocId)
    const taskRef = doc(teamRef, 'tasks', taskDocId)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Setting new Task
    batch.set(taskRef, {
      ...data,
      updatedAt: serverTimestamp(),
      status: 'idle',
    })

    // Removing Archives
    batch.delete(archiveRef)

    // Updating Team
    batch.update(teamRef, { updatedAt: serverTimestamp() })

    // Setting Activity
    batch.set(activityRef, {
      message: `Task : ID-${data?.taskid} is re opened by @${username}`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()
    toast.success(<b>Task: ID-{data?.taskid} reopened successfully</b>, { id })
  } catch (error) {
    console.log('Reopening error', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}

// Delete Tasks
export const deleteTask = async (
  teamCode,
  taskid,
  taskDocId,
  access = 0,
  handleLoading
) => {
  let id
  try {
    // initialization loading
    handleLoading(true)
    id = toast.loading(<b>Hang on Deleting task...</b>)

    // Chceking permission if not an owner
    if (access <= 1)
      throw new Error('You need to be an owner for delete operation!')

    // Confirmation
    const isConfirm = confirm('Are you sure you want to delete this task??')
    if (!isConfirm) throw new Error('User canceled')

    // Files Delete
    await deleteFiles(`${teamCode}/${taskid}`)

    // DataBase
    const taskInfoRef = doc(db, 'taskinfo', taskDocId)
    const commentsRef = collection(db, 'taskinfo', taskDocId, 'comments')
    const archiveRef = doc(db, 'teams', teamCode, 'archives', taskDocId)

    const batch = writeBatch(db)

    // Delete Task Info
    batch.delete(taskInfoRef)

    // Delete Archive Task
    batch.delete(archiveRef)

    // Deleting Comments
    await deleteCollection(commentsRef)
    // Commiting changes
    await batch.commit()
    toast.success(<b>Task ID-{taskid} deleted successfully</b>, { id })
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}
