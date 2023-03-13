import { useState } from 'react'
import s from '../membersPage.module.css'
import { MdGroupAdd } from 'react-icons/md'
import { RiAddCircleFill } from 'react-icons/ri'
import Modal from '../../../modal'
import CreateGroup from './createGroup'
import GroupCard from './groupCard'

export default function Groups({
  members,
  access,
  teamCode,
  groups,
  profiles,
}) {
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
      {groups?.length ? (
        <div className={s.groupsList}>
          {groups.map((group, i) => (
            <GroupCard
              key={group.name + i}
              data={group}
              profiles={profiles}
              access={access}
            />
          ))}
        </div>
      ) : (
        <p className="noData">
          No groups found, Create one by clicking the add new button
        </p>
      )}

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
