import { useState } from 'react'
import SearchTasks from './searchTasks'
import ListTasks from './listTasks'

export default function TasksList({ tasks, loading }) {
  const [isSearch, setIsSearch] = useState(false)

  // Callback Functions
  const handleSetSearch = (value) => setIsSearch(value)

  console.count('Tasks List')
  return (
    <>
      <SearchTasks
        handleSetSearch={handleSetSearch}
        tasks={tasks}
        loading={loading}
      />
      {!isSearch && <ListTasks tasks={tasks} loading={loading} />}
    </>
  )
}
