import { useState } from 'react'
import MembersList from './membersList'
import TaskListContent from './taskListContent'
import TaskListNav from './taskListNav'
import styles from './teamTaskList.module.css'

export default function TeamTaskList({ teamCode, tasks, subGroup, isLoading }) {
  const [subnav, setSubnav] = useState('all')

  // Callback Function
  const changeTask = (value) => {
    setSubnav(value)
  }
  return (
    <div className={styles.body}>
      <TaskListNav
        subnav={subnav}
        subGroup={subGroup}
        changeTask={changeTask}
      />
      <div className={styles.content}>
        <TaskListContent data={tasks} isLoading={isLoading} />
      </div>
    </div>
  )
}
