import { useState } from 'react'
import Select from 'react-select'
import { useTaskDetails } from '../../../context/TaskDetailsContext'
import { useUser } from '../../../context/UserContext'
import {
  customTheme,
  statusOptions,
  statusSelectStyle,
} from '../../../lib/reactSelect'
import { markTaskStatus } from '../../../utils/firebase'
import Button from '../../button'
import s from '../taskDetails.module.css'

export default function DetailsBottomBar() {
  const { shortInfo, handleModal, teamCode } = useTaskDetails() // shortInfo for getting status
  const { username } = useUser() // Username

  const current = shortInfo?.status
  const taskDocId = shortInfo?.id
  const taskid = shortInfo?.taskid
  const [status, setStatus] = useState(current || '')
  const [isMarking, setIsMarking] = useState(false)

  // Callback Functions
  const handleLoading = (value) => {
    setIsMarking(value)
  }

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
            handleModal
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
