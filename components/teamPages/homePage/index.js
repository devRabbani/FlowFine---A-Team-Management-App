import { useTeam } from '../../../context/TeamContext'
import TeamHeader from '../../teamHeader'
import Activity from './activity'
import s from './homwPage.module.css'

export default function HomePage({ id }) {
  // Getting Datas from Context
  const { team_data, team_loading } = useTeam()
  const { name, updatedAt, owner, members, groups } = team_data

  return (
    <div className={s.homePage}>
      <TeamHeader name={name} code={id} updatedAt={updatedAt} />
      <Activity teamCode={id} />
    </div>
  )
}
