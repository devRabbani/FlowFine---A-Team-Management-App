import moment from 'moment/moment'
import s from '../taskDetails.module.css'

export default function CommentsList({ loading, comments }) {
  if (loading) {
    return <p>Loading...</p>
  }
  if (comments?.length === 0) {
    return <p className={s.noData}>No comments found Add some comments</p>
  }

  return (
    <div className={s.commentsList}>
      {comments.map((comment, i) => (
        <div className={s.commentsList_card} key={i}>
          <p>
            <span className={s.commentsList_card_username}>
              @{comment.username}{' '}
            </span>
            <span className={s.commentsList_card_time}>
              {' '}
              commented {moment.unix(comment?.timestamp?.seconds).fromNow()}
            </span>
          </p>
          <p className={s.commentsList_card_comment}>{comment.comment}</p>
        </div>
      ))}
    </div>
  )
}
