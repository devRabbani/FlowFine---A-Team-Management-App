import styles from './teamTaskList.module.css'

export default function TaskListContent({ data, isLoading }) {
  return (
    <div className={styles.memberLists}>
      {isLoading ? (
        <p className={styles.loading}>Getting Task Lists..</p>
      ) : data.length ? (
        <h1>Tasks</h1>
      ) : (
        <p className={styles.loading}>No Task Found</p>
      )}
    </div>
  )
}
