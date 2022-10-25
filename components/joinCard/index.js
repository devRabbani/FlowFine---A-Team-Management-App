import { useState } from 'react'
import toast from 'react-hot-toast'
import useJoinTeam from '../../hooks/useJoinTeam'
import styles from './joinCard.module.css'

export default function JoinCard({ setIsModal, displayName, uid, photoURL }) {
  const [code, setCode] = useState('')
  const { join, isJoining } = useJoinTeam()

  const handleJoin = async () => {
    if (!code.length) {
      toast.error(<b>You need to type Team Code!</b>)
      return
    }
    const res = await join(code, uid, displayName, photoURL)
    console.log('Response', res)
    if (res) {
      setCode('')
    }
  }

  return (
    <div className={styles.joinCard}>
      <button onClick={() => setIsModal(true)}>Create Team</button>
      <p>or</p>
      <input
        onChange={(e) => setCode(e.target.value)}
        value={code}
        type="text"
        placeholder="Enter team code"
      />
      <button disabled={isJoining} onClick={handleJoin}>
        {isJoining ? 'Joining...' : 'Join Team'}
      </button>
    </div>
  )
}
