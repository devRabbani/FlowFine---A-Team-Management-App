import { useTaskDetails } from '../../../context/TaskDetailsContext'
import s from '../taskDetails.module.css'

export default function Detailsdescription() {
  const { fullInfo } = useTaskDetails()
  return (
    <>
      {fullInfo?.description ? (
        <div>
          <h3 className={s.header}>Description</h3>
          <p className={s.description}>{fullInfo.description}</p>
        </div>
      ) : null}
      {fullInfo?.tags ? (
        <div className={s.tagsWrapper}>
          {fullInfo.tags.map((tag, i) => (
            <div className={s.tag} key={i}>
              {tag}
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
