import Head from 'next/head'
import { useMemo, useState } from 'react'
import Select from 'react-select'
import { useTeam } from '../../../context/TeamContext'
import { customTheme, groupSelectStyle } from '../../../lib/reactSelect'
import TabNav from '../../tabNav'
import TasksKanban from './tasksKanban'
import TasksList from './tasksList'
import styles from './teamTaskList.module.css'

export default function TeamTaskList() {
  const [isList, setIsList] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState('')

  // Getting Team Data
  const { team_data, tasks_data, tasks_loading } = useTeam()

  const { teamcode, groups } = team_data

  // Tasks With Filter Data
  const tasks = useMemo(
    () =>
      tasks_data.filter((task) =>
        selectedGroup ? task?.assignedGroups?.includes(selectedGroup) : true
      ),
    [tasks_data, selectedGroup]
  )

  // Groups Options
  const groupOptions = useMemo(
    () => [
      { value: '', label: 'All Group' },
      ...groups?.map((group) => ({
        label: group.name,
        value: group.name,
      })),
    ],

    [groups]
  )

  return (
    <>
      <Head>
        <title>FlowFine | Tasks</title>
      </Head>
      <div className={styles.tasksPage}>
        <div className={styles.stickyTop}>
          <div className={styles.selectGroup}>
            <Select
              styles={groupSelectStyle}
              options={groupOptions}
              theme={customTheme}
              isClearable
              placeholder="Select Group : All"
              onChange={(e) => setSelectedGroup(e?.value || '')}
              noOptionsMessage={() => (
                <span className="stateOption">No Groups found</span>
              )}
            />
          </div>
          <TabNav setMenu={setIsList} menu={isList} />
        </div>
        {isList ? (
          <TasksList tasks={tasks} loading={tasks_loading} />
        ) : (
          <TasksKanban
            tasks={tasks}
            teamCode={teamcode}
            loading={tasks_loading}
          />
        )}
      </div>
    </>
  )
}
