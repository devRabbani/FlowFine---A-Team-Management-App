import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiAddLine, RiLoaderLine, RiRefreshLine } from 'react-icons/ri'
import Select from 'react-select'
import {
  commonStyles,
  customTheme,
  priorityOptions,
} from '../../../lib/reactSelect'
import {
  createTask,
  getUsers,
  handleAttachments,
} from '../../../utils/firebase'
import Button from '../../button'
import AttachFiles from './attachFiles'
import s from './createPage.module.css'
import { useRouter } from 'next/navigation'

export default function CreatePage({ members, groups, teamcode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [createLoading, setCreateLoading] = useState(false)
  const [membersOptions, setMembersOptions] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('1')
  const [deadline, setDeadline] = useState('')
  const [tags, setTags] = useState('')
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

  const router = useRouter()

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.trim().length < 6) {
      toast.error(<b>Please enter valid Title!</b>)
      return
    }
    if (attachments?.length > 8) {
      toast.error(<b>Please remove some attachments, Max limit is 8!</b>)
      return
    }

    const toastId = toast.loading(<b>Do not cancel!, Task is creating...</b>)
    try {
      setCreateLoading(true)
      const attachmentsLists = await handleAttachments(attachments, teamcode)
      const tagsList = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((item) => item !== '')

      const taskData = {
        title,
        priority,
        deadline,
        assignedGroups,
        status: 'idle',
      }
      const taskInfoData = {
        description,
        assignedMembers,
        attachments: attachmentsLists,
        tags: tagsList,
      }
      await createTask(taskData, taskInfoData, teamcode)
      setCreateLoading(false)
      toast.success(<b>{title} created successfully</b>, { id: toastId })
      router.push('/team/' + teamcode)
    } catch (error) {
      console.log(error.message)
      setCreateLoading(false)
      toast.error(<b>{error?.message}</b>, { id: toastId })
    }
  }

  // SIde Effects
  useEffect(() => {
    loadMemberOptions() // Load options of select members
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
    <>
      <h2 className="pageHeader">Create Task</h2>
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
              styles={commonStyles}
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
              styles={commonStyles}
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
              styles={commonStyles}
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
          <div className={s.formDiv}>
            <label>
              Tags : <span className={s.optional}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Eg: design, docs, html"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              maxLength={180}
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
    </>
  )
}
