import { useMemo, useState } from 'react'
import { RiCloseLine, RiLoaderLine, RiRestartLine } from 'react-icons/ri'
import Select from 'react-select'
import { useTeam } from '../../../context/TeamContext'
import { useUser } from '../../../context/UserContext'
import {
  commonStyles,
  customTheme,
  priorityOptions,
} from '../../../lib/reactSelect'
import { checkAccess } from '../../../utils/firebase/common'
import { updateTask } from '../../../utils/firebase/createTasks'
import Button from '../../button'
import AttachFiles from '../createPage/attachFiles'
import s from '../createPage/createPage.module.css'

export default function EditTaskModal({
  isEditLoading,
  handleClose,
  shortInfo,
  fullInfo,
  handleLoading,
}) {
  const tagString = fullInfo?.tags?.join(',')
  // Local States
  const [title, setTitle] = useState(shortInfo?.title || '')
  const [description, setDescription] = useState(fullInfo?.description || '')
  const [priority, setPriority] = useState(shortInfo?.priority || '1')
  const [deadline, setDeadline] = useState(shortInfo?.deadline || '')
  const [tags, setTags] = useState(tagString || '')
  const [assignedGroups, setAssignedGroups] = useState(
    shortInfo?.assignedGroups || []
  )
  const [assignedMembers, setAssignedMembers] = useState(
    fullInfo?.assignedMembers || []
  )
  const [attachments, setAttachments] = useState([])
  const [uploaded, setUploaded] = useState(fullInfo?.attachments || [])

  // Getting Team Data
  const { team_data } = useTeam()

  // Getting Uesrname
  const { username } = useUser()

  // Getting Acces
  const access = useMemo(
    () => checkAccess(team_data?.editors, team_data?.owners, username),
    [team_data?.editors, team_data?.owners, username]
  )

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

  // Defaults

  const groupOptionsDefault = useMemo(
    () =>
      shortInfo?.assignedGroups?.map((item) => ({
        value: item,
        label: item,
      })),
    [shortInfo?.assignedGroups]
  )

  const memberOptionsDefault = useMemo(
    () =>
      fullInfo?.assignedMembers?.map((member) => ({
        value: member,
        label: '@' + member,
      })),
    [fullInfo?.assignedMembers]
  )

  // Custom Functions
  const handleUploaded = (value) => {
    setUploaded((prev) => {
      return prev.filter((item) => item?.filename !== value?.filename)
    })
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Getting Tags List

    const tagsList = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((item) => item !== '')

    const taskInfo_short = {
      title,
      priority,
      deadline,
      assignedGroups,
      status: shortInfo?.status,
    }
    const taskInfo_additonal = {
      description,
      assignedMembers,
      tags: tagsList,
    }

    updateTask(
      shortInfo?.id,
      shortInfo?.taskid,
      team_data?.teamcode,
      username,
      attachments,
      uploaded,
      taskInfo_short,
      taskInfo_additonal,
      access,
      handleLoading,
      handleClose
    )
  }

  return (
    <div className={`${s.createPage} wrapper`}>
      <form className={s.createForm} onSubmit={handleSubmit}>
        <div className="formDiv">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter New Task Title"
            name="title"
            value={title}
            id={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
        </div>
        <div className="formDiv">
          <label htmlFor="description">Description</label>
          <textarea
            rows="4"
            id="description"
            placeholder="Enter Task Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <AttachFiles
          isLoading={isEditLoading}
          setAttachments={setAttachments}
          attachments={attachments}
          uploaded={uploaded}
          handleLoading={handleLoading}
          taskDocId={shortInfo?.id}
          taskid={shortInfo?.taskid}
          teamCode={team_data?.teamcode}
          isEditLoading={isEditLoading}
          handleUploaded={handleUploaded}
          access={access}
        />
        <div className={s.twoDiv}>
          <div className={s.formDiv}>
            <label>Priority :</label>
            <Select
              styles={commonStyles}
              options={priorityOptions}
              defaultValue={priorityOptions[Number(priority)]}
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
        </div>
        <div className={s.formDiv}>
          <label>
            Select Groups : <span className={s.optional}>(optional)</span>
          </label>
          <Select
            styles={commonStyles}
            options={groupOptions}
            defaultValue={groupOptionsDefault}
            theme={customTheme}
            placeholder="Default Group: All"
            onChange={(value) => handleChange(value, 'group')}
            isMulti
            isSearchable
            isLoading={false}
            noOptionsMessage={() => (
              <span className="stateOption">No Groups found</span>
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
            defaultValue={memberOptionsDefault}
            theme={customTheme}
            placeholder="Choose members"
            isMulti
            isSearchable
            onChange={(value) => handleChange(value, 'member')}
            noOptionsMessage={() => (
              <span className="stateOption">No Members found</span>
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

        <div className={s.btnDiv}>
          <Button
            disabled={isEditLoading}
            onClick={handleClose}
            variant="grey full"
          >
            <RiCloseLine /> CLose
          </Button>
          <Button disabled={isEditLoading} variant="primary full" type="submit">
            {isEditLoading ? (
              <>
                <RiLoaderLine /> Updating
              </>
            ) : (
              <>
                <RiRestartLine /> Update
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
