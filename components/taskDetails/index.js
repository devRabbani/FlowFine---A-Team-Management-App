import { useState } from 'react'
import Comments from './comments'
import Details from './details'
import s from './taskDetails.module.css'

export default function TaskDetails({ viewDetails, setViewDetails }) {
  const [isCommentMode, setIsCommentMode] = useState(false)
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
        {isCommentMode ? <Comments /> : <Details />}
      </div>
    </div>
  )
}
