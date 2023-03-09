import s from '../eventsPage.module.css'
import EventCard from './eventCard'

export default function EventsList({ events }) {
  const upcomming = events.filter((event) => new Date(event?.time) > new Date())
  const past = events.filter((event) => new Date(event?.time) < new Date())

  return (
    <>
      <div className={s.eventsList_wrapper}>
        {upcomming?.length ? (
          upcomming.map((event, i) => <EventCard key={i} event={event} />)
        ) : (
          <p className={s.noData}>
            No Upcomming Events Found, Click Add New to add event
          </p>
        )}
      </div>
      <div className={s.eventHeaderBar}>
        <h3 className="header2">Past Events</h3>
      </div>
      <div className={s.eventsList_wrapper}>
        {past?.length ? (
          past.map((event, i) => <EventCard key={i} event={event} />)
        ) : (
          <p className={s.noData}>No Events Data Found</p>
        )}
      </div>
    </>
  )
}
