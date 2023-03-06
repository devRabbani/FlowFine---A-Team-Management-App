import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import TeamHeader from '../../../components/teamHeader'
import useDataDoc from '../../../hooks/useDataDoc'
import MembersPage from '../../../components/teamPageComps/membersPage'
import CreatePage from '../../../components/teamPageComps/createPage'
import GroupsPage from '../../../components/teamPageComps/groupsPage'
import ArchivePage from '../../../components/teamPageComps/archivePage'
import TeamTaskList from '../../../components/teamPageComps/teamTaskList'
import s from '../../../styles/Team.module.css'
import useGetTasks from '../../../hooks/useGetTasks'
import useFetchTeamData from '../../../hooks/useFetchTeamData'

export default function TeamPage() {
  const router = useRouter()
  const { id, menu } = router.query
  const { data, loading } = useDataDoc('teams/' + id)
  useFetchTeamData()
  const { tasks, loading: tasksLoading } = useGetTasks(id)
  const { name, updatedAt, owner, members, groups } = data
  console.log(data)
  if (loading) {
    return <p>Loading</p>
  }

  // Render Function
  const subPageRender = (menu) => {
    console.log(menu)
    switch (menu) {
      case 'members':
        return <MembersPage />
      case 'create':
        return <CreatePage members={members} groups={groups} teamcode={id} />
      case 'groups':
        return <GroupsPage />
      case 'archive':
        return <ArchivePage />
      default:
        return (
          <TeamTaskList
            teamCode={id}
            subgroup={[]}
            tasks={tasks}
            loading={tasksLoading}
          />
        )
    }
  }

  return (
    <>
      <TeamHeader name={name} code={id} updatedAt={updatedAt} />
      <div className={s.subPageBody}>{subPageRender(menu)}</div>
    </>
  )
}
