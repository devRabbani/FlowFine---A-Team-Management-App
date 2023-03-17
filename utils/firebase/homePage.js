import {
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { listAll, ref } from 'firebase/storage'
import { toast } from 'react-hot-toast'
import { db, storage } from '../../lib/firebase'
import { deleteCollection, deleteFiles } from './common'

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
  access = 0,
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
  roleName,
  username,
  prevRole,
  access = 0,
  owners,
  handleLoading
) => {
  try {
    // Confirmation
    const isConfirm = confirm(
      `Are you sure you want to make @${username} to ${roleName}`
    )
    if (!isConfirm) return
    // Start Loading
    handleLoading(true)
    toast.loading(<b>Changing permission...</b>, { id: 'changepermission' })

    // Checking Permission
    if (access <= 1) throw new Error('You need to be an Owner to do this!')
    if (prevRole === 'owner' && owners?.length === 1)
      throw new Error('First assign one owner before this process')
    // Main Operation
    const teamRef = doc(db, 'teams', teamCode)

    if (roleName === 'owner') {
      await updateDoc(teamRef, {
        editors: arrayRemove(username),
        owners: arrayUnion(username),
      })
    } else if (roleName === 'editor') {
      await updateDoc(teamRef, {
        owners: arrayRemove(username),
        editors: arrayUnion(username),
      })
    } else {
      await updateDoc(teamRef, {
        owners: arrayRemove(username),
        editors: arrayRemove(username),
      })
    }

    toast.success(<b>Permission Changed</b>, { id: 'changepermission' })
  } catch (error) {
    console.log('Changing Team Name', error)
    toast.error(<b>{error.message}</b>, { id: 'changepermission' })
  } finally {
    handleLoading(false)
  }
}

// Leave Team
export const leaveTeam = async (
  teamCode,
  username,
  groups,
  access = 0,
  owners,
  handleLoading
) => {
  try {
    // Confirmation
    const confirm = prompt('Type CONFIRM if you want to leave this team!')
    if (!(confirm.toLowerCase().trim() === 'confirm')) return

    // Loading Start
    handleLoading(true)
    toast.loading(<b>Leaving Team...</b>, { id: 'leaveteam' })

    // Checking If one Owner
    if (access === 2 && owners?.length === 1)
      throw new Error('First assign one owner to do this process')

    // Main Process
    const filterGroups = groups?.map((group) => {
      if (group?.members?.includes(username)) {
        return {
          ...group,
          members: group?.members?.filter((item) => item !== username),
        }
      }
      return group
    })

    // Refs
    const teamRef = doc(db, 'teams', teamCode)
    const activityRef = doc(collection(teamRef, 'activity'))

    // Batch Init
    const batch = writeBatch(db)

    // Updating Team
    let teamUpdateInfo = {
      members: arrayRemove(username),
      groups: filterGroups,
      updatedAt: serverTimestamp(),
    }

    // If user is owner
    if (access === 2)
      teamUpdateInfo = { ...teamUpdateInfo, owners: arrayRemove(username) }

    // If user is Editor
    if (access === 1)
      teamUpdateInfo = { ...teamUpdateInfo, editors: arrayRemove(username) }

    batch.update(teamRef, teamUpdateInfo)

    // Set Activity
    batch.set(activityRef, {
      message: `Oh oo @${username} just left the team`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()

    handleLoading(false)
    toast.success(<b>Leaved successfully</b>, { id: 'leaveteam' })
  } catch (error) {
    console.log('Leaving Team Error', error)
    toast.error(<b>{error?.message}</b>, { id: 'leaveteam' })
    handleLoading(false)
  }
}

// Delete Team
export const deleteTeam = async (
  access = 0,
  teamCode,
  handleLoading,
  handleRoute,
  handleResetConfirm
) => {
  try {
    // Confirmation
    const isConfirm = confirm(
      'Are you sure you want to delete the Team completely?'
    )
    if (!isConfirm) {
      handleResetConfirm()
      return
    }

    // Loading Start
    handleLoading(true)
    toast.loading(<b>Deleting Team, Please wait...</b>, { id: 'deleteteam' })

    // Chceking Permission
    if (access <= 1)
      throw new Error('You dont have the right permission to do this!')

    // Main Process
    const teamRef = doc(db, 'teams', teamCode)
    const tasksRef = collection(teamRef, 'tasks')
    const eventsRef = collection(teamRef, 'events')
    const activityRef = collection(teamRef, 'activity')
    const taskinfoRef = query(
      collection(db, 'taskinfo'),
      where('teamcode', '==', teamCode)
    )
    const commentsRef = query(
      collectionGroup(db, 'comments'),
      where('teamcode', '==', teamCode)
    )

    // Delete Operation

    await deleteCollection(tasksRef) // Removing Tasks
    await deleteCollection(eventsRef) // Removing Events
    await deleteCollection(activityRef) // Removing Activity
    await deleteCollection(taskinfoRef) // Removing Taskinfo
    await deleteCollection(commentsRef) // Removing Comments
    await deleteDoc(teamRef) // Removing Team
    await removeMembersTeam(teamCode) // Removing Team from members list
    await deleteTeamFiles(teamCode) // Deleting Team Files

    handleLoading(false)
    toast.success(<b>Team Deleted Successfully</b>, { id: 'deleteteam' })
    handleResetConfirm()
    handleRoute()
  } catch (error) {
    console.log('Delete team', error)
    toast.error(<b>{error.message}</b>, { id: 'deleteteam' })
    handleResetConfirm()
    handleLoading(false)
  }
}

const removeMembersTeam = async (teamCode) => {
  const membersRef = query(
    collection(db, 'users'),
    where('teams', 'array-contains', teamCode)
  )
  const membersSnaps = await getDocs(membersRef)

  await Promise.all(
    membersSnaps.docs.map((member) =>
      updateDoc(member.ref, {
        teams: arrayRemove(teamCode),
      })
    )
  )
}

const deleteTeamFiles = async (teamCode) => {
  const teamFileRef = ref(storage, teamCode)
  const teamFilesList = await listAll(teamFileRef)
  await Promise.all(
    teamFilesList?.prefixes?.map((folder) => deleteFiles(folder?.fullPath))
  )
}
