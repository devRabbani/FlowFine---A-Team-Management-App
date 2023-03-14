import { useState } from 'react'
import Select from 'react-select'
import {
  customTheme,
  sortOptions,
  sortSelectStyle,
} from '../../../../lib/reactSelect'
import TaskCard from '../../../taskCard'
import s from './tasksList.module.css'

export default function ListTasks({ tasks, loading }) {
  // Local States
  const [sort, setSort] = useState('updates')

  return (
    <div className={s.tasksListBody}>
      <div className={s.headerDiv}>
        <h3 className="header2">Tasks List</h3>
        <div className={s.sortDiv}>
          <label>Sort :</label>
          <Select
            styles={sortSelectStyle}
            options={sortOptions}
            defaultValue={sortOptions[0]}
            theme={customTheme}
            placeholder="Sort"
            isSearchable={false}
            onChange={(e) => setSort(e.value)}
          />
        </div>
      </div>
      <div className={s.tasksListWrapper}>
        {loading ? (
          <p>Loading...</p>
        ) : tasks?.length > 0 ? (
          tasks
            .sort((a, b) => {
              if (sort === 'deadline') {
                return new Date(a?.deadline) - new Date(b?.deadline)
              } else if (sort === 'priority') {
                return b?.priority - a?.priority
              } else {
                return b?.updatedAt?.seconds - a?.updatedAt?.seconds
              }
            })
            .map((task) => <TaskCard task={task} key={task.id} />)
        ) : (
          <p className="noData">
            No Tasks Found, Add one by clicking the add icon
          </p>
        )}
      </div>
    </div>
  )
}
