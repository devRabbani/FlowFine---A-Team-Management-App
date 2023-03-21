import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { toast } from 'react-hot-toast'
import { useUser } from '../../../../context/UserContext'
import { changeStatusKanban } from '../../../../utils/firebase/tasksPage'
import TaskCardDnD from '../../../taskCard/taskCardDnD'
import s from './kanbanDnD.module.css'

export default function KanbanDnD({ columns, teamCode }) {
  // Getting Username
  const { username } = useUser()

  // Local STates
  const [loading, setLoading] = useState(false)

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result

    try {
      // Drop Outside
      if (!destination) return
      // If drop on same column
      if (source?.droppableId === destination?.droppableId) return

      setLoading(true)
      toast.loading(<b>Changing Status</b>, { id: 'kanbanstatus' })

      const [removedTask] = columns[source.droppableId].splice(source.index, 1)
      columns[destination.droppableId].splice(destination.index, 0, removedTask)

      await changeStatusKanban(
        draggableId,
        username,
        destination?.droppableId,
        removedTask?.taskid,
        teamCode
      )

      toast.success(<b>Changed successfully</b>, { id: 'kanbanstatus' })
    } catch (error) {
      // Reset
      const [removedTask] = columns[destination.droppableId].splice(
        destination.index,
        1
      )
      columns[source.droppableId].splice(source.index, 0, removedTask)

      console.log(error)
      toast.error(<b>{error.message}</b>, { id: 'kanbanstatus' })
    } finally {
      setLoading(false)
    }
  }
  console.count('KanbanDND')

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={s.kanbanBoard}>
        {Object.keys(columns)?.map((item) => (
          <Column
            key={item}
            tasks={columns[item]}
            status={item}
            loading={loading}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

const Column = ({ tasks, status, loading }) => {
  return (
    <div className={s.kanbanColumn}>
      <h3>{status}</h3>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${s.tasksList} ${
              snapshot.isDraggingOver ? s.dragOver : ''
            }`}
          >
            {tasks.map((task, i) => (
              <TaskCardDnD
                task={task}
                key={task?.id}
                index={i}
                loading={loading}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
