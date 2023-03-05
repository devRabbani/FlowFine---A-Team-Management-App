import { useState } from 'react'
import Button from '../button'
import s from './taskDetails.module.css'
import { RiMessage2Fill, RiMessage2Line } from 'react-icons/ri'
import { useUser } from '../../context/UserContext'
import { useTaskDetails } from '../../context/TaskDetailsContext'
import { addComment } from '../../utils/firebase'
import CommentsList from './commentsList'
import usePaginatedData from '../../hooks/usePaginatedData'

export default function Comments() {
  // Local States
  const [isCommenting, setIsCommenting] = useState(false)
  const [comment, setComment] = useState('')

  // Getting Username
  const { username } = useUser()
  //  Getting Task Details
  const { teamCode, shortInfo, comments, commentsLoading, loadMore } =
    useTaskDetails()
  // Getting Comments
  // const {
  //   data: comments,
  //   isLoading: commentsLoading,
  //   loadMore,
  // } = usePaginatedData(`taskinfo/${shortInfo?.id}/comments`)

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
      <button onClick={loadMore}>Load More</button>
    </div>
  )
}
