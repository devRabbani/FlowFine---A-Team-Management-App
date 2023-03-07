import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Select from 'react-select'
import { useUser } from '../../../../context/UserContext'
import { commonStyles, customTheme } from '../../../../lib/reactSelect'
import { priorityOptions } from '../../../../lib/reactSelect'
import { addEvent } from '../../../../utils/firebase'
import Button from '../../../button'
import s from './createEvent.module.css'

export default function CreateEvent({ handleClose }) {
  // Local States
  const [description, setDecription] = useState('')
  const [priority, setPriority] = useState('normal')
  const [time, setTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Getting Uername
  const { username } = useUser()
  // Getting Team Code
  const {
    query: { id },
  } = useRouter()

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault()
    addEvent(
      id,
      { description, time, priority },
      username,
      setIsLoading,
      handleClose
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`${s.createEvent} wrapper`}>
      <div className={s.formDiv}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="3"
          placeholder="Event Description"
          required
          value={description}
          onChange={(e) => setDecription(e.target.value)}
        />
      </div>
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
          <label htmlFor="time">Time :</label>
          <input
            type="datetime-local"
            placeholder="Enter Time"
            name="time"
            value={time}
            required
            min={new Date().toISOString()}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className={s.btnDiv}>
        <Button disabled={isLoading} variant="primary">
          {isLoading ? 'Creating' : 'Create'}
        </Button>
        <Button disabled={isLoading} onClick={handleClose} variant="grey">
          Close
        </Button>
      </div>
    </form>
  )
}
