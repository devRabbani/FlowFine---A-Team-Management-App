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

// Create Group
export const createGroup = async (
  teamCode,
  data,
  username,
  access = 0,
  handleLoading,
  handleClose
) => {
  try {
    // Initialization Loading
    toast.loading(<b>Creating Group...</b>, { id: 'creategroup' })
    handleLoading(true)

    // Checking Permission if not an editor
    if (!access)
      throw new Error('You dont have the required permission to do this!!')

    // Refs
    const teamRef = doc(db, 'teams', teamCode)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Updating Team
    batch.update(teamRef, {
      groups: arrayUnion(data),
      updatedAt: serverTimestamp(),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `Great!! @${username} created a new group : ${data?.name}`,
      timestamp: serverTimestamp(),
    })

    // Committing Changes
    await batch.commit()

    toast.success(<b>Group created successfully</b>, { id: 'creategroup' })
    handleLoading(false)
    handleClose()
  } catch (error) {
    console.log('Creating Group', error)
    toast.error(<b>{error.message}</b>, { id: 'creategroup' })
    handleLoading(false)
  }
}

// Update Group
export const updateGroup = async (
  teamCode,
  data,
  oldGroupName,
  prevGroups,
  username,
  access = 0,
  handleLoading,
  handleClose
) => {
  try {
    // Initialization Loading
    toast.loading(<b>Updating Group...</b>, { id: 'updategroup' })
    handleLoading(true)

    // Checking Permission if not an editor
    if (!access)
      throw new Error('You dont have the required permission to do this!!')

    // Refs
    const teamRef = doc(db, 'teams', teamCode)
    const activityRef = doc(collection(teamRef, 'activity'))

    // Group Maninmuplation
    const groups = [
      data,
      ...prevGroups?.filter((group) => group.name !== oldGroupName),
    ]

    const batch = writeBatch(db)

    // Updating Team
    batch.update(teamRef, {
      groups,
      updatedAt: serverTimestamp(),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `@${username} updated the group : ${oldGroupName}`,
      timestamp: serverTimestamp(),
    })

    // Committing Changes
    await batch.commit()

    toast.success(<b>Group updated successfully</b>, { id: 'updategroup' })
    handleLoading(false)
    handleClose()
  } catch (error) {
    console.log('Updating Group', error)
    toast.error(<b>{error.message}</b>, { id: 'updategroup' })
    handleLoading(false)
  }
}

// Delete Group
export const deleteGroup = async (
  teamCode,
  data,
  username,
  access = 0,
  handleLoading
) => {
  try {
    // Initialization loading
    toast.loading(<b>Deleting Group...</b>, { id: 'deletegroup' })
    handleLoading(true)

    // Checking permission if not owner
    if (access <= 1) throw new Error('You need to be an owner to do this!!')

    // Confirmation
    const isConfirm = confirm('Are you sure you want to delete this group??')

    if (!isConfirm) throw new Error('User canceled')

    // Refs
    const teamRef = doc(db, 'teams', teamCode)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Updating Team
    batch.update(teamRef, {
      groups: arrayRemove(data),
      updatedAt: serverTimestamp(),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `@${username} deleted the group : ${data?.name}`,
      timestamp: serverTimestamp(),
    })

    // Committing Changes
    await batch.commit()

    toast.success(<b>Group deleted successfully</b>, { id: 'deletegroup' })
  } catch (error) {
    console.log('Deleting Group', error)
    toast.error(<b>{error.message}</b>, { id: 'deletegroup' })
  } finally {
    handleLoading(false)
  }
}
