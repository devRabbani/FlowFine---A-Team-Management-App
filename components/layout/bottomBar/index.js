import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  RiArchiveFill,
  RiArchiveLine,
  RiGroupFill,
  RiGroupLine,
  RiHome3Fill,
  RiHome3Line,
  RiTodoLine,
  RiTodoFill,
  RiCalendarEventLine,
  RiCalendarEventFill,
} from 'react-icons/ri'
import s from './bottomBar.module.css'

export default function BottomBar({ teamCode, menu = '' }) {
  const navItems = [
    {
      icon: <RiHome3Line />,
      active: <RiHome3Fill />,
      name: 'Home',
      path: '',
      href: '/team/' + teamCode,
    },
    {
      icon: <RiTodoLine />,
      active: <RiTodoFill />,
      name: 'Tasks',
      path: 'tasks',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'tasks' },
      },
    },
    {
      icon: <RiCalendarEventLine />,
      active: <RiCalendarEventFill />,
      name: 'Events',
      path: 'events',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'events' },
      },
    },

    {
      icon: <RiGroupLine />,
      active: <RiGroupFill />,
      name: 'Members',
      path: 'members',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'members' },
      },
    },
    {
      icon: <RiArchiveLine />,
      active: <RiArchiveFill />,
      name: 'Archive',
      path: 'archive',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'archive' },
      },
    },
  ]

  return (
    <div className={s.bar}>
      {navItems.map((item, i) => {
        // const href = '/team/' + teamCode + item.href
        const active = menu === item.path
        return (
          <Link
            key={i}
            href={item.href}
            className={`${s.nav} ${active ? 'active' : ''}`}
            replace={true}
          >
            {active ? item.active : item.icon} {item.name}
          </Link>
        )
      })}
    </div>
  )
}
