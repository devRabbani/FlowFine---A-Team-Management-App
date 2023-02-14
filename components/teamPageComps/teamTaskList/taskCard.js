import moment from 'moment'
import s from './teamTaskList.module.css'

export default function TaskCard({ task }) {
  return (
    <div className={s.taskCard} key={task.id}>
      <p>{task.title}</p>
      <p>{moment.unix(task?.updatedAt?.seconds).fromNow()}</p>
    </div>
  )
}
