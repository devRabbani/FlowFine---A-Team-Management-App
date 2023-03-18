import { useState } from 'react'
import { RiUserAddFill } from 'react-icons/ri'
import s from '../membersPage.module.css'
import InviteBox from './inviteBox'
import MemberCard from './memberCard'
import Requests from './requests'

export default function Members({
  loading,
  members,
  teamCode,
  profiles = {},
  invites = [],
  access = 0,
  teamname,
}) {
  const [isInvite, setIsInvite] = useState(false)

  // Check Members
  // Check Already a member
  const checkMembers = (username) => {
    return members.includes(username)
  }

  // Check Already Invited
  const checkInvite = (username) => {
    return invites.some((invite) => invite.username === username)
  }

  return (
    <>
      {invites?.length ? (
        <Requests
          teamCode={teamCode}
          access={access}
          invites={invites}
          teamname={teamname}
        />
      ) : null}
      <div className={`${s.divHeader} flexBetween headerDiv`}>
        <h3 className="header2">All Members</h3>
        <button
          className="headerBtn"
          onClick={() => setIsInvite((prev) => !prev)}
        >
          <RiUserAddFill /> {isInvite ? 'Close' : 'Invite'}
        </button>
      </div>
      {isInvite ? (
        <InviteBox
          checkInvite={checkInvite}
          checkMembers={checkMembers}
          teamCode={teamCode}
          access={access}
          teamname={teamname}
        />
      ) : null}
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
    </>
  )
}
