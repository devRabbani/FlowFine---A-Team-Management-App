import {
  addDoc,
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
    owner: [uid],
    editor: [],
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
export const getSearchTeams = async (name) => {
  const q = query(
    collection(db, 'teams'),
    orderBy('name'),
    startAt(name.toLowerCase().trim()),
    endAt(name.toLowerCase().trim() + '~')
  )
  const snapshot = await getDocs(q)
  console.log(snapshot)
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
  setIsLoading
) => {
  let id
  try {
    setIsLoading(true)
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
    setIsLoading(false)
  }
}

export const leaveTask = async (
  username,
  taskDocId,
  taskid,
  teamCode,
  setIsLoading
) => {
  let id
  try {
    setIsLoading(true)
    id = toast.loading(<b>Leaving Task Please Wait..</b>)
    const docRef = doc(db, 'taskinfo', taskDocId)
    const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

    const batch = writeBatch(db)
    batch.update(docRef, {
      assignedMembers: arrayRemove(username),
    })
    batch.set(activityRef, {
      message: `@${username} leave the task : ID-${taskid}`,
      timestamp: serverTimestamp(),
    })
    await batch.commit()
    toast.success(<b>Leaved Successfully</b>, { id })
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    setIsLoading(false)
  }
}

export const markTaskStatus = async (
  username,
  status,
  teamcode,
  taskDocId,
  taskid,
  setIsLoading,
  handleModal
) => {
  let id
  try {
    setIsLoading(true)
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
      message: `@${username} just set the task ID-${taskid} status to : ${status}`,
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
    setIsLoading(false)
  }
}
