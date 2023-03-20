import { useState } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import { useUser } from '../../context/UserContext'
import useGetTeams from '../../hooks/useGetTeams'
import CreateTeamModal from '../createTeamModal'
import Modal from '../modal'
import TeamCardNormal from '../teamCard/teamCardNormal'
import styles from './teamList.module.css'

export default function TeamList() {
  const { username, teams, uid } = useUser()
  const { teamsList, isLoading } = useGetTeams(teams)
  // States
  const [isModal, setIsModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Functions
  // Callback Function
  const handleClose = () => setIsModal(false)
  const handleLoading = (value) => setIsCreating(value)
  console.log(isLoading, 'teamlits')
  return (
    <div className={styles.body}>
      <div className={styles.headerDiv}>
        <h3 className="header2">My Teams</h3>
        <div onClick={() => setIsModal(true)} className={styles.createTeam}>
          <RiAddCircleFill />
          Create Team
        </div>
      </div>
      {isLoading ? (
        <p className="noData low pb2">Getting Teams...</p>
      ) : teamsList?.length ? (
        <div className={styles.teamWrapper}>
          {teamsList?.map((item) => (
            <TeamCardNormal
              key={item?.teamcode}
              teamcode={item?.teamcode}
              updatedAt={item?.updatedAt}
              teamname={item?.name}
              privacy={item?.privacy}
            />
          ))}
        </div>
      ) : (
        <p className="noData low pb2">
          You have not joined any team yet, Create one or join any team.
        </p>
      )}

      {isModal ? (
        <Modal
          title="Create Team"
          handleClose={handleClose}
          isLoading={isCreating}
        >
          <CreateTeamModal
            handleClose={handleClose}
            username={username}
            uid={uid}
            handleLoading={handleLoading}
            loading={isCreating}
          />
        </Modal>
      ) : null}
    </div>
  )
}
