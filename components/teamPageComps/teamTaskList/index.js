import { useState } from 'react'
import Select from 'react-select'
import { customTheme, groupSelectStyle } from '../../../lib/reactSelect'
import TasksKanban from './tasksKanban'
import TasksList from './tasksList'
import TasktopNav from './taskTopNav'
import styles from './teamTaskList.module.css'

export default function TeamTaskList({ teamCode, tasks, subGroup, loading }) {
  const [isList, setIsList] = useState(true)

  const groupOptions = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'hhsahs ashahsh ashhahs',
      value: 'asa',
    },
    {
      label: 'hhsahs asdadasdsad asdad asdasd asd ashahsh ashhahs',
      value: 'assda',
    },
  ]

  // Callback Function
  // const changeTask = (value) => {
  //   setSubnav(value)
  // }

  console.count('Task Main')
  return (
    <>
      <TasktopNav setIsList={setIsList} isList={isList} />
      <div className={styles.selectGroup}>
        {/* <label>Filter By Group:</label> */}
        <Select
          styles={groupSelectStyle}
          options={groupOptions}
          // defaultValue={priorityOptions[1]}
          theme={customTheme}
          placeholder="Select Group : All"
          // onChange={(e) => setPriority(e.value)}
        />
      </div>

      {isList ? (
        <TasksList tasks={tasks} loading={loading} />
      ) : (
        <TasksKanban tasks={tasks} loading={loading} />
      )}
    </>
  )
}
