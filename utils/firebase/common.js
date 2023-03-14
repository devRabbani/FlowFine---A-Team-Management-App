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

import { customAlphabet } from 'nanoid'
import { db } from '../../lib/firebase'

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
