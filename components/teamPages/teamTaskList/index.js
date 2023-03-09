import { useState } from 'react'
import Select from 'react-select'
import { customTheme, groupSelectStyle } from '../../../lib/reactSelect'
import TabNav from '../../tabNav'
import TasksKanban from './tasksKanban'
import TasksList from './tasksList'
import styles from './teamTaskList.module.css'

export default function TeamTaskList() {
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

  return (
    <div className={styles.tasksPage}>
      <div className={styles.stickyTop}>
        <div className={styles.selectGroup}>
          <Select
            styles={groupSelectStyle}
            options={groupOptions}
            // defaultValue={priorityOptions[1]}
            theme={customTheme}
            placeholder="Select Group : All"
            // onChange={(e) => setPriority(e.value)}
          />
        </div>
        <TabNav setMenu={setIsList} menu={isList} />
      </div>
      {isList ? <TasksList /> : <TasksKanban />}
    </div>
  )
}
