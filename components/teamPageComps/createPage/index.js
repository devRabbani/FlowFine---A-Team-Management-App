import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiAddLine, RiLoaderLine, RiRefreshLine } from 'react-icons/ri'
import Select from 'react-select'
import {
  customStyles,
  customStylesMulti,
  customTheme,
  priorityOptions,
} from '../../../lib/reactSelect'
import { getUsers } from '../../../utils/firebase'
import Button from '../../button'
import AttachFiles from './attachFiles'
import s from './createPage.module.css'

export default function CreatePage({ members, groups, teamcode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [createLoading, setCreateLoading] = useState(false)
  const [membersOptions, setMembersOptions] = useState([])
  // const [data, setData] = useState({
  //   title: '',
  //   description: '',
  //   priority: 'normal',
  //   deadline: '',
  // })
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('normal')
  const [deadline, setDeadline] = useState('')
  const [assignedGroups, setAssignedGroups] = useState([])
  const [assignedMembers, setAssignedMembers] = useState([])
  const [attachments, setAttachments] = useState([])

  const groupOptions = useMemo(
    () =>
      groups?.map((item) => ({
        value: item.groupId,
        label: item.name,
      })),
    [groups]
  )

  // Custom Functions
  //load options
  const loadMemberOptions = async () => {
    setIsLoading(true)
    try {
      const res = await getUsers(members)
      if (res) {
        setMembersOptions(res)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
    }
  }

  //handle Change for inputs
  const handleChange = (value, name) => {
    if (value?.length) {
      const res = value.map((item) => item.value)
      if (name === 'group') {
        setAssignedGroups(res)
      } else {
        setAssignedMembers(res)
      }
    } else {
      if (name === 'group') {
        setAssignedGroups([])
      } else {
        setAssignedMembers([])
      }
    }
  }

  // Task SUbmit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim().length < 6) {
      toast.error(<b>Please enter valid Title!</b>)
      return
    }
    if (attachments.length > 8) {
      toast.error(<b>Please remove some attachments, Max limit is 8!</b>)
      return
    }

    const data = {
      title,
      description,
      priority,
      deadline,
      assignedGroups,
      assignedMembers,
      status: 'idle',
    }
    console.log(data)
  }

  // SIde Effects
  useEffect(() => {
    loadMemberOptions()
  }, [])

  console.log(
    title,
    description,
    priority,
    deadline,
    assignedGroups,
    assignedMembers
  )
  return (
    <form className={s.createForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter New Task Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
      />
      <textarea
        rows="5"
        placeholder="Enter Task Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <AttachFiles
        isLoading={createLoading}
        setAttachments={setAttachments}
        attachments={attachments}
      />
      <div className={s.twoDiv}>
        <div className={s.formDiv}>
          <label>Priority :</label>
          <Select
            styles={customStyles}
            options={priorityOptions}
            defaultValue={priorityOptions[1]}
            theme={customTheme}
            onChange={(e) => setPriority(e.value)}
          />
        </div>
        <div className={s.formDiv}>
          <label>Deadline :</label>
          <input
            type="date"
            placeholder="Enter Deadline"
            name="deadline"
            value={deadline}
            required
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className={s.formDiv}>
          <label>
            Select Groups : <span className={s.optional}>(optional)</span>
          </label>
          <Select
            styles={customStylesMulti}
            options={groupOptions}
            theme={customTheme}
            placeholder="Default Group: All"
            onChange={(value) => handleChange(value, 'group')}
            isMulti
            isSearchable
            isLoading={false}
            noOptionsMessage={() => (
              <span className={s.stateOption}>No data found</span>
            )}
          />
        </div>

        <div className={s.formDiv}>
          <label>
            Assign members : <span className={s.optional}>(optional)</span>
          </label>
          <Select
            styles={customStylesMulti}
            options={membersOptions}
            theme={customTheme}
            placeholder="Choose members"
            isMulti
            isSearchable
            isLoading={isLoading}
            onChange={(value) => handleChange(value, 'member')}
            loadingMessage={() => (
              <span className={s.stateOption}>Getting members..</span>
            )}
            noOptionsMessage={() => (
              <span className={s.stateOption}>No data found</span>
            )}
          />
        </div>
      </div>
      <Button disabled={createLoading} variant="primary" type="submit">
        {createLoading ? (
          <>
            <RiLoaderLine /> Creating
          </>
        ) : (
          <>
            <RiAddLine /> Create
          </>
        )}
      </Button>
    </form>
  )
}
