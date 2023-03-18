import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { deleteObject, listAll, ref } from 'firebase/storage'

import { db, storage } from '../../lib/firebase'

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

// get query for random team lists
export const getRandomTeamQuery = (teamcodes) => {
  let q = query(collection(db, 'teams'), limit(5))
  const chunks = getChunks(teamcodes)
  for (const chunk of chunks) {
    q = query(q, where('teamcode', 'not-in', chunk))
  }
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

// Delete all docs in collection
export const deleteCollection = async (q) => {
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

// Delete All Files
export const deleteFiles = async (foldername) => {
  const folderRef = ref(storage, foldername)

  // List ALl Files and Then delete each
  const filesRefs = await listAll(folderRef)

  await Promise.all(filesRefs.items.map((item) => deleteObject(item)))
}

// Giving Request to team or user
export const giveRequest = async (teamcode, teamname, username, uid, type) => {
  const teamRef = doc(db, 'teams', teamcode)
  const userRef = doc(db, 'users', uid, 'requests', teamcode)

  const batch = writeBatch(db)
  const timestamp = Date.now()

  // Updating Team
  batch.update(teamRef, {
    invites: arrayUnion({
      type,
      username,
      uid,
      timestamp,
    }),
  })

  // Setting In User Requests
  batch.set(userRef, {
    type,
    teamname,
    timestamp,
  })

  // Commiting changes
  await batch.commit()
}

// Canceling Request
export const cancelRequest = async (teamCode, data) => {
  const teamRef = doc(db, 'teams', teamCode)
  const userRef = doc(db, 'users', data?.uid, 'requests', teamCode)

  const batch = writeBatch(db)

  // Updating Team
  batch.update(teamRef, { invites: arrayRemove(data) })

  // Deleting Request
  batch.delete(userRef)

  // Commit Changes
  await batch.commit()
}

// Accepting Request
export const acceptRequest = async (teamCode, data) => {
  const { username, uid } = data
  const teamRef = doc(db, 'teams', teamCode)
  const activityRef = doc(collection(teamRef, 'activity'))
  const userRef = doc(db, 'users', uid)
  const requestRef = doc(userRef, 'requests', teamCode)

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

  // Deleting Request
  batch.delete(requestRef)

  // Setting Activity
  batch.set(activityRef, {
    message: `Yo @${username} just joined with our team`,
    timestamp: serverTimestamp(),
  })

  // Committing Changes
  await batch.commit()
}

// Join Public Team
export const joinPublicTeam = async (teamCode, username, uid) => {
  const teamRef = doc(db, 'teams', teamCode)
  const activityRef = doc(collection(teamRef, 'activity'))
  const userRef = doc(db, 'users', uid)

  const batch = writeBatch(db)

  // Updating Team Info
  batch.update(teamRef, {
    members: arrayUnion(username),
    updatedAt: serverTimestamp(),
  })

  // Setting Up The Activity
  batch.set(activityRef, {
    message: `Yo @${username} just joined with our team`,
    timestamp: serverTimestamp(),
  })

  // Updating User Data
  batch.update(userRef, {
    teams: arrayUnion(teamCode),
  })

  // Commiting Changes
  await batch.commit()
}
