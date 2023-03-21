import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useTeam } from '../../../../../context/TeamContext'
import { useUser } from '../../../../../context/UserContext'
import { checkAccess } from '../../../../../utils/firebase/common'
import {
  changePermission,
  changeTeamName,
  deleteTeam,
  leaveTeam,
  removeUser,
} from '../../../../../utils/firebase/homePage'
import Button from '../../../../button'
import s from './teamSetting.module.css'

export default function TeamSetting({ loading, handleLoading }) {
  // Getting Team Data
  const { team_data } = useTeam()

  const { name, owners, groups, editors, members, teamcode, privacy } =
    team_data

  // Getting Username
  const { username, uid } = useUser()

  // Local States
  const [teamName, setTeamName] = useState(name || '')
  const [privacyOption, setPrivacyOption] = useState(privacy || 'private')
  const [confirmName, setConfirmName] = useState('')
  const [searchString, setSearchString] = useState('')

  const searchData = useMemo(
    () =>
      members?.filter((item) =>
        item?.includes(searchString?.toLowerCase().trim())
      ),
    [members, searchString]
  )
  const isNameChange =
    teamName.toLowerCase().trim() !== name?.toLowerCase()?.trim() ||
    privacy !== privacyOption

  // Checking Own Acces
  const ownAccess = useMemo(
    () => checkAccess(editors, owners, username),
    [username, editors, owners]
  )

  // Handle Route After Deletion
  const router = useRouter()
  const handleRoute = () => router.push('/')

  // Handle Reset Confirmation
  const handleResetConfirm = () => setConfirmName('')

  return (
    <div className={`${s.teamSettingBody} wrapper`}>
      <div className={s.teamLeaveDiv}>
        <h3>Want to leave this team!</h3>{' '}
        <button
          disabled={loading}
          onClick={() =>
            leaveTeam(
              teamcode,
              username,
              uid,
              groups,
              ownAccess,
              owners,
              handleLoading
            )
          }
        >
          Leave Team
        </button>
      </div>

      <div className="headerDiv">
        <h3>Change Team Name</h3>
      </div>
      <div className={s.changeNameForm}>
        <div className={s.btnDiv}>
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            type="text"
            placeholder="Change Team Name"
          />{' '}
          <select
            value={privacyOption}
            onChange={(e) => setPrivacyOption(e.target.value)}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className={s.btnDiv}>
          <Button
            onClick={() =>
              changeTeamName(
                teamcode,
                teamName,
                privacyOption,
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
              onClick={() => {
                setTeamName(name)
                setPrivacyOption(privacy || 'private')
              }}
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
                <AdminCard
                  username={user}
                  key={user}
                  editors={editors}
                  owners={owners}
                  ownUsername={username}
                  ownAccess={ownAccess}
                  groups={groups}
                  loading={loading}
                  handleLoading={handleLoading}
                  teamCode={teamcode}
                />
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
            ownUsername={username}
            ownAccess={ownAccess}
            groups={groups}
            loading={loading}
            handleLoading={handleLoading}
            teamCode={teamcode}
          />
        ))}

        {editors?.map((editor) => (
          <AdminCard
            key={editor}
            username={editor}
            editors={editors}
            owners={owners}
            ownUsername={username}
            ownAccess={ownAccess}
            groups={groups}
            loading={loading}
            handleLoading={handleLoading}
            teamCode={teamcode}
          />
        ))}
      </div>
      <div className={s.deleteWrapper}>
        <div className="headerDiv">
          <h3>Delete Team (Danger Zone)</h3>
        </div>
        <div className={s.deleteForm}>
          <p>
            If you want to delete this team type{' '}
            <span>{teamName?.toUpperCase()}</span> bellow
          </p>
          <input
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            type="text"
            placeholder="Type Your Team Name"
          />
        </div>

        <Button
          disabled={
            loading ||
            !(confirmName?.toLowerCase().trim() === name?.toLowerCase()?.trim())
          }
          onClick={() =>
            deleteTeam(
              ownAccess,
              teamcode,
              handleLoading,
              handleRoute,
              handleResetConfirm
            )
          }
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

const AdminCard = ({
  username,
  editors,
  owners,
  ownAccess,
  ownUsername,
  groups,
  loading,
  handleLoading,
  teamCode,
}) => {
  const access = checkAccess(editors, owners, username)

  // Local States
  const [role, setRole] = useState(access || '0')

  // Changing Permission
  const handlePermission = () => {
    const roleName = {
      0: 'member',
      1: 'editor',
      2: 'owner',
    }
    changePermission(
      teamCode,
      roleName[role],
      username,
      roleName[access],
      ownAccess,
      owners,
      handleLoading
    )
  }

  // Remove User
  const handleRemove = () =>
    removeUser(
      ownAccess,
      ownUsername,
      Number(access),
      username,
      groups,
      owners,
      teamCode,
      handleLoading
    )

  return (
    <div className={s.adminCard}>
      <p>@{username}</p>
      <div className={s.btnDiv}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="0">Member</option>
          <option value="1">Editor</option>
          <option value="2">Owner</option>
          {username !== ownUsername ? <option value="3">Remove</option> : null}
        </select>
        {role === '3' ? (
          <button disabled={loading} onClick={handleRemove}>
            Remove
          </button>
        ) : access !== Number(role) ? (
          <button disabled={loading} onClick={handlePermission}>
            Change
          </button>
        ) : null}
      </div>
    </div>
  )
}
