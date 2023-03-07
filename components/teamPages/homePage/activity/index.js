import moment from 'moment/moment'
import { useRef } from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import ActivityLists from './activityLists'
import s from './activity.module.css'

export default function Activity({
  data,
  isLoading,
  hasMore,
  loadMore,
  btnLoading,
}) {
  return (
    <div className={s.activity}>
      <div className={s.activity_topbar}>
        <h3 className="header2">Activities</h3>
        <button>
          <RiDeleteBin5Fill /> Clear All
        </button>
      </div>
      <div className={s.activity_wrapper}>
        <ActivityLists
          data={data}
          isLoading={isLoading}
          hasMore={hasMore}
          btnLoading={btnLoading}
          loadMore={loadMore}
        />
      </div>
    </div>
  )
}
