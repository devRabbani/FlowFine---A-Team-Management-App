import { useState } from 'react'
import Modal from '../../modal'
import TabNav from '../../tabNav'
import CreatePage from '../createPage'
import s from './membersPage.module.css'

export default function MembersPage() {
  const [isMembers, setIsMembers] = useState(true)
  return (
    <div className={s.membersPage}>
      <TabNav setMenu={setIsMembers} menu={isMembers} type="members" />
      <Modal handleClose={() => console.log('asd')}>
        <CreatePage />
      </Modal>
    </div>
  )
}
