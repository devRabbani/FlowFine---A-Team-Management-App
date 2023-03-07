import { useMemo, useState } from 'react'
import TaskCard from '../../../taskCard'
import s from './tasksKanban.module.css'

export default function TasksKanban({ tasks, loading }) {
  const [statusMenu, setStatusMenu] = useState('idle')

  const menuLists = ['idle', 'working', 'complete']

  const tasksList = useMemo(() => {
    console.count('use memo')
    return tasks?.filter((item) => {
      if (statusMenu === 'idle') {
        return item?.status === 'idle'
      } else if (statusMenu === 'working') {
        return item?.status === 'working'
      } else if (statusMenu === 'complete') {
        return item?.status === 'complete'
      }
      return 0
    })
  }, [tasks, statusMenu])

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
          {loading ? (
            <p>Loading...</p>
          ) : tasksList?.length > 0 ? (
            tasksList.map((task) => <TaskCard task={task} key={task.id} />)
          ) : (
            <p>No Tasks Found</p>
          )}
        </div>
      </div>
    </>
  )
}
