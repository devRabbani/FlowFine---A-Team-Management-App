import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import useClickOutside from '../../../../hooks/useClickOutside'
import useGetRequests from '../../../../hooks/useGetRequests'
import {
  acceptRequest,
  cancelRequest,
  test,
} from '../../../../utils/firebase/common'
import Loading from '../../../loading'
import s from './requestsMenu.module.css'
export default function RequestMenu({ handleCloseMenu, uid, username }) {
  // Local STates
  const [isLoading, setIsloading] = useState()

  const { requests, requestLoading } = useGetRequests(uid)
  // Click Outside Handle
  const targetRef = useRef()
  useClickOutside(targetRef, handleCloseMenu)

  return (
    <div ref={targetRef} className={s.requestsMenu}>
      <div className="headerDiv">
        <h4>Requests</h4>
      </div>
      {requestLoading ? (
        <Loading high="high" />
      ) : requests?.length ? (
        <div className={s.requestsList}>
          {requests.map((request) => (
            <RequestCard
              teamcode={request?.id}
              type={request?.type}
              key={request?.id}
              timestamp={request?.timestamp}
              teamname={request?.teamname}
              uid={uid}
              username={username}
              handleCloseMenu={handleCloseMenu}
            />
          ))}
        </div>
      ) : (
        <p className="noData">No requests data available</p>
      )}
    </div>
  )
}

const RequestCard = ({
  teamcode,
  teamname,
  type,
  timestamp,
  username,
  uid,
  handleCloseMenu,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // Handle Accept
  const handleAccept = async () => {
    let id
    try {
      setIsLoading(true)
      id = toast.loading(<b>Joining please wait</b>)
      await acceptRequest(teamcode, {
        type,
        username,
        uid,
        timestamp,
      })
      toast.success(<b>Successfully Joined</b>, { id })
      setIsLoading(false)
      handleCloseMenu()
      router.push('/team/' + teamcode)
    } catch (error) {
      console.log('Accepting Request error', error)
      toast.error(<b>{error?.message}</b>, { id })
      setIsLoading(false)
    }
  }

  // Handle Cancel Request
  const handleCancel = async () => {
    let id
    try {
      const isConfirm = confirm('Are you sure you want to cancel request?')
      if (!isConfirm) return
      id = toast.loading(<b>Canceling request...</b>)
      setIsLoading(true)

      await cancelRequest(teamcode, {
        type,
        username,
        uid,
        timestamp,
      })

      toast.success(<b>Canceled successfully</b>, { id })
    } catch (error) {
      console.log('Cancel request', error)
      toast.error(<b>{error?.message}</b>, { id })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={s.requestCard}>
      {type === 'invite' ? (
        <>
          <p>
            <span>{teamname}</span> is invited you to join the team
          </p>
          <div className={s.btnDiv}>
            {isLoading ? (
              <p>Loading</p>
            ) : (
              <>
                <button disabled={isLoading} onClick={handleAccept}>
                  accept
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleCancel}
                  className={s.danger}
                >
                  cancel
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <p>
            You send join request to <span>{teamname}</span>
          </p>
          <div className={s.btnDiv}>
            <button
              className={s.danger}
              disabled={isLoading}
              onClick={handleCancel}
            >
              {isLoading ? 'canceling' : 'cancel request'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
