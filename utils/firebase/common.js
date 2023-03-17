import {
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
