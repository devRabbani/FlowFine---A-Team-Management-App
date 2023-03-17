import { useMemo, useState } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import s from './eventsPage.module.css'
import Modal from '../../modal'
import CreateEvent from './createEvent'
import usePaginatedData from '../../../hooks/usePaginatedData'
import EventsList from './eventsList'
import { useTeam } from '../../../context/TeamContext'
import { useUser } from '../../../context/UserContext'
import { checkAccess } from '../../../utils/firebase/common'

export default function EventsPage() {
  // Local States
  const [isCreate, setIsCreate] = useState(false)
  const [isCreateLoading, setIsCreateLoading] = useState(false)

  //Getting Team Data
  const { team_data } = useTeam()
  const { editors, owners, teamcode } = team_data

  // Getting Events
  const {
    data: events,
    isLoading,
    hasMore,
    loadMore,
    btnLoading,
  } = usePaginatedData(`teams/${teamcode}/events`, 7, 'time', 'desc')

  const { username } = useUser() // Getting Username

  // Getting Acces
  const access = useMemo(
    () => checkAccess(editors, owners, username),
    [editors, owners, username]
  )

  // Functions
  const handleCloseModal = () => setIsCreate(false)
  const handleLoading = (value) => setIsCreateLoading(value)

  return (
    <div className={s.eventsPage}>
      <div className="flexBetween headerDiv">
        <h3 className="header2">Upcomming Events</h3>
        <button className="headerBtn" onClick={() => setIsCreate(true)}>
          <RiAddCircleFill /> Add New
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <EventsList
          events={events}
          hasMore={hasMore}
          loadMore={loadMore}
          btnLoading={btnLoading}
          access={access}
          teamcode={teamcode}
          username={username}
          isCreateLoading={isCreateLoading}
          handleLoading={handleLoading}
        />
      )}
      {isCreate ? (
        <Modal title="Create Event" handleClose={handleCloseModal}>
          <CreateEvent
            handleClose={handleCloseModal}
            username={username}
            teamcode={teamcode}
            handleLoading={handleLoading}
            loading={isCreateLoading}
            access={access}
          />
        </Modal>
      ) : null}
    </div>
  )
}
