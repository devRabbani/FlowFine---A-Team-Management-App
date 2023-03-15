import moment from 'moment/moment'
import { RiEditLine } from 'react-icons/ri'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import s from '../eventsPage.module.css'
import ReadableLinks from './readableLinks'
import { useState } from 'react'
import { memo } from 'react'
import { removeEvent } from '../../../../utils/firebase/eventsPage'

export default memo(function EventCard({
  event,
  access = 0,
  handleSelect,
  teamcode,
  username,
}) {
  // Local STates
  const [isDeleting, setIsDeleting] = useState(false)

  const priority = ['Low', 'Normal', 'High']

  // Callback Functions
  const handleLoading = (value) => setIsDeleting(value)

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
      {access ? (
        <div className={s.btnDiv}>
          <button disabled={isDeleting} onClick={() => handleSelect(event)}>
            <RiEditLine />
            Edit
          </button>
          <button
            className={s.dltBtn}
            onClick={() =>
              removeEvent(teamcode, event?.id, username, handleLoading)
            }
          >
            <IoMdRemoveCircleOutline />
            {isDeleting ? 'Deleting' : 'Delete'}
          </button>
        </div>
      ) : null}
    </div>
  )
})
