import { useState } from 'react'
import {
  RiLoader2Fill,
  RiLogoutBoxFill,
  RiLogoutBoxLine,
  RiTeamFill,
} from 'react-icons/ri'
import { useUser } from '../../context/UserContext'
import { joinTask, leaveTask } from '../../utils/firebase'
import Button from '../button'

export default function JoinButton({ taskid, members }) {
  // States
  const [isJoining, setIsJoining] = useState(false)

  // Getting Username
  const { username } = useUser()

  if (members?.includes(username)) {
    return (
      <Button
        onClick={() => leaveTask(username, taskid, setIsJoining)}
        disabled={isJoining}
        variant="border red"
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
      variant="border"
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
