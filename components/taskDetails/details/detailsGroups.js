import { useTaskDetails } from '../../../context/TaskDetailsContext'
import s from '../taskDetails.module.css'

export default function DetailsGroups() {
  const { shortInfo } = useTaskDetails()
  return (
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
  )
}
