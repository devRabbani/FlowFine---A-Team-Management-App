import moment from 'moment/moment'
import { memo, useMemo, useState } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiEditLine, RiRestartLine } from 'react-icons/ri'
import { useTeam } from '../../../context/TeamContext'
import { useUser } from '../../../context/UserContext'
import { reOpenTask } from '../../../utils/firebase/archivePage'
import { checkAccess } from '../../../utils/firebase/common'
import s from './archivePage.module.css'

export default function ArchivedCard({ archiveTask }) {
  // Local States
  const [isDeleting, setIsDeleting] = useState(false)
  const [isReopening, setIsReopening] = useState(false)

  const { username } = useUser() //getting username
  const { team_data } = useTeam() // getting teamData

  const access = useMemo(
    () => checkAccess(team_data?.editors, team_data?.owners, username),
    [team_data?.editors, team_data?.owners, username]
  )

  // Callback Function
  const handleLoadingReopen = (value) => setIsReopening(value)

  return (
    <div className={s.taskCard} key={archiveTask?.id}>
      <p className={s.taskCard_title}>{archiveTask?.title}</p>

      <p className={s.taskCard_archivedBy}>
        Archived by <span>@{archiveTask?.archivedBy}</span> on{' '}
        {moment
          .unix(archiveTask?.updatedAt?.seconds)
          .format('HH:mm, Do MMM YY')}
      </p>
      <div className={s.btnDiv}>
        <button
          disabled={isReopening || isDeleting}
          onClick={() =>
            reOpenTask(
              team_data?.teamcode,
              archiveTask?.id,
              archiveTask,
              access,
              username,
              handleLoadingReopen
            )
          }
        >
          <RiRestartLine />
          {isReopening ? 'opening' : 'Reopen'}
        </button>
        <button className={s.dltBtn}>
          <IoMdRemoveCircleOutline />
          {isDeleting ? 'Deleting' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
