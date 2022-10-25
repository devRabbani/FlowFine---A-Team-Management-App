import styles from './teamTaskList.module.css'

export default function TaskListNav({ subnav, subGroup, changeTask }) {
  return (
    <div className={styles.topBar}>
      <button
        onClick={() => changeTask('all')}
        className={subnav === 'all' ? styles.active : ''}
      >
        All
      </button>
      {subGroup &&
        subGroup.map((item, i) => (
          <button
            key={i}
            onClick={() => changeTask(item.name)}
            className={subnav === item.name ? styles.active : ''}
          >
            {item.name}
          </button>
        ))}
    </div>
  )
}
