import { useState } from 'react'
import toast from 'react-hot-toast'
import { getTeam } from '../utils/firebase/common'
import { createTeam } from '../utils/firebase/teamsPage'

export default function useCreateTeam() {
  const [isCreating, setIsCreating] = useState(false)

  const create = async (teamName, uid, displayName, photoURL) => {
    setIsCreating(true)
    const id = toast.loading(<b>Creating Team..</b>)
    try {
      // Creating Team
      const teamCode = await createTeam(teamName, uid)
      // Adding user to team
      // await addUserToTeam(teamCode, uid, displayName, photoURL)
      // Getting TimeStamp
      const { timestamp } = await getTeam(teamCode)
      // Adding Team to Own
      // await addTeamToUser(uid, teamCode, teamName, timestamp)
      toast.success(<b>{`${teamName} is created`}</b>, { id })
      setIsCreating(false)
      return true
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsCreating(false)
      return false
    }
  }

  return { create, isCreating }
}
