import moment from 'moment/moment'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import s from '../taskDetails.module.css'

export default function DetailsTopInfo() {
  // Priority list because it give 0 1 & 2
  const priorityList = ['Low', 'Noraml', 'High']

  const { shortInfo } = useTaskDetails()

  return (
    <>
      <p className={s.title}>{shortInfo?.title}</p>
      <div className={s.priorityFlexDiv}>
        <p>
          Priority{' '}
          <span className={priorityList[shortInfo.priority]}>
            {priorityList[shortInfo.priority]}
          </span>
        </p>
        <p>
          Due{' '}
          <span className={s.date}>
            {moment(shortInfo.deadline).format('DD MMM YYYY')}
          </span>
        </p>
      </div>
    </>
  )
}
