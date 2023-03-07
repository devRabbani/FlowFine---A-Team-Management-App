import moment from 'moment/moment'
import { useRef } from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import ActivityLists from './activityLists'
import s from './activity.module.css'

export default function Activity({ teamCode }) {
  return (
    <div className={s.activity}>
      <div className={s.activity_topbar}>
        <button>
          <RiDeleteBin5Fill /> Clear All
        </button>
      </div>
      <div className={s.activity_wrapper}>
        <ActivityLists teamCode={teamCode} />
      </div>
    </div>
  )
}
