import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'
import { deleteCollection } from './common'

// **** HOME PAGE ****

// Clear All Activity
export const clearActivity = async (teamCode, access = 0, handleLoading) => {
  let id
  try {
    id = toast.loading(<b>Clearing all activity...</b>)
    handleLoading(true)

    // If user is not owner
    if (access <= 1)
      throw new Error('You must need to be an owner for this operation.')

    //confirmation
    const isConfirm = confirm('Are you sure you want to clear all activities?')
    if (!isConfirm) throw new Error('Clearing canceled by user')

    const q = collection(db, 'teams', teamCode, 'activity')
    await deleteCollection(q)
    toast.success(<b>All activities cleared</b>, { id })
  } catch (error) {
    console.log('Clearing Activitiies error', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}

// Change Team Name
export const changeTeamName = async (
  teamCode,
  name,
  access,
  username,
  handleLoading
) => {
  try {
    // Start Loading
    handleLoading(true)
    toast.loading(<b>Changing Team Name</b>, { id: 'changeteamname' })

    // Checking Permission
    if (access <= 1) throw new Error('You need to be an Owner to do this!')
    // Main Operation
    const teamRef = doc(db, 'teams', teamCode)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Changin Name
    batch.update(teamRef, {
      name,
      updatedAt: serverTimestamp(),
    })

    // Setting Activty
    batch.set(activityRef, {
      message: `Oooo ${name?.toUpperCase()} is our new team name updated by @${username}`,
      timestamp: serverTimestamp(),
    })

    // Commting Changes
    await batch.commit()

    toast.success(<b>Team Name Changed</b>, { id: 'changeteamname' })
  } catch (error) {
    console.log('Changing Team Name', error)
    toast.error(<b>{error.message}</b>, { id: 'changeteamname' })
  } finally {
    handleLoading(false)
  }
}

// Change Permission
export const changePermission = async (
  teamCode,
  name,
  access,
  username,
  handleLoading
) => {
  try {
    // Confirmation
    const isConfirm = confirm(`Are you sure you want to make @${username} to `)

    // Start Loading
    handleLoading(true)
    toast.loading(<b>Changing Team Name</b>, { id: 'changeteamname' })

    // Checking Permission
    if (access <= 1) throw new Error('You need to be an Owner to do this!')
    // Main Operation
    const teamRef = doc(db, 'teams', teamCode)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Changin Name
    batch.update(teamRef, {
      name,
      updatedAt: serverTimestamp(),
    })

    // Setting Activty
    batch.set(activityRef, {
      message: `Oooo ${name?.toUpperCase()} is our new team name updated by @${username}`,
      timestamp: serverTimestamp(),
    })

    // Commting Changes
    await batch.commit()

    toast.success(<b>Team Name Changed</b>, { id: 'changeteamname' })
  } catch (error) {
    console.log('Changing Team Name', error)
    toast.error(<b>{error.message}</b>, { id: 'changeteamname' })
  } finally {
    handleLoading(false)
  }
}
