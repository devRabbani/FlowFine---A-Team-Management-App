import { useState } from 'react'
import toast from 'react-hot-toast'
import { createTeam } from '../../utils/firebase'
import Button from '../button'
import s from './createTeamModal.module.css'

export default function CreateTeamModal({ handleClose, uid }) {
  const [name, setName] = useState('') // input state for team name
  const [isLoading, setIsLoading] = useState(false) //Loading state for creating team

  // Create the Team
  const handleCreate = async () => {
    if (name.trim().length < 4) {
      toast.error(<b>Team name must be more than 4 character</b>)
      return
    }
    setIsLoading(true)
    const id = toast.loading(<b>Creating Team Please Wait..</b>)
    try {
      await createTeam(name.trim(), uid)
      setIsLoading(false)
      toast.success(<b>{name} created successfully</b>, { id })
      handleClose()
    } catch (error) {
      console.error(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsLoading(false)
    }
  }

  return (
    <div className={`${s.createTeam} wrapper`}>
      <label>Create New Team:</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Enter Team Name"
      />
      <div className={s.btnDiv}>
        <Button onClick={handleCreate} variant="primary" disabled={isLoading}>
          {isLoading ? 'Creating' : 'Create'}
        </Button>
        <Button onClick={handleClose} variant="grey" disabled={isLoading}>
          Close
        </Button>
      </div>
    </div>
  )
}
