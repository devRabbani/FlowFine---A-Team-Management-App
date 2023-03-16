import { useMemo, useState } from 'react'
import { useTeam } from '../../../../../context/TeamContext'
import { useUser } from '../../../../../context/UserContext'
import { checkAccess } from '../../../../../utils/firebase/common'
import { changeTeamName } from '../../../../../utils/firebase/homePage'
import Button from '../../../../button'
import s from './teamSetting.module.css'

export default function TeamSetting({ loading, handleLoading }) {
  // Getting Team Data
  const { team_data } = useTeam()

  const { name, owners, editors, members, teamcode } = team_data

  // Getting Username
  const { username } = useUser()

  // Local States
  const [teamName, setTeamName] = useState(name || '')
  const [searchString, setSearchString] = useState('')

  const searchData = useMemo(
    () =>
      members?.filter((item) =>
        item?.includes(searchString?.toLowerCase().trim())
      ),
    [members, searchString]
  )
  const isNameChange =
    teamName.toLowerCase().trim() !== name?.toLowerCase()?.trim()

  // Checking Own Acces
  const ownAccess = useMemo(
    () => checkAccess(editors, owners, username),
    [username, editors, owners]
  )

  return (
    <div className={`${s.teamSettingBody} wrapper`}>
      <div className={s.teamLeaveDiv}>
        <h3>Want to leave this team!</h3> <button>Leave Team</button>
      </div>

      <div className="headerDiv">
        <h3>Change Team Name</h3>
      </div>
      <div className={s.changeNameForm}>
        <input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          type="text"
          placeholder="Change Team Name"
        />
        <div className={s.btnDiv}>
          <Button
            onClick={() =>
              changeTeamName(
                teamcode,
                teamName,
                ownAccess,
                username,
                handleLoading
              )
            }
            disabled={!isNameChange || loading}
            variant="primary"
          >
            Change
          </Button>
          {isNameChange ? (
            <Button
              disabled={loading}
              variant="grey"
              onClick={() => setTeamName(name)}
            >
              Reset
            </Button>
          ) : null}
        </div>
      </div>

      <div className="headerDiv">
        <h3>Team Permissions</h3>
      </div>
      <div className={s.searchDiv}>
        <input
          type="search"
          placeholder="Search User eg: ganesh12"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        {searchString.length > 3 ? (
          searchData?.length ? (
            <div className={s.adminLists}>
              {searchData.map((user) => (
                <AdminCard username={user} key={user} />
              ))}
            </div>
          ) : (
            <p className={s.noData}>No User Found</p>
          )
        ) : null}
      </div>
      <h4>Owners & Editors</h4>
      <div className={s.adminLists}>
        {owners?.map((owner) => (
          <AdminCard
            key={owner}
            username={owner}
            editors={editors}
            owners={owners}
          />
        ))}
        {editors?.map((editor) => (
          <AdminCard
            key={editor}
            username={editor}
            editors={editors}
            owners={owners}
          />
        ))}
      </div>
    </div>
  )
}

const AdminCard = ({ username, editors, owners }) => {
  const access = checkAccess(editors, owners, username)

  // Local States
  const [role, setRole] = useState(access || '0')

  return (
    <div className={s.adminCard}>
      <p>@{username}</p>
      <div className={s.btnDiv}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="0">Member</option>
          <option value="1">Editor</option>
          <option value="2">Owner</option>
        </select>
        {access !== Number(role) ? <button>Change</button> : null}
      </div>
    </div>
  )
}
