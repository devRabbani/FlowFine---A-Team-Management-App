import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiArrowRightSFill } from 'react-icons/ri'
import { acceptRequest, cancelRequest } from '../../../../utils/firebase/common'
import s from '../membersPage.module.css'

export default function Requests({ invites, access, teamCode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Functions
  // Canceling Request
  const handleCancel = async (data) => {
    try {
      setIsLoading(true)
      if (access < 1) {
        throw new Error('You dont have permission to do this')
      } else {
        const isConfirm = confirm(
          'Are you sure yow want to cancel this request?'
        )
        if (isConfirm) {
          await cancelRequest(teamCode, data)
        }
      }
    } catch (error) {
      console.log('Cancel request', error)
      toast.error(<b>{error.message}</b>)
    } finally {
      setIsLoading(false)
    }
  }

  // Accepting Request
  const handleAccept = async (user) => {
    try {
      setIsLoading(true)
      toast.loading(<b>Accepting please wait!</b>, { id: 'acceptrequest' })
      if (access < 1) {
        throw new Error('You dont have the required permission to do this!')
      } else {
        await acceptRequest(teamCode, user)
        toast.success(<b>Accepted successfully</b>, { id: 'acceptrequest' })
      }
    } catch (error) {
      console.log(error)
      toast.error(<b>{error?.message}</b>, { id: 'acceptrequest' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={s.requestsWrapper}>
      <div className={s.requestsHeaderDiv}>
        <div
          className={s.requestsHeader}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <RiArrowRightSFill className={isOpen ? s.open : null} /> Requests{' '}
          <span>({invites?.length})</span>
        </div>
      </div>
      {isOpen ? (
        <div className={s.requestsList}>
          {invites
            ?.sort((a, b) => b.timestamp - a.timestamp)
            .map((invite, i) => (
              <div key={i} className={`${s.request} flexBetween`}>
                <p className={s.request_username}>@{invite?.username}</p>
                {isLoading ? (
                  <p className={s.request_loading}>Loading..</p>
                ) : (
                  <div className={s.request_btnDiv}>
                    {invite?.type === 'invite' ? (
                      <button
                        disabled={isLoading}
                        onClick={() => handleCancel(invite)}
                        className={s.request_cancelBtn}
                      >
                        Cancel Invite
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAccept(invite)}
                          disabled={isLoading}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleCancel(invite)}
                          disabled={isLoading}
                          className={s.request_cancelBtn}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  )
}
