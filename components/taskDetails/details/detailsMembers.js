import Image from 'next/image'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import s from '../taskDetails.module.css'
import JoinButton from './joinButton'

export default function DetailsMembers() {
  const { fullInfo, profiles, profilesLoading } = useTaskDetails()
  return (
    <div>
      <h3 className={s.header}>Assigned Members</h3>
      {fullInfo?.assignedMembers?.length ? (
        profilesLoading ? (
          <p>Getting Members...</p>
        ) : (
          <>
            <div className={s.profilesWrapper}>
              {profiles.map((profile, i) => (
                <div
                  className={s.profilesWrapper_profile}
                  key={profile?.uid || i}
                >
                  <div className={s.img}>
                    <Image
                      src={profile?.photoURL}
                      width={40}
                      height={40}
                      alt={`Profile of ${profile?.displayName}`}
                    />
                  </div>
                  {profile?.displayName}
                </div>
              ))}
            </div>
            <JoinButton />
          </>
        )
      ) : (
        <>
          <p className={s.noDetails}>No Members Assigned</p>
          <JoinButton />
        </>
      )}
    </div>
  )
}
