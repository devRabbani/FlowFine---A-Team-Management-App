import { useTeam } from '../../../context/TeamContext'
import TeamHeader from './teamHeader'
import Activity from './activity'
import s from './homwPage.module.css'
import { useMemo } from 'react'
import { checkAccess } from '../../../utils/firebase'
import { useUser } from '../../../context/UserContext'

export default function HomePage({
  data,
  isLoading,
  hasMore,
  loadMore,
  btnLoading,
}) {
  // Getting Datas from Context
  const { team_data, tasks_loading, tasks_data } = useTeam()

  const { name, updatedAt, owners, editors, members, groups, id } = team_data

  // Getting Username
  const { username } = useUser()

  console.log(tasks_data)
  // Calculate
  const totalWorking = useMemo(
    () => tasks_data?.filter((task) => task?.status === 'working')?.length,
    [tasks_data]
  )

  const totalPending = useMemo(
    () => tasks_data?.filter((task) => task?.status === 'idle')?.length,
    [tasks_data]
  )

  // Check Editor
  const isEditor = checkAccess(editors, owners, username)

  console.log(team_data)
  console.count('Home Page')
  return (
    <div className={s.homePage}>
      <TeamHeader
        name={name}
        code={id}
        updatedAt={updatedAt}
        tasks_loading={tasks_loading}
        totalWorking={totalWorking}
        totalPending={totalPending}
      />
      <Activity
        data={data}
        isLoading={isLoading}
        hasMore={hasMore}
        btnLoading={btnLoading}
        loadMore={loadMore}
        isEditor={isEditor}
        teamCode={id}
      />
    </div>
  )
}
