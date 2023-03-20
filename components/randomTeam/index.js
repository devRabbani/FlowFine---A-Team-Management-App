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

      {isLoading ? (
        <p className="noData low pb2">Getting Random Teams..</p>
      ) : teamsList?.length ? (
        <div className={s.randomList}>
          {teamsList?.map((team) => (
            <TeamCardSearch key={team?.teamcode} teamData={team} />
          ))}
        </div>
      ) : (
        <p className="noData low pb2">No more Teams Data Found</p>
      )}
    </div>
  )
}
