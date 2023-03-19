import { useRouter } from 'next/router'
import MembersPage from '../../../components/teamPages/membersPage'
import EventsPage from '../../../components/teamPages/eventsPage'
import ArchivePage from '../../../components/teamPages/archivePage'
import TeamTaskList from '../../../components/teamPages/teamTaskList'
import useGetTasks from '../../../hooks/useGetTasks'
import useFetchTeamData from '../../../hooks/useFetchTeamData'
import { useTeam } from '../../../context/TeamContext'
import HomePage from '../../../components/teamPages/homePage'
import usePaginatedData from '../../../hooks/usePaginatedData'
import { useUser } from '../../../context/UserContext'
import FullLoading from '../../../components/fullLoading'

export default function TeamPage() {
  // Router
  const router = useRouter()
  const { id, menu } = router.query // Getting Team Code and menu

  // Fetching Initial Datas
  useFetchTeamData(id) // Fetching Team Data
  useGetTasks(id) // Fetching Tasks List

  // Getting Activity
  const { data, isLoading, hasMore, loadMore, btnLoading } = usePaginatedData(
    `teams/${id}/activity`,
    7
  )

  // Getting Datas from Context
  const { team_loading, team_data } = useTeam()

  // Getting Username
  const { username } = useUser()
  console.log('Team Data', team_data, team_loading)
  if (team_loading) {
    return <FullLoading isTeamPage={true} />
  } else if (!team_data?.members?.includes(username)) {
    router.push('/')
    return
  } else if (menu === 'tasks') {
    return <TeamTaskList />
  } else if (menu === 'members') {
    return <MembersPage />
  } else if (menu === 'events') {
    return <EventsPage teamCode={id} />
  } else if (menu === 'archive') {
    return <ArchivePage teamCode={id} />
  } else {
    return (
      <HomePage
        data={data}
        isLoading={isLoading}
        hasMore={hasMore}
        btnLoading={btnLoading}
        loadMore={loadMore}
      />
    )
  }
}
