import { useMemo, useState } from 'react'
import { useTeam } from '../../../context/TeamContext'
import { useUser } from '../../../context/UserContext'
import useGetProfilesObj from '../../../hooks/useGetProfilesObj'
import { checkAccess } from '../../../utils/firebase/common'
import TabNav from '../../tabNav'
import Groups from './groups'
import Members from './members'

import s from './membersPage.module.css'

export default function MembersPage() {
  // Local States
  const [isMembers, setIsMembers] = useState(true)

  //  Getting Team Data
  const { team_data } = useTeam()
  const { members, teamcode, groups, owners, editors, invites } = team_data
  // Getting Profiles
  const { profiles, loading } = useGetProfilesObj(members)

  // Getting Own Username
  const { username } = useUser()

  // Check Access
  const access = useMemo(
    () => checkAccess(editors, owners, username),
    [username, editors, owners]
  )

  console.count('Members Page')
  return (
    <div className={s.membersPage}>
      <TabNav setMenu={setIsMembers} menu={isMembers} type="members" />
      {isMembers ? (
        <Members
          members={members}
          profiles={profiles}
          loading={loading}
          invites={invites}
          teamCode={teamcode}
          access={access}
        />
      ) : (
        <Groups
          members={members}
          access={access}
          teamCode={teamcode}
          groups={groups}
          profiles={profiles}
        />
      )}
    </div>
  )
}
