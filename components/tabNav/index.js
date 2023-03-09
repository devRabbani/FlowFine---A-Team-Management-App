import { BsKanban, BsKanbanFill } from 'react-icons/bs'
import { FaListAlt, FaRegListAlt } from 'react-icons/fa'
import s from './tabNav.module.css'

export default function TabNav({ setMenu, menu, type = 'task' }) {
  const menus = {
    task: [
      {
        name: 'List',
        value: true,
        activeIcon: <FaListAlt />,
        icon: <FaRegListAlt />,
      },
      {
        name: 'Kanban',
        value: false,
        activeIcon: <BsKanbanFill />,
        icon: <BsKanban />,
      },
    ],
    members: [
      {
        name: 'Members',
        value: true,
      },
      {
        name: 'Groups',
        value: false,
      },
    ],
  }

  return (
    <div className={s.tabNav}>
      {menus[type].map((item) => (
        <div
          key={item.name}
          onClick={() => setMenu(item.value)}
          className={`${s.tabNav_menu} ${menu === item.value ? s.active : ''}`}
        >
          {menu === item.value ? item?.activeIcon : item?.icon}
          {item.name}
        </div>
      ))}
    </div>
  )
}
