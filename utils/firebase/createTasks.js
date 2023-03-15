import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../lib/firebase'

// **** CREATE TASKS

// File uploads
export const handleAttachments = async (attachments, teamcode, taskid) => {
  let promises = []
  for (const attachment of attachments) {
    const filename = Date.now() + '-' + attachment.name
    const fileRef = ref(storage, `${teamcode}/${taskid}/${filename}`)
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
  username,
  taskid
) => {
  const teamRef = doc(db, 'teams', teamCode)
  const taskRef = doc(collection(teamRef, 'tasks'))
  const taskInfoRef = doc(db, 'taskinfo', taskRef.id)
  const activityRef = doc(collection(teamRef, 'activity'))

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

  //Update Team
  batch.update(teamRef, {
    updatedAt: serverTimestamp(),
  })

  // Setting Activity
  batch.set(activityRef, {
    message: `@${username} created the task : ID-${taskid}`,
    timestamp: serverTimestamp(),
  })

  await batch.commit()
}
