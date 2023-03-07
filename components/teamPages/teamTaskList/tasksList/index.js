import { useState } from 'react'
import Select from 'react-select'
import {
  customTheme,
  sortOptions,
  sortSelectStyle,
} from '../../../../lib/reactSelect'
import TaskCard from '../../../taskCard'
import { AiOutlineFileSearch } from 'react-icons/ai'
import s from './tasksList.module.css'
import SearchTasks from './searchTasks'
import ListTasks from './listTasks'
import { useTeam } from '../../../../context/TeamContext'

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
