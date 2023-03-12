import Image from 'next/image'
import { useState } from 'react'
import { RiUserAddFill, RiUserAddLine } from 'react-icons/ri'
import s from '../membersPage.module.css'
import InviteBox from './inviteBox'
import MemberCard from './memberCard'

export default function Members({ loading, members, profiles = {} }) {
  const [isInvite, setIsInvite] = useState(false)

  return (
    <div>
      <div className={s.divHeader}>
        <h3 className="header2">All Members</h3>
        <button onClick={() => setIsInvite((prev) => !prev)}>
          <RiUserAddFill /> {isInvite ? 'Close' : 'Invite'}
        </button>
      </div>
      {isInvite ? <InviteBox /> : null}
      {loading ? (
        <p>Loading</p>
      ) : members?.length ? (
        <div className={s.membersList}>
          {members.map((member) => (
            <MemberCard key={member} profile={profiles[member]} />
          ))}
        </div>
      ) : (
        <p className="noData">
          No Members Data Found, Try to Invite One by clicking invite button.
        </p>
      )}
    </div>
  )
}
