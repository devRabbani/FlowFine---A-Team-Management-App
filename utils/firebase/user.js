// **** USERS ****
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
