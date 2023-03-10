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
  const { team_loading } = useTeam()

  if (team_loading) {
    return <p>Loading</p>
  } else if (menu === 'tasks') {
    return <TeamTaskList />
  } else if (menu === 'members') {
    return <MembersPage />
  } else if (menu === 'events') {
    return <EventsPage teamCode={id} />
  } else if (menu === 'archive') {
    return <ArchivePage />
  } else {
    return (
      <HomePage
        id={id}
        data={data}
        isLoading={isLoading}
        hasMore={hasMore}
        btnLoading={btnLoading}
        loadMore={loadMore}
      />
    )
  }
}
