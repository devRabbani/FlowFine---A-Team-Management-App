import Image from 'next/image'
import { useTeam } from '../../../../context/TeamContext'
import { checkAccess } from '../../../../utils/firebase'
import s from '../membersPage.module.css'

export default function MemberCard({ profile = {} }) {
  const { photoURL, displayName, username } = profile
  // Getting Team Data
  const { team_data } = useTeam()
  const { owners, editors } = team_data ?? {}
  const access = checkAccess(editors, owners, username)

  const renderPosition = (rank) => {
    if (rank === 2) {
      return <p className={s.owner}>Owner</p>
    } else if (rank === 1) {
      return <p className={s.editor}>Editor</p>
    } else {
      return <p>Member</p>
    }
  }

  return (
    <div className={`${s.membersList_memberCard} flexBetween`}>
      <div className={s.memberCard_info}>
        <Image src={photoURL} width={50} height={50} alt={username} />
        <div className={s.memberCard_nameDiv}>
          <p className={s.memberCard_name}>{displayName}</p>
          <p className={s.memberCard_username}>@{username}</p>
        </div>
      </div>
      {renderPosition(access)}
    </div>
  )
}
