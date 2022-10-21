import { useState } from 'react'
import toast from 'react-hot-toast'
import { addTeamToUser, addUserToTeam, getTeam } from '../utils/firebase'

export default function useJoinTeam() {
  const [isJoining, setIsJoining] = useState(false)

  const join = async (teamCode, uid, displayName, photoURL) => {
    setIsJoining(true)
    const id = toast.loading(<b>Joining please wait..</b>)
    try {
      const { timestamp, teamName } = await getTeam(teamCode)
      if (timestamp) {
        const isNew = await addUserToTeam(teamCode, uid, displayName, photoURL)
        if (isNew) {
          await addTeamToUser(uid, teamCode, teamName, timestamp)
          toast.success(<b>Joined to {teamName}</b>, { id })
          setIsJoining(false)
          return true
        } else {
          throw new Error('Already joined to this team!')
        }
      } else {
        throw new Error('Team Code is Invalid Try Again!')
      }
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsJoining(false)
      return false
    }
  }

  return { join, isJoining }
}
