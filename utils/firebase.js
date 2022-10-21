import { async } from '@firebase/util'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import ShortUniqueId from 'short-unique-id'
import { db } from '../lib/firebase'

export const createUser = async (uid, displayName, photoURL) => {
  const docRef = doc(db, `users/${uid}`)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    console.log('Createing new user')
    await setDoc(docRef, {
      displayName,
      photoURL,
      uid,
      timestamp: serverTimestamp(),
    })
  }
}

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
      teamName: docSnap.data()?.teamName,
      teamCode: docSnap.id,
      timestamp: docSnap.data().timestamp,
    }
  } else {
    return {
      teamName: null,
      teamCode: null,
      timestamp: null,
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
export const getMembers = async (uid, teamcode) => {
  const colRef = collection(db, `teams/${teamcode}/members`)
  const colSnap = await getDocs(colRef)

  if (!colSnap.empty) {
    return colSnap.docs.map((item) => ({ ...item.data(), uid: item.id }))
  }
}
