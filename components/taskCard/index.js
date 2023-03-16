import moment from 'moment'
import { useState } from 'react'
import Modal from '../modal'
import TaskDetails from '../taskDetails'
import s from './taskCard.module.css'

export default function TaskCard({ task }) {
  // const priority = ['low', 'normal', 'high']
  const [viewDetails, setViewDetails] = useState(null)
  const [editDetails, setEditDetails] = useState(null)

  console.log(task?.title, task)
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

  // Callback Function
  const handleTaskView = () => setViewDetails(task)

  const handleEditDetails = (value) => setEditDetails(value)

  console.count('Task Card')

  return (
    <>
      <div onClick={handleTaskView} className={s.taskCard} key={task.id}>
        <div className={s.taskCardTopBar}>
          {renderPriority(task.priority)}
          <p className={s.taskUpdates}>
            Updated {moment.unix(task?.updatedAt?.seconds).fromNow()}
          </p>
        </div>

        <p className={s.title}>{task?.title}</p>
        <div className={s.taskCardBottomBar}>
          <p>Due {moment(task?.deadline).format('DD MMM')}</p>
          <p className={s.status}>{task?.status}</p>
          <p className={s.taskid}>ID-AGSTEHYX</p>
        </div>
      </div>
      {viewDetails ? (
        <TaskDetails
          viewDetails={viewDetails}
          setViewDetails={setViewDetails}
          handleEditDetails={handleEditDetails}
        />
      ) : null}
      {editDetails ? (
        <Modal title="Edit Task" handleClose={() => handleEditDetails(null)}>
          edit pRfodf
        </Modal>
      ) : null}
    </>
  )
}
