import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiAddLine, RiCloseLine, RiLoaderLine } from 'react-icons/ri'
import Select from 'react-select'
import {
  commonStyles,
  customTheme,
  priorityOptions,
} from '../../../lib/reactSelect'
import Button from '../../button'
import AttachFiles from './attachFiles'
import s from './createPage.module.css'
import { useTeam } from '../../../context/TeamContext'
import {
  createTask,
  handleAttachments,
} from '../../../utils/firebase/createTasks'
import { customAlphabet } from 'nanoid'

export default function CreatePage({
  handleClose,
  createLoading,
  setCreateLoading,
  username,
}) {
  // Local States

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('1')
  const [deadline, setDeadline] = useState('')
  const [tags, setTags] = useState('')
  const [assignedGroups, setAssignedGroups] = useState([])
  const [assignedMembers, setAssignedMembers] = useState([])
  const [attachments, setAttachments] = useState([])

  // Getting Team Data
  const { team_data } = useTeam()

  const groupOptions = useMemo(
    () =>
      team_data?.groups?.map((item) => ({
        value: item.name,
        label: item.name,
      })),
    [team_data?.groups]
  )

  const memberOptions = useMemo(
    () =>
      team_data?.members?.map((member) => ({
        value: member,
        label: '@' + member,
      })),
    [team_data?.members]
  )

  // Custom Functions
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

      // Getting TASK ID 8 Digit
      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const nanoid = customAlphabet(alphabet, 8)
      const taskid = nanoid()

      const attachmentsLists = await handleAttachments(
        attachments,
        team_data?.teamcode,
        taskid
      )

      // Getting Tags List
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

      await createTask(
        taskData,
        taskInfoData,
        team_data?.teamcode,
        username,
        taskid
      )
      setCreateLoading(false)
      toast.success(<b>{title} created successfully</b>, { id: toastId })
      handleClose()
    } catch (error) {
      console.log('Task Creating Error', error)
      setCreateLoading(false)
      toast.error(<b>{error?.message}</b>, { id: toastId })
    }
  }

  return (
    <div className={`${s.createPage} wrapper`}>
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
          rows="4"
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
                <span className={s.stateOption}>No Groups found</span>
              )}
            />
          </div>

          <div className={s.formDiv}>
            <label>
              Assign members : <span className={s.optional}>(optional)</span>
            </label>
            <Select
              styles={commonStyles}
              options={memberOptions}
              theme={customTheme}
              placeholder="Choose members"
              isMulti
              isSearchable
              onChange={(value) => handleChange(value, 'member')}
              noOptionsMessage={() => (
                <span className={s.stateOption}>No Members found</span>
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
        <div className={s.btnDiv}>
          <Button
            disabled={createLoading}
            onClick={handleClose}
            variant="grey full"
          >
            <RiCloseLine /> CLose
          </Button>
          <Button disabled={createLoading} variant="primary full" type="submit">
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
        </div>
      </form>
    </div>
  )
}
