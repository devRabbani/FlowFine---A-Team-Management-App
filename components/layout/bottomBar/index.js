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
      <Link href={'/team/' + teamCode + '/create'} className={s.nav}>

        <FaPlus />Create
      </Link>

      <Link href={'/team/' + teamCode + '/groups'} className={s.nav}>

        <FaUsers />Groups
      </Link>
      <Link href={'/team/' + teamCode + '/archive'} className={s.nav}>

        <FaTrashAlt />Archive
      </Link>
    </div>
  );
}
