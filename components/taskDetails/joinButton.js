import { useState } from 'react'
import {
  RiLoader2Fill,
  RiLogoutBoxFill,
  RiLogoutBoxLine,
  RiTeamFill,
} from 'react-icons/ri'
import { useTaskDetails } from '../../context/TaskDetailsContext'
import { useUser } from '../../context/UserContext'
import { joinTask, leaveTask } from '../../utils/firebase'
import Button from '../button'

export default function JoinButton() {
  // States
  const [isJoining, setIsJoining] = useState(false)

  // Getting Username
  const { username } = useUser()

  // Getting Members
  const { fullInfo, shortInfo } = useTaskDetails()
  const taskid = shortInfo?.id
  const members = fullInfo?.assignedMembers

  if (members?.includes(username)) {
    return (
      <Button
        onClick={() => leaveTask(username, taskid, setIsJoining)}
        disabled={isJoining}
        variant="border red smallFont"
      >
        {isJoining ? (
          <>
            <RiLoader2Fill /> Loading
          </>
        ) : (
          <>
            <RiLogoutBoxLine /> Leave
          </>
        )}
      </Button>
    )
  }

  return (
    <Button
      onClick={() => joinTask(username, taskid, setIsJoining)}
      disabled={isJoining}
      variant="border smallFont"
    >
      {isJoining ? (
        <>
          <RiLoader2Fill /> Loading
        </>
      ) : (
        <>
          <RiTeamFill /> Join Task
        </>
      )}
    </Button>
  )
}
