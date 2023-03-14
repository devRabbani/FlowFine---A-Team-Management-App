import { memo, useState } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiEditLine } from 'react-icons/ri'
import { useUser } from '../../../../context/UserContext'
import { deleteGroup } from '../../../../utils/firebase/membersPage'

import s from '../membersPage.module.css'

export default memo(function GroupCard({
  data,
  profiles,
  access,
  handleSelect,
  teamCode,
}) {
  // Local States
  const [isDeleting, setIsDeleting] = useState(false)
  const { username } = useUser()
  // Handle Loading
  const handleLoading = (value) => setIsDeleting(value)
  console.count('Group Card')
  return (
    <div className={s.groupCard}>
      <h4 className={s.groupCard_name}>{data.name}</h4>
      <div className={s.groupCard_profiles}>
        {data?.members?.map((username) => (
          <div className={s.groupCard_profileCard} key={username}>
            <p className={s.profileCard_name}>
              {profiles[username]?.displayName}
            </p>
            <p className={s.profileCard_username}>@{username}</p>
          </div>
        ))}
      </div>
      {access > 1 ? (
        <div className={s.groupCard_btnDiv}>
          <button onClick={() => handleSelect(data)} disabled={isDeleting}>
            <RiEditLine />
            Edit
          </button>
          <button
            disabled={isDeleting}
            onClick={() =>
              deleteGroup(teamCode, data, username, access, handleLoading)
            }
            className={s.dltBtn}
          >
            <IoMdRemoveCircleOutline />
            {isDeleting ? 'Deleting' : 'Delete'}
          </button>
        </div>
      ) : null}
    </div>
  )
})
