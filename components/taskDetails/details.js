import moment from 'moment'
import { RiDownload2Line } from 'react-icons/ri'
import s from './taskDetails.module.css'

export default function Details({ shortInfo, fullInfo, loading }) {
  const priorityList = ['Low', 'Noraml', 'High']
  console.log(shortInfo)

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
                <div className={s.attachments_file} key={i}>
                  <RiDownload2Line /> {attachment.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className={s.header}>Attachments</h3>
            <p className={s.description}>No Attachements</p>
          </div>
        )}
        {shortInfo?.assignedGroups?.length ? (
          <div>
            <h3 className={s.header}>Assigned Groups</h3>
            <p className={s.description}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>
        ) : null}
        {fullInfo?.assignedMembers?.length ? (
          <div>
            <h3 className={s.header}>Assigned Members</h3>
            <p className={s.description}>Assigned</p>
          </div>
        ) : (
          <div>
            <h3 className={s.header}>Assigned Members</h3>
            <p className={s.description}>All Memebers Are assigned</p>
          </div>
        )}
      </div>
      <div>
        <button>Masrk As Complete</button>
      </div>
    </>
  )
}
