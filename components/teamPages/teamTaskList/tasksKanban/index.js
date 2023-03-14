import { useMemo, useState } from 'react'
import { useTeam } from '../../../../context/TeamContext'
import TaskCard from '../../../taskCard'
import s from './tasksKanban.module.css'

export default function TasksKanban() {
  // Local States
  const [statusMenu, setStatusMenu] = useState('idle')

  //  SOrt Options
  const menuLists = ['idle', 'working', 'complete']

  // Getting Tasks and loading
  const { tasks_data, tasks_loading } = useTeam()

  const tasksList = useMemo(() => {
    console.count('use memo')
    return tasks_data?.filter((item) => {
      if (statusMenu === 'idle') {
        return item?.status === 'idle'
      } else if (statusMenu === 'working') {
        return item?.status === 'working'
      } else if (statusMenu === 'complete') {
        return item?.status === 'complete'
      }
      return 0
    })
  }, [tasks_data, statusMenu])

  console.count('Task Kanban')

  return (
    <>
      <div className={s.kanbanNav}>
        {menuLists.map((menu, i) => (
          <div
            key={i}
            onClick={() => setStatusMenu(menu)}
            className={`${s.kanbanNav_menu} ${
              statusMenu === menu ? s.active : ''
            }`}
          >
            {menu}
          </div>
        ))}
      </div>
      <div className={s.tasksKanbanBody}>
        <div className={s.tasksListWrapper}>
          {tasks_loading ? (
            <p>Loading...</p>
          ) : tasksList?.length > 0 ? (
            tasksList.map((task) => <TaskCard task={task} key={task.id} />)
          ) : (
            <p className="noData">No Tasks Found</p>
          )}
        </div>
      </div>
    </>
  )
}
