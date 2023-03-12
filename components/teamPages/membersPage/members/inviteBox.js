import { RiUserShared2Fill } from 'react-icons/ri'
import Button from '../../../button'
import s from '../membersPage.module.css'

export default function InviteBox() {
  return (
    <div className={s.inviteBox}>
      <input type="search" placeholder="Type username or name" />
    </div>
  )
}
