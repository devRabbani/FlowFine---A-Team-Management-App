import { useEffect, useState } from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { useTeam } from '../../../../context/TeamContext'
import TaskCard from '../../../taskCard'
import s from './tasksList.module.css'

export default function SearchTasks({ handleSetSearch }) {
  // Local States
  const [searchStr, setSearchStr] = useState('')
  // Getting Tasks and Loading
  const { tasks_data, tasks_loading } = useTeam()

  //  For checking IsSearch
  useEffect(() => {
    if (searchStr.length > 3) {
      handleSetSearch(true)
    } else {
      handleSetSearch(false)
    }
  }, [searchStr])

  console.count('Search')
  return (
    <>
      <div className={s.searchDiv}>
        <AiOutlineFileSearch />
        <input
          placeholder="Search ID or Task name"
          type="search"
          onChange={(e) => setSearchStr(e.target.value)}
          value={searchStr}
          disabled={tasks_loading}
        />
      </div>
      {searchStr.length > 3 ? (
        <div className={s.tasksListBody}>
          <div className={s.headerDiv}>
            <h3 className="header2">Search : {searchStr}</h3>
          </div>
          <div className={s.tasksListWrapper}>
            {tasks_data?.length > 0 ? (
              tasks_data
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
              <p>No Tasks Found</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
