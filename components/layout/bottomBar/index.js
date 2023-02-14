import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaPlus, FaTrashAlt, FaUsers, FaUserTie } from 'react-icons/fa'
import {
  RiAddCircleFill,
  RiAddCircleLine,
  RiAddFill,
  RiAddLine,
  RiArchiveFill,
  RiArchiveLine,
  RiGroupFill,
  RiGroupLine,
  RiHome3Fill,
  RiHome3Line,
  RiTodoLine,
  RiTodoFill,
  RiUser6Fill,
  RiUser6Line,
} from 'react-icons/ri'
import s from './bottomBar.module.css'

export default function BottomBar({ teamCode }) {
  const navItems = [
    {
      icon: <RiTodoLine />,
      active: <RiTodoFill />,
      name: 'Tasks',
      path: '',
      href: '/team/' + teamCode,
    },
    {
      icon: <RiUser6Line />,
      active: <RiUser6Fill />,
      name: 'Members',
      path: 'members',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'members' },
      },
    },
    {
      icon: <RiAddCircleLine />,
      active: <RiAddCircleFill />,
      name: 'Create',
      path: 'create',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'create' },
      },
    },
    {
      icon: <RiGroupLine />,
      active: <RiGroupFill />,
      name: 'Groups',
      path: 'groups',
      href: {
        pathname: '/team/' + teamCode,
        query: { menu: 'groups' },
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

  const {
    query: { menu = '' },
  } = useRouter()
  console.log(menu)
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
