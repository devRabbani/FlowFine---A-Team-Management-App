import { async } from '@firebase/util'
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
import ShortUniqueId from 'short-unique-id'
import { db } from '../lib/firebase'

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

export const addUserToTeam = async (teamcode, uid, displayName, photoURL) => {
  const docRef = doc(db, `teams/${teamcode}/members/${uid}`)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      displayName,
      photoURL,
    })
    return true
  }
  // If Member already Exist
  return false
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
  const shortId = new ShortUniqueId({ length: 16 })
  const teamCode = shortId()
  const docRef = doc(db, `teams/${teamCode}`)
  const userRef = doc(db, `users/${uid}`)

  const batch = writeBatch(db)
  // Creating new Team Doc
  batch.set(docRef, {
    name: teamName.toLowerCase().trim(),
    created: serverTimestamp(),
    updated: serverTimestamp(),
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
  q = query(q, orderBy('updated', 'desc'))
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
