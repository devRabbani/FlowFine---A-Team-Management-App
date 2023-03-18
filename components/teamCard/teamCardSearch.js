import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useUser } from '../../context/UserContext'
import { giveRequest, joinPublicTeam } from '../../utils/firebase/common'
import s from './teamCard.module.css'

export default function TeamCardSearch({ teamData, handleClearSearch }) {
  const { name, teamcode, members, invites, privacy } = teamData

  const { username, uid } = useUser() //Getting user data

  const router = useRouter()

  const requested = invites?.some((item) => item.username === username)
  const isJoined = members?.includes(username)

  // Local States
  const [isRequest, setIsRequest] = useState(requested || false)
  const [isLoading, setIsloading] = useState(false)

  const handleRequest = async () => {
    try {
      setIsloading(true)
      await giveRequest(teamcode, name, username, uid, 'request')
      setIsloading(false)
      setIsRequest(true)
    } catch (error) {
      console.log('Request eror', error)
      toast.error(<b>{error?.message}</b>)
    } finally {
      setIsloading(false)
    }
  }

  // Handle Join Public Team
  const handleJoinPublic = async () => {
    try {
      setIsloading(true)
      await joinPublicTeam(teamcode, username, uid)
      setIsloading(false)
      handleClearSearch()
      router.push('/team/' + teamcode)
    } catch (error) {
      console.log('Joining team public ', error)
      toast.error(<b>{error?.message}</b>)
      setIsloading(false)
    }
  }

  return (
    <div className={s.teamCardSearch}>
      <p className={s.name}>{name}</p>
      <div className={`${s.codePrivacyDiv} flexBetween`}>
        <p className={s.code}>{teamcode}</p>
        <p className={s.privacy}>{privacy}</p>
      </div>

      {isJoined ? (
        <Link className={s.openLink} href={'/team/' + teamcode}>
          view team
        </Link>
      ) : privacy === 'private' ? (
        isRequest ? (
          <p>requested</p>
        ) : (
          <button disabled={isLoading} onClick={handleRequest}>
            {isLoading ? 'requesting..' : 'request to join'}
          </button>
        )
      ) : (
        <button disabled={isLoading} onClick={handleJoinPublic}>
          {isLoading ? 'Joining' : 'Join Team'}
        </button>
      )}
    </div>
  )
}
