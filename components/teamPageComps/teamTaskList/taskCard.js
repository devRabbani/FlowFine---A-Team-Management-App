import moment from 'moment'
import { useState } from 'react'
import TaskDetails from '../../taskDetails'
import s from './teamTaskList.module.css'

export default function TaskCard({ task }) {
  // const priority = ['low', 'normal', 'high']
  const [viewDetails, setViewDetails] = useState(null)

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

  const handleTaskView = () => {
    setViewDetails(task)
  }

  console.count('Task Card')

  return (
    <>
      <div className={s.taskCard} key={task.id}>
        <div className={s.taskCardTopBar}>
          {renderPriority(task.priority)}
          <p>Updated {moment.unix(task?.updatedAt?.seconds).fromNow()}</p>
        </div>

        <p className={s.title}>{task?.title}</p>
        <div className={s.taskCardBottomBar}>
          <p>
            {/* {moment(task?.deadline).format('DD MMM')}
          {' - '} */}
            Due {moment(task?.deadline).format('DD MMM')}
          </p>
          <p className={s.status}>{task?.status}</p>
          <p className={s.taskid}>ID-AGSTEHYX</p>
        </div>
        <button onClick={handleTaskView}>ssggs</button>
      </div>
      {viewDetails ? (
        <TaskDetails
          viewDetails={viewDetails}
          setViewDetails={setViewDetails}
        />
      ) : null}
    </>
  )
}
