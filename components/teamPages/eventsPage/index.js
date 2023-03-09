import { useState } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import s from './eventsPage.module.css'
import Modal from '../../modal'
import CreateEvent from './createEvent'
import usePaginatedData from '../../../hooks/usePaginatedData'
import EventsList from './eventsList'

export default function EventsPage({ teamCode }) {
  // Local States
  const [isCreate, setIsCreate] = useState(false)
  // Getting Events
  const {
    data: events,
    isLoading,
    hasMore,
    loadMore,
    btnLoading,
  } = usePaginatedData(`teams/${teamCode}/events`, 7, 'time', 'desc')

  // Functions
  const handleCloseModal = () => {
    setIsCreate(false)
  }
  console.log('Events', events)
  return (
    <div className={s.eventsPage}>
      <div className={s.eventHeaderBar}>
        <h3 className="header2">Upcomming Events</h3>
        <button onClick={() => setIsCreate(true)}>
          <RiAddCircleFill /> Add New
        </button>
      </div>
      {isLoading ? <p>Loading...</p> : <EventsList events={events} />}
      {isCreate ? (
        <Modal title="Create Event" handleClose={handleCloseModal}>
          <CreateEvent handleClose={handleCloseModal} />
        </Modal>
      ) : null}
    </div>
  )
}
