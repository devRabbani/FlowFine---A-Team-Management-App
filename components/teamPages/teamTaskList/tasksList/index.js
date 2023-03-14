import { useState } from 'react'
import SearchTasks from './searchTasks'
import ListTasks from './listTasks'

export default function TasksList() {
  const [isSearch, setIsSearch] = useState(false)

  // Callback Functions
  const handleSetSearch = (value) => setIsSearch(value)

  console.count('Tasks List')
  return (
    <>
      <SearchTasks isSearch={isSearch} handleSetSearch={handleSetSearch} />
      {!isSearch && <ListTasks />}
    </>
  )
}
