import { async } from '@firebase/util'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import ShortUniqueId from 'short-unique-id'
import { db } from '../lib/firebase'

export const createTeam = async (teamName, uid) => {
  const shortId = new ShortUniqueId({ length: 10 })
  const teamCode = shortId()
  const docRef = doc(db, `teams/${teamCode}`)
  await setDoc(docRef, {
    teamName,
    creator: uid,
    timestamp: serverTimestamp(),
  })
  return teamCode
}

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
  batch.set(usernameRef, {})
  await batch.commit()
}
