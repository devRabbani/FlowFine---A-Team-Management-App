import debounce from 'lodash.debounce'
import moment from 'moment'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { giveTeamJoinRequest } from '../../utils/firebase'
import s from './teamCard.module.css'

export default function TeamCard({
  teamcode,
  teamname,
  updated,
  isSearch,
  request,
  joined,
}) {
  const [isRequest, setIsRequest] = useState(request || false)
  const [isLoading, setIsloading] = useState(false)

  const { user } = useAuth()

  const debounceClick = useCallback(
    debounce(async (value) => {
      try {
        await giveTeamJoinRequest(!value, teamcode, user?.uid)
        toast.success(
          <b>
            {value
              ? 'Request cancel successfully'
              : 'Request send successfully'}
          </b>
        )
      } catch (error) {
        console.error(error.message)
        toast.error(<b>{error.message}</b>)
      }
    }, 700),
    []
  )
  if (isSearch) {
    const handleClick = () => {
      setIsRequest((prev) => !prev)
      debounceClick(isRequest)
    }

    return (
      <div className={s.teamCardSearch}>
        <p className={s.name}>{teamname}</p>
        <p className={s.code}>{teamcode}</p>
        {joined ? (
          <Link className={s.openLink} href={'/team/' + teamcode}>
            view team
          </Link>
        ) : (
          <>
            <button
              disabled={isLoading}
              className={isRequest && !isLoading ? 'cancel' : ''}
              onClick={handleClick}
            >
              {isLoading
                ? 'processing'
                : isRequest
                ? 'cancel request'
                : 'request to join'}
            </button>
          </>
        )}
      </div>
    )
  }
  return (
    <Link className={s.teamCard} href={'/team/' + teamcode}>
      <p className={s.name}>{teamname}</p>
      <p className={s.code}>{teamcode}</p>
      <p className={s.date}>
        Last update : {moment.unix(updated.seconds).fromNow()}
      </p>
    </Link>
  )
}
