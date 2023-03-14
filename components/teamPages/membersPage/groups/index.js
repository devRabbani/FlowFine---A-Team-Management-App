import { useCallback, useState } from 'react'
import s from '../membersPage.module.css'
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
  const [selected, setSelected] = useState(null) // For Update operation

  // Set Selected value
  const handleSelect = useCallback((value) => setSelected(value), [])
  // handle Close
  const handleClose = () => setIsOpen(false)
  const handleCloseSelect = () => setSelected(null)

  return (
    <div>
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
              handleSelect={handleSelect}
              teamCode={teamCode}
            />
          ))}
        </div>
      ) : (
        <p className="noData">
          No groups found, Create one by clicking the add new button
        </p>
      )}

      {selected || isOpen ? (
        <Modal
          handleClose={selected ? handleCloseSelect : handleClose}
          title="Create Group"
        >
          <CreateGroup
            access={access}
            members={members}
            handleClose={selected ? handleCloseSelect : handleClose}
            teamCode={teamCode}
            selected={selected}
            groups={groups}
          />
        </Modal>
      ) : null}
    </div>
  )
}
