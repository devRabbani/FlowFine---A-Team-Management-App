import { useState } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import s from './eventsPage.module.css'
import Modal from '../../modal'
import CreateEvent from './createEvent'

export default function EventsPage() {
  // Local States
  const [isCreate, setIsCreate] = useState(false)

  // Functions
  const handleCloseModal = () => {
    setIsCreate(false)
  }

  return (
    <div className={s.eventsPage}>
      <div className={s.eventHeaderBar}>
        <h3 className="header2">Upcomming Events</h3>
        <button onClick={() => setIsCreate(true)}>
          <RiAddCircleFill /> Add New
        </button>
      </div>
      {isCreate ? (
        <Modal handleClose={handleCloseModal}>
          <CreateEvent handleClose={handleCloseModal} />
        </Modal>
      ) : null}
    </div>
  )
}
