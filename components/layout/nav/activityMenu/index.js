import moment from 'moment/moment'
import { useRef } from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import useClickOutside from '../../../../hooks/useClickOutside'
import usePaginatedData from '../../../../hooks/usePaginatedData'
import ActivityLists from './activityLists'
import s from './activityMenu.module.css'

export default function ActivityMenu({ teamCode, handleCloseActivity }) {
  // Handling Click Outside Hook
  const targetRef = useRef()

  useClickOutside(targetRef, handleCloseActivity)

  return (
    <div ref={targetRef} className={s.activity}>
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
