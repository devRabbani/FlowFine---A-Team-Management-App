// **** ARCHIVE ****

import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'

// Re opening Task
export const reOpenTask = async (
  teamCode,
  taskDocId,
  data,
  access,
  username,
  handleLoading
) => {
  let id
  try {
    handleLoading(true)
    id = toast.loading(<b>Reopening task please wait!!</b>)
    if (access < 1) {
      throw new Error('You need to be an owner for this operation')
    }

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
    toast.success(<b>Task reopened successfully</b>, { id })
  } catch (error) {
    console.log('Reopening error', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}
