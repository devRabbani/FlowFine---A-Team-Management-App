import { useState } from 'react'
import s from '../membersPage.module.css'
import { MdGroupAdd } from 'react-icons/md'
import { RiAddCircleFill } from 'react-icons/ri'
import Modal from '../../../modal'
import CreateGroup from './createGroup'

export default function Groups({ members, access, teamCode }) {
  // Local States
  const [isOpen, setIsOpen] = useState(false)

  // handle Close
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <div className={`${s.divHeader} flexBetween`}>
        <h3 className="header2">All Groups</h3>
        <button onClick={() => setIsOpen(true)}>
          <RiAddCircleFill /> Add New
        </button>
      </div>
      <div className={s.groupsList}></div>
      {isOpen ? (
        <Modal handleClose={handleClose} title="Create Group">
          <CreateGroup
            access={access}
            members={members}
            handleClose={handleClose}
            teamCode={teamCode}
          />
        </Modal>
      ) : null}
    </>
  )
}
