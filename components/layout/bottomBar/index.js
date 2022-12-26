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
  RiUser6Fill,
  RiUser6Line,
} from 'react-icons/ri'
import s from './bottomBar.module.css'

export default function BottomBar({ teamCode }) {
  const navItems = [
    {
      icon: <RiHome3Line />,
      active: <RiHome3Fill />,
      name: 'Home',
      href: '',
    },
    {
      icon: <RiUser6Line />,
      active: <RiUser6Fill />,
      name: 'Members',
      href: '/members',
    },
    {
      icon: <RiAddCircleLine />,
      active: <RiAddCircleFill />,
      name: 'Create',
      href: '/create',
    },
    {
      icon: <RiGroupLine />,
      active: <RiGroupFill />,
      name: 'Groups',
      href: '/groups',
    },
    {
      icon: <RiArchiveLine />,
      active: <RiArchiveFill />,
      name: 'Archive',
      href: '/archive',
    },
  ]

  const { asPath } = useRouter()

  return (
    <div className={s.bar}>
      {navItems.map((item, i) => {
        const href = '/team/' + teamCode + item.href
        const active = asPath === href
        return (
          <Link
            key={i}
            href={href}
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
