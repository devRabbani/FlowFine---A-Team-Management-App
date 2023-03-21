import { useState } from 'react'
import TaskCard from '../../../taskCard'
import s from './tasksKanban.module.css'

export default function KanbanNoraml({ columns, loading }) {
  // Local States
  const [statusMenu, setStatusMenu] = useState('idle')

  console.count('Kanban Noraml')
  return (
    <div>
      <div className={s.kanbanNav}>
        {Object.keys(columns)?.map((menu, i) => (
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
            <p className="noData">Getting Tasks...</p>
          ) : columns[statusMenu]?.length > 0 ? (
            columns[statusMenu]?.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))
          ) : (
            <p className="noData">No Tasks Found</p>
          )}
        </div>
      </div>
    </div>
  )
}
