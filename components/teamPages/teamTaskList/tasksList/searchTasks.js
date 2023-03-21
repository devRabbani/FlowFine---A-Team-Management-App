import { useEffect, useState } from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import TaskCard from '../../../taskCard'
import s from './tasksList.module.css'

export default function SearchTasks({ handleSetSearch, tasks, loading }) {
  // Local States
  const [searchStr, setSearchStr] = useState('')

  //  For checking IsSearch
  useEffect(() => {
    if (searchStr.length > 3) {
      handleSetSearch(true)
    } else {
      handleSetSearch(false)
    }
  }, [searchStr])

  return (
    <>
      <div className={s.searchDiv}>
        <AiOutlineFileSearch />
        <input
          placeholder="Search ID or Task name"
          type="search"
          onChange={(e) => setSearchStr(e.target.value)}
          value={searchStr}
          disabled={loading}
        />
      </div>
      {searchStr.length > 3 ? (
        <div className={s.tasksListBody}>
          <div className={s.headerDiv}>
            <h3 className="header2">
              Search : <span>{searchStr}</span>
            </h3>
          </div>
          <div className={s.tasksListWrapper}>
            {tasks?.length > 0 ? (
              tasks
                .filter(
                  (task) =>
                    task?.title
                      ?.toLowerCase()
                      ?.includes(searchStr?.toLowerCase()) ||
                    task?.taskid
                      ?.toLowerCase()
                      .includes(searchStr?.toLowerCase())
                )
                .map((task) => <TaskCard task={task} key={task.id} />)
            ) : (
              <p className="noData">No Tasks Found</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
