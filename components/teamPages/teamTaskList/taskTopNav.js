import { FaListAlt, FaRegListAlt } from 'react-icons/fa'
import { BsKanban, BsKanbanFill } from 'react-icons/bs'
import s from './teamTaskList.module.css'

export default function TasktopNav({ setIsList, isList }) {
  return (
    <div className={s.taskTopBar}>
      <div
        onClick={() => setIsList(true)}
        className={`${s.taskTopBar_menu} ${isList ? s.active : ''}`}
      >
        {isList ? <FaListAlt /> : <FaRegListAlt />}
        List
      </div>
      <div
        onClick={() => setIsList(false)}
        className={`${s.taskTopBar_menu} ${isList ? '' : s.active}`}
      >
        {isList ? <BsKanban /> : <BsKanbanFill />}
        Kanban
      </div>
    </div>
  )
}
