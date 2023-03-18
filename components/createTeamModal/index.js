import { useState } from 'react'
import toast from 'react-hot-toast'
import { createTeam } from '../../utils/firebase/teamsPage'
import Button from '../button'
import s from './createTeamModal.module.css'

export default function CreateTeamModal({
  handleClose,
  username,
  handleLoading,
  loading,
  uid,
}) {
  const [name, setName] = useState('') // input state for team name

  // Create the Team
  const handleCreate = async () => {
    try {
      if (name.trim()?.length < 4) {
        toast.error(<b>Team name must be more than 4 character</b>, {
          id: 'teamcreate',
        })
        return
      }

      // Loading Start
      handleLoading(true)
      toast.loading(<b>Creating Team Please Wait..</b>, { id: 'teamcreate' })

      await createTeam(name.trim(), username, uid)

      handleLoading(false)
      toast.success(<b>{name} created successfully</b>, { id: 'teamcreate' })
      handleClose()
    } catch (error) {
      console.error('Team Creating ', error)
      toast.error(<b>{error.message}</b>, { id: 'teamcreate' })
      handleLoading(false)
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
        <Button onClick={handleCreate} variant="primary" disabled={loading}>
          {loading ? 'Creating' : 'Create'}
        </Button>
        <Button onClick={handleClose} variant="grey" disabled={loading}>
          Close
        </Button>
      </div>
    </div>
  )
}
