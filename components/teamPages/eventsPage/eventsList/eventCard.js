import moment from 'moment/moment'
import Button from '../../../button'
import s from '../eventsPage.module.css'
import ReadableLinks from './readableLinks'

export default function EventCard({ event }) {
  const priority = ['Low', 'Normal', 'High']
  return (
    <div className={s.eventCard}>
      <ReadableLinks content={event?.description} />
      <div className={s.timeDiv}>
        <div className={s.eventCard_time}>
          Time :{' '}
          <span>{moment(event?.time).format('h:m A , Do MMM ddd , YY')}</span>
        </div>
        <div className={`${s.eventCard_priority} ${priority[event?.priority]}`}>
          {priority[event?.priority]}
        </div>
      </div>
    </div>
  )
}
