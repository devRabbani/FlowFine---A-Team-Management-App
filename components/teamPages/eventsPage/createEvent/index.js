import { useState } from 'react'
import Select from 'react-select'
import { commonStyles, customTheme } from '../../../../lib/reactSelect'
import { priorityOptions } from '../../../../lib/reactSelect'
import { addEvent } from '../../../../utils/firebase/eventsPage'
import Button from '../../../button'
import s from './createEvent.module.css'

export default function CreateEvent({
  handleClose,
  selected,
  username,
  teamcode,
  loading,
  handleLoading,
  access,
}) {
  // Local States
  const [description, setDecription] = useState(selected?.description || '')
  const [priority, setPriority] = useState(selected?.priority || 1)
  const [time, setTime] = useState(selected?.time || '')

  // Functions
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    addEvent(
      teamcode,
      { description, time, priority },
      username,
      access,
      handleLoading,
      handleClose,
      selected?.id
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`${s.createEvent} wrapper`}>
      <div className="formDiv">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="3"
          placeholder="Event Description"
          required
          value={description}
          maxLength={200}
          onChange={(e) => setDecription(e.target.value)}
        />
      </div>
      <div className={s.twoDiv}>
        <div className="formDiv">
          <label>Priority :</label>
          <Select
            styles={commonStyles}
            options={priorityOptions}
            defaultValue={priorityOptions[1]}
            theme={customTheme}
            onChange={(e) => setPriority(e.value)}
          />
        </div>
        <div className="formDiv">
          <label htmlFor="time">Time :</label>
          <input
            type="datetime-local"
            placeholder="Enter Time"
            id="time"
            value={time}
            required
            min={new Date().toISOString()}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className={s.btnDiv}>
        <Button disabled={loading} variant="primary" type="submit">
          {selected
            ? loading
              ? 'Updating'
              : 'Update'
            : loading
            ? 'Creating'
            : 'Create'}
        </Button>
        <Button disabled={loading} onClick={handleClose} variant="grey">
          Close
        </Button>
      </div>
    </form>
  )
}
