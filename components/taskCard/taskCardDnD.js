import moment from 'moment'
import { memo, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Modal from '../modal'
import TaskDetails from '../taskDetails'
import EditTaskModal from '../TasksModals/editTaskModal'
import s from './taskCard.module.css'

export default memo(function TaskCardDnd({ task, index, loading }) {
  // const priority = ['low', 'normal', 'high']
  const [isView, setIsView] = useState(false)
  const [editDetails, setEditDetails] = useState(null)
  const [isEditLoading, setEditLoading] = useState(false)

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
  const handleTaskView = (value) => setIsView(value)
  const handleCloseView = () => setIsView(false)

  const handleEditDetails = (value) => setEditDetails(value)
  const handleEditLoading = (value) => setEditLoading(value)

  const deadline = moment(task?.deadline)
  const currentTime = moment()
  const isDelayed = deadline.isBefore(currentTime)
  let delayMessage = ''

  if (isDelayed) {
    const days = currentTime.diff(deadline, 'days')
    if (days === 0) {
      delayMessage = 'Due Today'
    } else if (days === 1) {
      delayMessage = 'Delayed by 1 day'
    } else {
      delayMessage = `Delayed by ${days} days`
    }
  }

  return (
    <>
      <Draggable draggableId={task?.id} index={index} isDragDisabled={loading}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            onClick={() => handleTaskView(true)}
            className={`${s.taskCardDnd} ${
              snapshot.isDragging ? s.dragging : ''
            } ${loading ? s.unDrag : ''}`}
          >
            <div className={s.taskCardTopBar}>
              {renderPriority(task.priority)}
              <p className={s.taskUpdates}>
                Updated{' '}
                {task?.updatedAt?.seconds
                  ? moment.unix(task?.updatedAt?.seconds).fromNow()
                  : 'getting..'}
              </p>
            </div>

            <p className={s.title}>{task?.title}</p>
            <div className={s.taskCardBottomBar}>
              {task?.status === 'complete' ? (
                <p>Completed</p>
              ) : isDelayed ? (
                <p className={s.delayed}>{delayMessage}</p>
              ) : (
                <p>Due {deadline.format('DD MMM')}</p>
              )}
              <p className={s.taskid}>ID-{task?.taskid}</p>
            </div>
          </div>
        )}
      </Draggable>

      {isView ? (
        <TaskDetails
          taskData={task}
          handleCloseView={handleCloseView}
          handleEditDetails={handleEditDetails}
        />
      ) : null}
      {editDetails ? (
        <Modal
          title="Edit Task"
          handleClose={() => handleEditDetails(null)}
          isLoading={isEditLoading}
        >
          <EditTaskModal
            isEditLoading={isEditLoading}
            handleClose={() => handleEditDetails(null)}
            shortInfo={task}
            fullInfo={editDetails}
            handleLoading={handleEditLoading}
          />
        </Modal>
      ) : null}
    </>
  )
})
