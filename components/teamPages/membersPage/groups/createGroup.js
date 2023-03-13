import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import Select from 'react-select'
import { useUser } from '../../../../context/UserContext'
import { commonStyles, customTheme } from '../../../../lib/reactSelect'
import { createGroup } from '../../../../utils/firebase'
import Button from '../../../button'
import s from '../membersPage.module.css'

export default function CreateGroup({
  handleClose,
  members,
  selected,
  access,
  teamCode,
}) {
  // Local States
  const [name, setName] = useState('')
  const [addedMembers, setAddedMembers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Getting Username
  const { username } = useUser()

  // Select Options
  const memberOptions = useMemo(
    () => members?.map((member) => ({ value: member, label: '@' + member })),
    [members]
  )
  // Custom Functions
  const handleChange = (values) => {
    const res = values.map((item) => item.value)
    setAddedMembers(res)
  }

  // Handle Loading
  const handleLoading = (value) => setIsLoading(value)

  // Handle Submit and Update
  const handleSubmit = (e) => {
    e.preventDefault()
    if (addedMembers?.length < 1) {
      toast.error(<b>You need to assign minimum one member</b>)
      return
    }
    createGroup(
      teamCode,
      { name, members: addedMembers },
      username,
      access,
      handleLoading,
      handleClose
    )
  }
  return (
    <form onSubmit={handleSubmit} className={`wrapper ${s.createGroupForm}`}>
      <div className="formDiv">
        <label htmlFor="name">Group Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="Enter Group Name"
        />
      </div>
      <div className="formDiv">
        <label>Select Members</label>
        <Select
          styles={commonStyles}
          options={memberOptions}
          theme={customTheme}
          placeholder="Choose members"
          isMulti
          isSearchable
          onChange={handleChange}
        />
      </div>
      <div className={s.createGroup_btnDiv}>
        <Button disabled={isLoading} variant="primary" type="submit">
          {selected
            ? isLoading
              ? 'Updating'
              : 'Update'
            : isLoading
            ? 'Creating'
            : 'Create'}
        </Button>
        <Button disabled={isLoading} onClick={handleClose} variant="grey">
          Close
        </Button>
      </div>
    </form>
  )
}
