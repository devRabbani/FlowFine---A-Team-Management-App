import { collection } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'
import { deleteCollection } from './common'

// **** HOME PAGE ****

// Clear All Activity
export const clearActivity = async (teamCode, access, setIsLoading) => {
  setIsLoading(true)
  const id = toast.loading(<b>Clearing all activity...</b>)
  try {
    if (access > 0) {
      const isConfirm = confirm(
        'Are you sure you want to clear all activities?'
      )
      if (isConfirm) {
        const q = collection(db, 'teams', teamCode, 'activity')
        await deleteCollection(q)
        setIsLoading(false)
        toast.success(<b>All activities cleared</b>, { id })
      } else {
        throw new Error('Clearing canceled by user')
      }
    } else {
      throw new Error('You must need to be an editor for this operation.')
    }
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
    setIsLoading(false)
  }
}
