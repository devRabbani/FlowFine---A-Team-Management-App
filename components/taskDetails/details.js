import moment from 'moment'
import Image from 'next/image'
import { RiDownload2Line, RiLoader2Fill, RiTeamFill } from 'react-icons/ri'
import DetailsBottomBar from './detailsBottomBar'
import JoinButton from './joinButton'
import s from './taskDetails.module.css'

export default function Details({
  shortInfo,
  fullInfo,
  loading,
  profiles,
  profilesLoading,
}) {
  // Priority list because it give 0 1 & 2
  const priorityList = ['Low', 'Noraml', 'High']

  if (loading) {
    return <p>Loading please wait</p>
  }

  return (
    <>
      <div className={s.details}>
        <p className={s.title}>{shortInfo?.title}</p>
        <div className={s.priorityFlexDiv}>
          <p>
            Priority{' '}
            <span className={priorityList[shortInfo.priority]}>
              {priorityList[shortInfo.priority]}
            </span>
          </p>
          <p>
            Due{' '}
            <span className={s.date}>
              {moment(shortInfo.deadline).format('DD MMM YYYY')}
            </span>
          </p>
        </div>
        {fullInfo?.description ? (
          <div>
            <h3 className={s.header}>Description</h3>
            <p className={s.description}>{fullInfo.description}</p>
          </div>
        ) : null}
        {fullInfo?.attachments?.length ? (
          <div>
            <h3 className={s.header}>Attachments</h3>
            <div className={s.attachments}>
              {fullInfo.attachments.map((attachment, i) => (
                <a
                  href={attachment.url}
                  className={s.attachments_file}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiDownload2Line /> {attachment.name}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h3 className={s.header}>Assigned Groups</h3>
          <div className={s.groupsWrapper}>
            {shortInfo?.assignedGroups?.length ? (
              shortInfo.assignedGroups.map((group, i) => (
                <div className={s.groupName} key={i}>
                  {group}
                </div>
              ))
            ) : (
              <div className={s.groupName}>Common</div>
            )}
          </div>
        </div>

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
                <JoinButton
                  taskid={shortInfo?.id}
                  members={fullInfo?.assignedMembers}
                />
              </>
            )
          ) : (
            <>
              <p className={s.noDetails}>No Members Assigned</p>
              <JoinButton
                taskid={shortInfo?.id}
                members={fullInfo?.assignedMembers}
              />
            </>
          )}
        </div>
      </div>
      <DetailsBottomBar current={shortInfo?.status} />
    </>
  )
}
