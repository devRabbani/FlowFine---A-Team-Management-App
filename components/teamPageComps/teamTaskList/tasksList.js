import s from './teamTaskList.module.css'

export default function TasksList({ tasks, loading }) {
  return (
    <div className={s.tasksListBody}>
      <div className={s.headerDiv}>
        <h3 className="header2">Tasks List</h3>
      </div>
      <div className={s.tasksListWrapper}>
        {loading ? (
          <p>Loading...</p>
        ) : tasks?.length > 0 ? (
          tasks.map((task) => (
            <div className={s.taskCard} key={task.id}>
              <p>{task.title}</p>
            </div>
          ))
        ) : (
          <p>No Tasks Found</p>
        )}
      </div>
    </div>
  )
}
