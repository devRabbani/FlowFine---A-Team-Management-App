import { useTeam } from '../../../context/TeamContext'
import TeamHeader from '../../teamHeader'
import Activity from './activity'
import s from './homwPage.module.css'

export default function HomePage({
  data,
  isLoading,
  hasMore,
  loadMore,
  btnLoading,
}) {
  // Getting Datas from Context
  const { team_data, team_loading } = useTeam()
  const { name, updatedAt, owner, members, groups, id } = team_data
  console.count('Home Page')
  return (
    <div className={s.homePage}>
      <TeamHeader name={name} code={id} updatedAt={updatedAt} />
      <Activity
        data={data}
        isLoading={isLoading}
        hasMore={hasMore}
        btnLoading={btnLoading}
        loadMore={loadMore}
      />
    </div>
  )
}
