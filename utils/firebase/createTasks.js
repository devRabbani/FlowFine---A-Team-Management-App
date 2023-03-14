import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { customAlphabet } from 'nanoid'
import { db, storage } from '../../lib/firebase'

// **** CREATE TASKS

// File uploads
export const handleAttachments = async (attachments, teamcode) => {
  let promises = []
  for (const attachment of attachments) {
    const filename = Date.now() + '-' + attachment.name
    const fileRef = ref(storage, `${teamcode}/${filename}`)
    const uploadTask = uploadBytes(fileRef, attachment).then(async () => {
      const url = await getDownloadURL(fileRef)
      return {
        name: attachment.name,
        filename,
        url,
      }
    })
    promises.push(uploadTask)
  }
  return await Promise.all(promises)
}

//  Create Task
export const createTask = async (
  taskData,
  taskInfoData,
  teamCode,
  username
) => {
  const taskRef = doc(collection(db, 'teams', teamCode, 'tasks'))
  const taskInfoRef = doc(db, 'taskinfo', taskRef.id)
  const activityRef = doc(collection(db, 'teams', teamCode, 'activity'))

  // Getting TASK ID 8 Digit
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nanoid = customAlphabet(alphabet, 8)
  const taskid = nanoid()
  // Creating Batch
  const batch = writeBatch(db)

  // Setting intial data
  batch.set(taskRef, {
    ...taskData,
    taskid,
    updatedAt: serverTimestamp(),
  })
  // Setting addintional data
  batch.set(taskInfoRef, taskInfoData)
  // Setting Activity
  batch.set(activityRef, {
    message: `@${username} created the task : ID-${taskid}`,
    timestamp: serverTimestamp(),
  })

  await batch.commit()
}
