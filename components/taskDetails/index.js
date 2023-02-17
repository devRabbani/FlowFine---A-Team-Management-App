import { useRouter } from 'next/router'
import { useState } from 'react'
import useDataDoc from '../../hooks/useDataDoc'
import Comments from './comments'
import Details from './details'
import s from './taskDetails.module.css'

export default function TaskDetails({ viewDetails, setViewDetails }) {
  const [isCommentMode, setIsCommentMode] = useState(false) //STate for subpage

  const router = useRouter()
  const { id } = router.query

  //  Getting FUll Info of Task
  const { data, loading } = useDataDoc(`taskinfo/${viewDetails.id}`)
  console.log(data, loading, id, 'task details')
  console.count('Task Details')
  return (
    <div className={s.viewDetailsBody}>
      <div className={`${s.viewDetails} wrapper`}>
        <button onClick={() => setViewDetails(null)}>Close</button>
        <div className={s.viewDetails_nav}>
          <div
            className={`${s.viewDetails_nav_menu} ${
              isCommentMode ? '' : s.active
            }`}
            onClick={() => setIsCommentMode(false)}
          >
            Details
          </div>
          <div
            className={`${s.viewDetails_nav_menu} ${
              isCommentMode ? s.active : ''
            }`}
            onClick={() => setIsCommentMode(true)}
          >
            Comments
          </div>
        </div>
        {isCommentMode ? (
          <Comments />
        ) : (
          <Details shortInfo={viewDetails} fullInfo={data} loading={loading} />
        )}
      </div>
    </div>
  )
}
