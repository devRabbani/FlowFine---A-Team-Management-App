import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { db } from '../../lib/firebase'

// **** EVENTS ****

// Add Event
export const addEvent = async (
  teamcode,
  data,
  username,
  access = 0,
  handleLoading,
  handleClose,
  eventId
) => {
  try {
    // Initialization Loading
    toast.loading(<b>Creating event..</b>, { id: 'createevent' })
    handleLoading(true)
    if (!access) throw new Error('You need to be an editor for creating event')

    // Refs
    const teamRef = doc(db, 'teams', teamcode)
    const eventRef = eventId
      ? doc(teamRef, 'events', eventId)
      : doc(collection(teamRef, 'events'))
    const activityRef = doc(collection(teamRef, 'activity'))

    const batch = writeBatch(db)

    // Set Event or Update
    eventId ? batch.update(eventRef, data) : batch.set(eventRef, data)

    // Update team
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })
    // Set activity
    batch.set(activityRef, {
      message: eventId
        ? `@${username} updated the event for ${data.time}`
        : `@${username} created a new event for ${data.time}`,
      timestamp: serverTimestamp(),
    })
    // commit all changes
    await batch.commit()
    toast.success(<b>Event {eventId ? 'updated' : 'created'} successfully</b>, {
      id: 'createevent',
    })
    handleLoading(false)
    handleClose()
  } catch (error) {
    console.log('Creating event error:', error)
    toast.error(<b>{error.message}</b>, { id: 'createevent' })
    handleLoading(false)
  }
}

// Remove Event
export const removeEvent = async (
  teamcode,
  eventId,
  username,
  handleLoading
) => {
  // Confirmation
  const isConfirm = confirm('Are you sure to delete this event?')
  if (!isConfirm) return

  try {
    // Initialization Loading
    toast.loading(<b>Deleting please wait!</b>, { id: 'removeevent' })
    handleLoading(true)

    // Reference
    const teamRef = doc(db, 'teams', teamcode)
    const activityRef = doc(collection(teamRef, 'activity'))
    const eventRef = doc(teamRef, 'events', eventId)

    const batch = writeBatch(db)

    // Deleting Event
    batch.delete(eventRef)

    // Updating Team
    batch.update(teamRef, {
      updatedAt: serverTimestamp(),
    })

    // Setting Activity
    batch.set(activityRef, {
      message: `@${username} just deleted a event`,
      timestamp: serverTimestamp(),
    })

    // Commiting Changes
    await batch.commit()
    toast.success(<b>Deleted Successfully</b>, { id: 'removeevent' })
  } catch (error) {
    console.log('Deleting Event error', error)
    toast.error(<b>{error.message}</b>, { id: 'removeevent' })
  } finally {
    handleLoading(false)
  }
}
