import {
  arrayUnion,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { customAlphabet } from 'nanoid'
import { db } from '../../lib/firebase'

// **** TEAMS PAGE ****

// Create New Team
export const createTeam = async (teamName, username, uid) => {
  const shortId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16)
  const teamCode = shortId()

  // Refs
  const docRef = doc(db, `teams/${teamCode}`)
  const userRef = doc(db, `users/${uid}`)

  const batch = writeBatch(db)
  // Creating new Team Doc
  batch.set(docRef, {
    name: teamName.toLowerCase().trim(),
    updatedAt: serverTimestamp(),
    owners: [username],
    editors: [],
    groups: [],
    invites: [],
    members: [username],
    teamcode: teamCode,
    privacy: 'private',
  })

  // Updating User Doc
  batch.update(userRef, {
    teams: arrayUnion(teamCode),
  })

  // Commiting Changes
  await batch.commit()
}
