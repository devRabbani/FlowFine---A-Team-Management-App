import { useState } from 'react'
import { RiMessage2Fill, RiMessage2Line } from 'react-icons/ri'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import { useUser } from '../../../context/UserContext'
import { addComment } from '../../../utils/firebase/tasksPage'
import Button from '../../button'
import s from '../taskDetails.module.css'
import CommentsList from './commentsList'

export default function Comments() {
  // Local States
  const [isCommenting, setIsCommenting] = useState(false)
  const [comment, setComment] = useState('')

  // Getting Username
  const { username } = useUser()
  //  Getting Task Details
  const {
    teamCode,
    shortInfo,
    comments,
    commentsLoading,
    loadMore,
    hasMore,
    btnLoading,
  } = useTaskDetails()

  //  Custom Function
  const handleLoading = (value) => {
    setIsCommenting(value)
  }

  const handleClearComment = () => {
    setComment('')
  }

  return (
    <div className={s.comments}>
      <textarea
        placeholder="Eg: I need this information for this task"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={() =>
          addComment(
            username,
            comment,
            shortInfo?.id,
            teamCode,
            handleLoading,
            handleClearComment
          )
        }
        disabled={isCommenting || comment.length < 1}
        variant="primary md g2"
      >
        {isCommenting ? (
          <>
            <RiMessage2Fill /> Adding
          </>
        ) : (
          <>
            <RiMessage2Line /> Comment
          </>
        )}
      </Button>
      <CommentsList loading={commentsLoading} comments={comments} />
      {hasMore ? (
        <button disabled={btnLoading} onClick={loadMore}>
          {btnLoading ? 'Loading' : 'Load More'}
        </button>
      ) : null}
    </div>
  )
}
