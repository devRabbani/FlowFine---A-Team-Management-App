import { collection } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'
import { deleteCollection } from './common'

// **** HOME PAGE ****

// Clear All Activity
export const clearActivity = async (teamCode, access = 0, handleLoading) => {
  let id
  try {
    id = toast.loading(<b>Clearing all activity...</b>)
    handleLoading(true)

    // If user is not owner
    if (access <= 1)
      throw new Error('You must need to be an owner for this operation.')

    //confirmation
    const isConfirm = confirm('Are you sure you want to clear all activities?')
    if (!isConfirm) throw new Error('Clearing canceled by user')

    const q = collection(db, 'teams', teamCode, 'activity')
    await deleteCollection(q)
    toast.success(<b>All activities cleared</b>, { id })
  } catch (error) {
    console.log('Clearing Activitiies error', error)
    toast.error(<b>{error.message}</b>, { id })
  } finally {
    handleLoading(false)
  }
}
