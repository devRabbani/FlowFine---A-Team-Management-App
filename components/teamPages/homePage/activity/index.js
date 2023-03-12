import moment from 'moment/moment'
import { useRef, useState } from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import ActivityLists from './activityLists'
import s from './activity.module.css'
import { clearActivity } from '../../../../utils/firebase'

export default function Activity({
  data,
  isLoading,
  hasMore,
  loadMore,
  btnLoading,
  isEditor,
  teamCode,
}) {
  const [isClearing, setIsClearing] = useState(false)

  return (
    <div className={s.activity}>
      <div className={s.activity_topbar}>
        <h3 className="header2">Activities</h3>
        <button
          disabled={isClearing || isLoading}
          onClick={() => clearActivity(teamCode, isEditor, setIsClearing)}
        >
          <RiDeleteBin5Fill /> {isClearing ? 'Clearing' : 'Clear All'}
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
