import { useState } from 'react'
import Select from 'react-select'
import { customTheme, statusOptions } from '../../lib/reactSelect'
import Button from '../button'
import s from './taskDetails.module.css'

export default function DetailsBottomBar({ current }) {
  const [status, setStatus] = useState(current || '')
  const [isMarking, setIsMarking] = useState(false)

  return (
    <div className={s.detailsBottomBar}>
      <Button variant="primary" disabled={status === current || isMarking}>
        Mark As
      </Button>
      <Select
        // styles={sortSelectStyle}
        options={statusOptions}
        defaultValue={statusOptions.find((item) => item.value === current)}
        theme={customTheme}
        placeholder="Status"
        isSearchable={false}
        menuPlacement="auto"
        onChange={(e) => setStatus(e.value)}
      />
    </div>
  )
}
