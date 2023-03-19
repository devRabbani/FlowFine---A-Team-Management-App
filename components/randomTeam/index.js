import { useUser } from '../../context/UserContext'
import useGetRandomTeams from '../../hooks/useGetRandomTeams'
import TeamCardSearch from '../teamCard/teamCardSearch'
import s from './randomTeam.module.css'

export default function RandomTeam() {
  const { teams } = useUser()

  const { teamsList, isLoading } = useGetRandomTeams(teams)

  return (
    <div className={s.randomTeamWrapper}>
      <div className="headerDiv">
        <h3 className="header2">Random Teams</h3>
      </div>
      <div className={s.randomList}>
        {isLoading ? (
          <p className="noData low">Getting Random Teams..</p>
        ) : teamsList?.length ? (
          teamsList?.map((team) => (
            <TeamCardSearch key={team?.teamcode} teamData={team} />
          ))
        ) : (
          <p className="noData low">No more Teams Data Found</p>
        )}
      </div>
    </div>
  )
}
