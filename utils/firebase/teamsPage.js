import {
  arrayUnion,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { customAlphabet } from 'nanoid'

// **** TEAMS PAGE ****

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

// Give request to join
export const giveTeamJoinRequest = async (isRequesting, teamcode, uid) => {
  const docRef = doc(db, 'teams', teamcode)
  await updateDoc(docRef, {
    invitation: isRequesting ? arrayUnion(uid) : arrayRemove(uid),
  })
}
