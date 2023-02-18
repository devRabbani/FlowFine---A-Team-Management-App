import { useState } from 'react'
import { RiLoader2Fill, RiTeamFill } from 'react-icons/ri'
import { useUser } from '../../context/UserContext'
import { joinTask } from '../../utils/firebase'
import Button from '../button'

export default function JoinButton({ taskid, members }) {
  // States
  const [isJoining, setIsJoining] = useState(false)

  // Getting Username
  const { username } = useUser()

  if (members?.includes(username)) {
    return null
  }

  return (
    <Button
      onClick={() => joinTask(username, taskid, setIsJoining)}
      disabled={isJoining}
      variant="border"
    >
      {isJoining ? (
        <>
          <RiLoader2Fill /> Joining
        </>
      ) : (
        <>
          <RiTeamFill /> Join Task
        </>
      )}
    </Button>
  )
}
