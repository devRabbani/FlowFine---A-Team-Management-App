import Select from 'react-select/dist/declarations/src/Select'
import TeamTaskList from '../../../components/teamPageComps/teamTaskList'
import TasksKanban from '../../../components/teamPageComps/teamTaskList/tasksKanban'
import TasksList from '../../../components/teamPageComps/teamTaskList/tasksList'
import TasktopNav from '../../../components/teamPageComps/teamTaskList/taskTopNav'
import { customTheme, groupSelectStyle } from '../../../lib/reactSelect'
import s from '../../../styles/Tasks.module.css'

export default function Tasks() {
  // Local States
  const [isList, setIsList] = useState(true)

  const groupOptions = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'hhsahs ashahsh ashhahs',
      value: 'asa',
    },
    {
      label: 'hhsahs asdadasdsad asdad asdasd asd ashahsh ashhahs',
      value: 'assda',
    },
  ]

  return (
    <>
      <TasktopNav setIsList={setIsList} isList={isList} />
      <div className={s.selectGroup}>
        {/* <label>Filter By Group:</label> */}
        <Select
          styles={groupSelectStyle}
          options={groupOptions}
          // defaultValue={priorityOptions[1]}
          theme={customTheme}
          placeholder="Select Group : All"
          // onChange={(e) => setPriority(e.value)}
        />
      </div>
      {isList ? (
        <TasksList tasks={tasks} loading={loading} />
      ) : (
        <TasksKanban tasks={tasks} loading={loading} />
      )}
    </>
  )
}
