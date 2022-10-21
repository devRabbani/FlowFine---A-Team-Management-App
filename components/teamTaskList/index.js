import { useState } from 'react'
import MembersList from './membersList'
import TaskListContent from './taskListContent'
import styles from './teamTaskList.module.css'

export default function TeamTaskList({ teamCode, members, data, isLoading }) {
  const [isTask, setIsTask] = useState(true)
  return (
    <div className={styles.body}>
      <div className={styles.topBar}>
        <button
          onClick={() => setIsTask(true)}
          className={isTask ? styles.active : ''}
        >
          Task List
        </button>
        <button
          onClick={() => setIsTask(false)}
          className={!isTask ? styles.active : ''}
        >
          All Members
        </button>
      </div>
      <div className={styles.content}>
        {isTask ? (
          <TaskListContent data={data} isLoading={isLoading} />
        ) : (
          <MembersList members={members} />
        )}
      </div>
    </div>
  )
}
