import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import TeamHeader from '../../../components/teamHeader'
import useDataDoc from '../../../hooks/useDataDoc'
import MembersPage from '../../../components/teamPages/membersPage'
import CreatePage from '../../../components/teamPages/createPage'
import GroupsPage from '../../../components/teamPages/groupsPage'
import ArchivePage from '../../../components/teamPages/archivePage'
import TeamTaskList from '../../../components/teamPages/teamTaskList'
import s from '../../../styles/Team.module.css'
import useGetTasks from '../../../hooks/useGetTasks'
import useFetchTeamData from '../../../hooks/useFetchTeamData'
import { useTeam } from '../../../context/TeamContext'
import HomePage from '../../../components/teamPages/homePage'

export default function TeamPage() {
  // Router
  const router = useRouter()
  const { id, menu } = router.query // Getting Team Code and menu

  // Fetching Initial Datas
  useFetchTeamData(id) // Fetching Team Data
  useGetTasks(id) // Fetching Tasks List

  // Getting Datas from Context
  const { team_loading } = useTeam()

  if (team_loading) {
    return <p>Loading</p>
  } else if (menu === 'tasks') {
    return <TeamTaskList />
  } else if (menu === 'members') {
    return <MembersPage />
  } else if (menu === 'create') {
    return <CreatePage />
  } else if (menu === 'groups') {
    return <GroupsPage />
  } else if (menu === 'archive') {
    return <ArchivePage />
  } else {
    return <HomePage id={id} />
  }
}
