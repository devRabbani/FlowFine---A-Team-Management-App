import Button from '../button'
import s from './taskDetails.module.css'

export default function Comments() {
  return (
    <div className={s.comments}>
      <textarea
        placeholder="Eg: I need this information for this task"
        rows="3"
      />
      <Button variant="primary">Comment</Button>
    </div>
  )
}
