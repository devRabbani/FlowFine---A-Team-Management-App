import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { customAlphabet } from 'nanoid'
import { toast } from 'react-hot-toast'
import { db, storage } from '../lib/firebase'

export const getTeam = async (teamcode) => {
  const docRef = doc(db, `teams/${teamcode}`)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      teamCode: docSnap.id,
    }
  }
}

// export const addUserToTeam = async (teamcode, uid, displayName, photoURL) => {
//   const docRef = doc(db, `teams/${teamcode}/members/${uid}`)
//   const docSnap = await getDoc(docRef)
//   if (!docSnap.exists()) {
//     await setDoc(docRef, {
//       displayName,
//       photoURL,
//     })
//     return true
//   }
//   // If Member already Exist
//   return false
// }

export const addTeamToUser = async (uid, teamcode, teamName, timestamp) => {
  const docRef = doc(db, `users/${uid}/teams/${teamcode}`)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      teamName,
      timestamp,
    })
  }
}
export const getMembers = async (teamcode) => {
  const colRef = collection(db, `teams/${teamcode}/members`)
  const colSnap = await getDocs(colRef)

  if (!colSnap.empty) {
    return colSnap.docs.map((item) => ({ ...item.data(), uid: item.id }))
  }
}

// Check Username
export const checkUsernameExist = async (value) => {
  const snapshot = await getDoc(doc(db, 'usernames', value))
  return snapshot.exists()
}

// Create user
export const createUser = async (uid, displayName, photoURL, username) => {
  const batch = writeBatch(db)

  const userRef = doc(db, `users/${uid}`)
  const usernameRef = doc(db, `usernames/${username}`)
  batch.set(userRef, {
    displayName,
    uid,
    photoURL,
    username,
    timestamp: serverTimestamp(),
  })
  batch.set(usernameRef, { uid })
  await batch.commit()
}

// Create New Team
export const createTeam = async (teamName, uid) => {
  const shortId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16)
  const teamCode = shortId()
  const docRef = doc(db, `teams/${teamCode}`)
  const userRef = doc(db, `users/${uid}`)

  const batch = writeBatch(db)
  // Creating new Team Doc
  batch.set(docRef, {
    name: teamName.toLowerCase().trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    owners: [uid],
    editors: [],
    members: [uid],
    teamcode: teamCode,
  })

  // Updating User Doc
  batch.update(userRef, {
    teams: arrayUnion(teamCode),
  })

  await batch.commit()
}

// get Chunks
export const getChunks = (lists) => {
  let chunks = []
  let i = 0
  while (i < lists.length) {
    chunks.push(lists.slice(i, i + 10))
    i += 10
  }

  return chunks
}

// get query for team lists
export const getTeamQuery = (lists) => {
  let q = query(collection(db, 'teams'))
  const chunks = getChunks(lists)
  for (const chunk of chunks) {
    q = query(q, where('teamcode', 'in', chunk))
  }
  q = query(q, orderBy('updatedAt', 'desc'))
  return q
}

// get query for profiles
export const getProfilesQuery = (usernames) => {
  let q = query(collection(db, 'users'))
  const chunks = getChunks(usernames)

  for (const chunk of chunks) {
    q = query(q, where('username', 'in', chunk))
  }

  return q
}

// Get Search Teams
export const getSearchResults = async (searchStr, searchField, colName) => {
  const q = query(
    collection(db, colName),
    orderBy(searchField),
    startAt(searchStr.toLowerCase().trim()),
    endAt(searchStr.toLowerCase().trim() + '~')
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  } else {
    return []
  }
}

// Give request to join
export const giveTeamJoinRequest = async (isRequesting, teamcode, uid) => {
  const docRef = doc(db, 'teams', teamcode)
  await updateDoc(docRef, {
    invitation: isRequesting ? arrayUnion(uid) : arrayRemove(uid),
  })
}

// Get List of groups and members
export const getUsers = async (uids) => {
  let q = query(collection(db, 'usernames'))
  const chunks = getChunks(uids)

  for (const chunk of chunks) {
    q = query(q, where('uid', 'in', chunk))
  }

  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    return snapshot.docs.map((item) => ({
      value: item.data().uid,
      label: '@' + item.id,
    }))
  }
}

