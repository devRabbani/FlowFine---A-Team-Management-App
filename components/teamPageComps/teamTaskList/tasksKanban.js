import { useState } from 'react'
import s from './teamTaskList.module.css'

export default function TasksKanban() {
  const [statusMenu, setStatusMenu] = useState('idle')

  const menuLists = ['idle', 'working', 'complete']

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
      <div className={s.tasksKanbanBody}></div>
    </>
  )
}
