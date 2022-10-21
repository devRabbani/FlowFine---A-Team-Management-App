import { useState } from 'react'
import toast from 'react-hot-toast'
import useCreateTeam from '../../hooks/useCreateTeam'
import styles from './createTeamModal.module.css'

export default function CreateTeamModal({
  setIsModal,
  uid,
  displayName,
  photoURL,
}) {
  const [name, setName] = useState('')

  const { create, isCreating } = useCreateTeam()

  const handleCreate = async () => {
    if (!name.length) {
      toast.error(<b>You need to type Team name!</b>)
      return
    }
    const res = await create(name, uid, displayName, photoURL)
    if (res) {
      setIsModal(false)
      setName('')
    }
  }
  return (
    <div className={styles.createTeam}>
      <p>Create Team</p>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Enter Team Name"
      />
      <button disabled={isCreating} onClick={handleCreate}>
        {isCreating ? 'Loading' : 'Next'}
      </button>
    </div>
  )
}
