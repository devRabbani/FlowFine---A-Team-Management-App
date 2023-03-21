import { useTeam } from '../../../context/TeamContext'
import TeamHeader from './teamHeader'
import Activity from './activity'
import s from './homwPage.module.css'
import { useMemo } from 'react'
import { useUser } from '../../../context/UserContext'
import { checkAccess } from '../../../utils/firebase/common'
import Head from 'next/head'

export default function HomePage({
  data,
  isLoading,
  hasMore,
  loadMore,
  btnLoading,
}) {
  // Getting Datas from Context
  const { team_data, tasks_loading, tasks_data } = useTeam()

  const { name, updatedAt, owners, editors, teamcode } = team_data

  // Getting Username
  const { username } = useUser()

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
  const access = checkAccess(editors, owners, username)

  return (
    <div className={s.homePage}>
      <Head>
        <title>FlowFine | Team</title>
      </Head>
      <TeamHeader
        name={name}
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
        access={access}
        teamCode={teamcode}
      />
    </div>
  )
}
