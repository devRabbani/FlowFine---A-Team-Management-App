import { useMemo, useState } from 'react'
import Select from 'react-select'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import { useTeam } from '../../../context/TeamContext'
import { useUser } from '../../../context/UserContext'
import {
  customTheme,
  statusOptions,
  statusSelectStyle,
} from '../../../lib/reactSelect'
import { checkAccess } from '../../../utils/firebase/common'
import { markTaskStatus } from '../../../utils/firebase/tasksPage'
import Button from '../../button'
import s from '../taskDetails.module.css'

export default function DetailsBottomBar() {
  const { shortInfo, handleModal, teamCode, fullInfo } = useTaskDetails() // shortInfo for getting status

  const current = shortInfo?.status
  const taskDocId = shortInfo?.id
  const taskid = shortInfo?.taskid

  const { username } = useUser() // Username
  const { team_data } = useTeam() //Getting Team Data

  const access = useMemo(
    () => checkAccess(team_data?.editors, team_data?.owners, username),
    [team_data?.editors, team_data?.owners, username]
  )

  // Local States
  const [status, setStatus] = useState(current || '')
  const [isMarking, setIsMarking] = useState(false)

  // Checking Joined or Not
  const isJoined = useMemo(
    () => fullInfo?.assignedMembers?.includes(username),
    [username, fullInfo?.assignedMembers]
  )
  console.log(isJoined, 'iSJoined')
  // Callback Functions
  const handleLoading = (value) => setIsMarking(value)

  return (
    <div className={s.detailsBottomBar}>
      <Button
        variant="primary"
        disabled={status === current || isMarking}
        onClick={() =>
          markTaskStatus(
            username,
            status,
            teamCode,
            taskDocId,
            taskid,
            handleLoading,
            handleModal,
            isJoined,
            access,
            shortInfo
          )
        }
      >
        {isMarking ? 'Marking..' : 'Mark As'}
      </Button>
      <Select
        styles={statusSelectStyle}
        options={statusOptions}
        defaultValue={statusOptions.find((item) => item.value === current)}
        theme={customTheme}
        placeholder="Status"
        isSearchable={false}
        menuPlacement="auto"
        onChange={(e) => setStatus(e.value)}
      />
    </div>
  )
}
