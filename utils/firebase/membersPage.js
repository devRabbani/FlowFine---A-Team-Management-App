import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'

// **** MEMBERS ****

// Giving Request to team or user
export const giveRequest = async (teamCode, username, uid, type) => {
  const teamRef = doc(db, 'teams', teamCode)
  await updateDoc(teamRef, {
    invites: arrayUnion({
      type,
      username,
      uid,
      timestamp: Date.now(),
    }),
  })
}

// Canceling Request
export const cancelRequest = async (teamCode, data) => {
  const teamRef = doc(db, 'teams', teamCode)
  await updateDoc(teamRef, {
    invites: arrayRemove(data),
  })
}

// Accepting Request
export const acceptRequest = async (teamCode, data) => {
  const { username, uid } = data
  const teamRef = doc(db, 'teams', teamCode)
  const activityRef = doc(collection(teamRef, 'activity'))
  const userRef = doc(db, 'users', uid)

  // Batch Initi
  const batch = writeBatch(db)

  // Updating Team Data
  batch.update(teamRef, {
    members: arrayUnion(username),
    invites: arrayRemove(data),
  })

  // Updating User Info
  batch.update(userRef, {
    teams: arrayUnion(teamCode),
  })

  // Setting Activity
  batch.set(activityRef, {
    message: `@${username} just joined with our team`,
    timestamp: serverTimestamp(),
  })

  // Committing Changes
  await batch.commit()
}

// Create Group
export const createGroup = async (
  teamCode,
  data,
  username,
  access = 0,
  handleLoading,
  handleClose
) => {
  let id
  try {
    // Initialization Loading
    id = toast.loading(<b>Creating Group...</b>)
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
      message: `@${username} created a new Group : ${data?.name}`,
      timestamp: serverTimestamp(),
    })

    // Committing Changes
    await batch.commit()

    toast.success(<b>Group created successfully</b>, { id })
    handleLoading(false)
    handleClose()
  } catch (error) {
    console.log('Creating Group', error)
    toast.error(<b>{error.message}</b>, { id })
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
  let id
  try {
    // Initialization Loading
    id = toast.loading(<b>Updating Group...</b>)
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
      message: `@${username} updated Group : ${oldGroupName}`,
      timestamp: serverTimestamp(),
    })

    // Committing Changes
    await batch.commit()

    toast.success(<b>Group updated successfully</b>, { id })
    handleLoading(false)
    handleClose()
  } catch (error) {
    console.log('Updating Group', error)
    toast.error(<b>{error.message}</b>, { id })
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
  let id
  try {
    // Initialization loading
    id = toast.loading(<b>Deleting Group...</b>)
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
      message: `@${username} deleted the Group : ${data?.name}`,
      timestamp: serverTimestamp(),
    })

    // Committing Changes
    await batch.commit()

    toast.success(<b>Group deleted successfully</b>, { id })
  } catch (error) {
    console.log('Deleting Group', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}
