import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-hot-toast'
import { db, storage } from '../../lib/firebase'

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

// Update Profile
export const updateProfile = async (
  uid,
  displayName,
  file,
  isImgChanged,
  handleLoading
) => {
  let id
  try {
    // Initialization Loading
    id = toast.loading(<b>Updating Profile...</b>)
    handleLoading(true)

    // Update Data
    let data = { displayName }
    // If Image is changed
    if (isImgChanged) {
      const fileRef = ref(storage, `avatars/${uid}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)

      data = { ...data, photoURL: url }
    }

    const profileDoc = doc(db, `users/${uid}`)
    await updateDoc(profileDoc, data)

    toast.success(<b>Profile updated successfully</b>, { id })
  } catch (error) {
    console.log('Changing profile', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}
