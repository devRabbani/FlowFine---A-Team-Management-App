import { useState } from 'react'
import { RiUserAddFill, RiUserAddLine } from 'react-icons/ri'
import RequestMenu from './requestMenu'
import s from '../nav.module.css'
import useGetRequests from '../../../../hooks/useGetRequests'

export default function RequestBtn({ username, uid }) {
  // Local States
  const [isRequest, setIsRequest] = useState(false)

  // Functions
  const handleCloseRequestMenu = () => setIsRequest(false)

  const { requests, requestLoading } = useGetRequests(uid)

  const isAlert = requests?.length

  console.count('Request')
  return (
    <>
      <div
        className={s.menus_menu_requests}
        onClick={() => setIsRequest((prev) => !prev)}
      >
        {isAlert ? <div className={s.requestAlert}>{isAlert}</div> : null}
        {isRequest ? <RiUserAddFill /> : <RiUserAddLine />}
      </div>
      {isRequest && (
        <RequestMenu
          uid={uid}
          username={username}
          requests={requests}
          requestLoading={requestLoading}
          handleCloseMenu={handleCloseRequestMenu}
        />
      )}
    </>
  )
}
