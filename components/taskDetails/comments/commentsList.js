import moment from 'moment/moment'
import { useState } from 'react'
import { RiChatDeleteLine } from 'react-icons/ri'
import { deleteComment } from '../../../utils/firebase/tasksPage'
import s from '../taskDetails.module.css'

export default function CommentsList({
  loading,
  comments,
  username,
  taskDocId,
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLoading = (value) => setIsDeleting(value)

  if (loading) {
    return <p>Loading...</p>
  }
  if (comments?.length === 0) {
    return <p className={s.noData}>No comments found Add some comments</p>
  }
  return (
    <div className={s.commentsList}>
      {comments.map((comment) => {
        const isDeletable =
          username === comment?.username &&
          moment().diff(moment.unix(comment?.timestamp?.seconds), 'minutes') <
            20

        return (
          <div className={s.commentsList_card} key={comment?.id}>
            <div className={s.commentsList_card_topBar}>
              <p>
                <span className={s.commentsList_card_username}>
                  @{comment.username}{' '}
                </span>
                <span className={s.commentsList_card_time}>
                  {' '}
                  commented {moment.unix(comment?.timestamp?.seconds).fromNow()}
                </span>
              </p>
              {isDeletable ? (
                <button
                  onClick={() =>
                    deleteComment(taskDocId, comment?.id, handleLoading)
                  }
                  disabled={isDeleting}
                >
                  <RiChatDeleteLine />
                </button>
              ) : null}
            </div>
            <p className={s.commentsList_card_comment}>{comment.comment}</p>
          </div>
        )
      })}
    </div>
  )
}
