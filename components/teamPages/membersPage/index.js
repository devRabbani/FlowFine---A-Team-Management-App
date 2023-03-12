import { useState } from 'react'
import { useTeam } from '../../../context/TeamContext'
import useGetProfiles from '../../../hooks/useGetProfiles'
import useGetProfilesObj from '../../../hooks/useGetProfilesObj'
import Modal from '../../modal'
import TabNav from '../../tabNav'
import CreatePage from '../createPage'
import Groups from './groups'
import Members from './members'

import s from './membersPage.module.css'

export default function MembersPage() {
  // Local States
  const [isMembers, setIsMembers] = useState(true)

  //  Getting Team Data
  const { team_data, owners, editors } = useTeam()
  const members = team_data?.members
  const { profiles, loading } = useGetProfilesObj(members)

  console.log('members', loading, profiles, team_data?.members)
  console.count('Members Page')
  return (
    <div className={s.membersPage}>
      <TabNav setMenu={setIsMembers} menu={isMembers} type="members" />
      {isMembers ? (
        <Members members={members} profiles={profiles} loading={loading} />
      ) : (
        <Groups />
      )}
    </div>
  )
}
