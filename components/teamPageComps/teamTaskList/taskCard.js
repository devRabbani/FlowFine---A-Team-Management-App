import moment from 'moment'
import s from './teamTaskList.module.css'

export default function TaskCard({ task }) {
  // const priority = ['low', 'normal', 'high']

  const renderPriority = (priority) => {
    switch (priority) {
      case '0':
        return <div className={s.low}>Low</div>
      case '1':
        return <div className={s.normal}>Normal</div>
      case '2':
        return <div className={s.high}>High</div>
      default:
        break
    }
  }

  return (
    <div className={s.taskCard} key={task.id}>
      <div className={s.taskCardTopBar}>
        {renderPriority(task.priority)}
        <p>Updated {moment.unix(task?.updatedAt?.seconds).fromNow()}</p>
      </div>
      <p className={s.taskid}>ID-AGSTEHYX</p>
      <p className={s.title}>{task?.title}</p>
    </div>
  )
}