// File uploads
export const handleAttachments = async (attachments, teamcode) => {
  let promises = []
  for (const attachment of attachments) {
    const filename = Date.now() + '-' + attachment.name
    const fileRef = ref(storage, `${teamcode}/${filename}`)
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
  username
) => {
  const taskRef = doc(collection(db, 'teams', teamCode, 'tasks'))
  const taskInfoRef = doc(db, 'taskinfo', taskRef.id)
  const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

  // Getting TASK ID 8 Digit
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nanoid = customAlphabet(alphabet, 8)
  const taskid = nanoid()
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
  // Setting Activity
  batch.set(activityRef, {
    message: `@${username} created the task : ID-${taskid}`,
    timestamp: serverTimestamp(),
  })

  await batch.commit()
}

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
  handleModal
) => {
  let id
  try {
    handleLoading(true)
    id = toast.loading(<b>Changing Task Status...</b>)
    const teamRef = doc(db, 'teams', teamcode)
    const taskRef = doc(teamRef, 'tasks', taskDocId)
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Changing Status
    batch.update(taskRef, {
      status,
      updatedAt: serverTimestamp(),
    })
    // Writing to Comments Info
    batch.set(activityRef, {
      message: `@${username} just set the task ID-${taskid} status to : ${status?.toUpperCase()}`,
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

// Clear All Activity
export const clearActivity = async (teamCode, isEditor, setIsLoading) => {
  setIsLoading(true)
  const id = toast.loading(<b>Clearing all activity...</b>)
  try {
    if (isEditor) {
      const isConfirm = confirm(
        'Are you sure you want to clear all activities?'
      )
      if (isConfirm) {
        const q = collection(db, 'teams', teamCode, 'activity')
        await deleteCollection(q)
        setIsLoading(false)
        toast.success(<b>All activities cleared</b>, { id })
      } else {
        throw new Error('Clearing canceled by user')
      }
    } else {
      throw new Error('You must need to be an editor for this operation.')
    }
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
    setIsLoading(false)
  }
}

// Check if user is owner or editor
export const checkAccess = (editors = [], owners = [], username) => {
  if (owners.includes(username)) {
    return 2
  } else if (editors.includes(username)) {
    return 1
  } else {
    return 0
  }
}

// Add Event
export const addEvent = async (
  teamcode,
  data,
  username,
  setIsLoading,
  handleClose,
  eventId
) => {
  setIsLoading(true)
  let id = toast.loading(<b>Creating event</b>)
  try {
    const teamRef = doc(db, 'teams', teamcode)
    const eventRef = eventId
      ? doc(teamRef, 'events', eventId)
      : doc(collection(teamRef, 'events'))
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)
    // Set Event or Update
    eventId ? batch.update(eventRef, data) : batch.set(eventRef, data)
    // Update team
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })
    // Set activity
    batch.set(activityRef, {
      message: eventId
        ? `@${username} updated the event for ${data.time}`
        : `@${username} created a new event for ${data.time}`,
      timestamp: serverTimestamp(),
    })
    // commit all changes
    await batch.commit()
    toast.success(<b>Event {eventId ? 'updated' : 'created'} successfully</b>, {
      id,
    })
    setIsLoading(false)
    handleClose()
  } catch (error) {
    console.log('Creating event error:', error)
    toast.error(<b>{error.message}</b>, { id })
    setIsLoading(false)
  }
}

// Remove Event
export const removeEvent = async (
  teamcode,
  eventId,
  username,
  setIsLoading
) => {
  const isConfirm = confirm('Are you sure to delete this event?')
  if (!isConfirm) return

  setIsLoading(true)
  const toastId = toast.loading(<b>Deleting please wait!</b>)
  try {
    // Reference
    const teamRef = doc(db, 'teams', teamcode)
    const activityRef = doc(collection(teamRef, 'activity'))
    const eventRef = doc(teamRef, 'events', eventId)

    const batch = writeBatch(db)

    // Deleting Event
    batch.delete(eventRef)

    // Updating Team
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `@${username} just deleted a event`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()
    toast.success(<b>Deleted Successfully</b>, { id: toastId })
  } catch (error) {
    console.log('Deleting Event error', error)
    toast.error(<b>{error.message}</b>, { id: toastId })
  } finally {
    setIsLoading(false)
  }
}

// Delete all docs in collection
const deleteCollection = async (q) => {
  // Getting All Docs
  const data = await getDocs(q)

  // Intialising Batch
  const batch = writeBatch(db)

  // Deleting Each Docs
  data.docs.forEach((item) => {
    batch.delete(item.ref)
  })

  // Commiting Changes
  await batch.commit()
}

export const giveRequest = async (teamCode, username, type) => {
  const teamRef = doc(db, 'teams', teamCode)
  await updateDoc(teamRef, {
    invites: arrayUnion({
      type,
      username,
      timestamp: serverTimestamp(),
    }),
  })
}
