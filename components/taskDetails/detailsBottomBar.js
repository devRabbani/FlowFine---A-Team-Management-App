import { useRouter } from 'next/router'
import { useState } from 'react'
import Select from 'react-select'
import { useTaskDetails } from '../../context/TaskDetailsContext'
import { useUser } from '../../context/UserContext'
import {
  customTheme,
  statusOptions,
  statusSelectStyle,
} from '../../lib/reactSelect'
import { markTaskStatus } from '../../utils/firebase'
import Button from '../button'
import s from './taskDetails.module.css'

export default function DetailsBottomBar() {
  const { shortInfo, handleModal } = useTaskDetails() // shortInfo for getting status
  const { username } = useUser() // Username

  // Router for getting team code
  const {
    query: { id },
  } = useRouter()

  const current = shortInfo?.status
  const [status, setStatus] = useState(current || '')
  const [isMarking, setIsMarking] = useState(false)

  return (
    <div className={s.detailsBottomBar}>
      <Button
        variant="primary"
        disabled={status === current || isMarking}
        onClick={() =>
          markTaskStatus(
            username,
            status,
            id,
            shortInfo?.id,
            setIsMarking,
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
