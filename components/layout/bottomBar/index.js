import Link from 'next/link'
import { FaPlus, FaTrashAlt, FaUsers, FaUserTie } from 'react-icons/fa'
import s from './bottomBar.module.css'

export default function BottomBar({ teamCode }) {
  return (
    <div className={s.bar}>
      <span className={s.nav}>
        <FaUserTie />
        Members
      </span>
      <Link href={'/team/' + teamCode + '/create'}>
        <a className={s.nav}>
          <FaPlus />
          Create
        </a>
      </Link>

      <Link href={'/team/' + teamCode + '/groups'}>
        <a className={s.nav}>
          <FaUsers />
          Groups
        </a>
      </Link>
      <Link href={'/team/' + teamCode + '/archive'}>
        <a className={s.nav}>
          <FaTrashAlt />
          Archive
        </a>
      </Link>
    </div>
  )
}
