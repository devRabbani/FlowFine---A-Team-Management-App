import { useCallback, useMemo, useState } from 'react'
import { useTeam } from '../../../../context/TeamContext'
import { useUser } from '../../../../context/UserContext'
import { checkAccess } from '../../../../utils/firebase/common'
import Modal from '../../../modal'
import CreateEvent from '../createEvent'
import s from '../eventsPage.module.css'
import EventCard from './eventCard'

export default function EventsList({
  events,
  hasMore,
  loadMore,
  btnLoading,
  access = 0,
  teamcode,
  username,
  handleLoading,
  isCreateLoading,
}) {
  // Selected Event
  const [selected, setSelected] = useState(null)

  // Custom Function
  const handleCloseModal = () => setSelected(null)

  // Setting Update Event
  const handleSelect = useCallback((value) => setSelected(value), [])

  // Partioning Events
  const upcomming = useMemo(
    () => events.filter((event) => new Date(event?.time) > new Date()),
    [events]
  )
  const past = useMemo(
    () => events.filter((event) => new Date(event?.time) < new Date()),
    [events]
  )

  return (
    <>
      <div className={s.eventsList_wrapper}>
        {upcomming?.length ? (
          upcomming.map((event) => (
            <EventCard
              access={access}
              key={event?.id}
              event={event}
              handleSelect={handleSelect}
              teamcode={teamcode}
              username={username}
            />
          ))
        ) : (
          <p className="noData">
            No Upcomming Events Found, Click Add New to add event
          </p>
        )}
      </div>
      <div className="flexBetween headerDiv">
        <h3 className="header2">Past Events</h3>
      </div>
      <div className={s.eventsList_wrapper}>
        {past?.length ? (
          past.map((event, i) => (
            <EventCard
              access={access}
              key={i}
              event={event}
              handleSelect={handleSelect}
              teamcode={teamcode}
              username={username}
            />
          ))
        ) : (
          <p className="noData">No Events Data Found</p>
        )}
      </div>
      {hasMore ? (
        <button
          disabled={btnLoading}
          onClick={loadMore}
          className={s.loadMoreBtn}
        >
          {btnLoading ? 'Loading' : 'Load More'}
        </button>
      ) : null}

      {selected && access ? (
        <Modal
          title="Update Event"
          handleClose={handleCloseModal}
          isLoading={isCreateLoading}
        >
          <CreateEvent
            handleClose={handleCloseModal}
            selected={selected}
            teamcode={teamcode}
            username={username}
            handleLoading={handleLoading}
            loading={isCreateLoading}
            access={access}
          />
        </Modal>
      ) : null}
    </>
  )
}
