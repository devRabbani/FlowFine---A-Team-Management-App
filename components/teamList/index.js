import moment from 'moment/moment'
import Link from 'next/link'
import { useState } from 'react'
import { RiAddCircleFill } from 'react-icons/ri'
import { useUser } from '../../context/UserContext'
import useGetTeams from '../../hooks/useGetTeams'
import CreateTeamModal from '../createTeamModal'
import Modal from '../modal'
import TeamCard from '../teamCard'
import styles from './teamList.module.css'

export default function TeamList({ uid }) {
  const { teams, loading } = useUser()
  const { teamsList, isLoading } = useGetTeams(teams, loading)

  // States
  const [isModal, setIsModal] = useState(false)

  // Functions
  // Callback Function
  const handleClose = () => {
    setIsModal(false)
  }

  return (
    <div className={styles.body}>
      <div className={styles.headerDiv}>
        <h3 className="header2">My Teams</h3>
        <div onClick={() => setIsModal(true)} className={styles.createTeam}>
          <RiAddCircleFill />
          Create Team
        </div>
      </div>
      <div className={styles.teamWrapper}>
        {isLoading ? (
          <p className={styles.loading}>Getting Teamlist..</p>
        ) : teamsList?.length ? (
          teamsList?.map((item) => (
            <TeamCard
              key={item?.teamcode}
              teamcode={item?.teamcode}
              updated={item?.updated}
              teamname={item?.name}
            />
          ))
        ) : (
          <p className={styles.loading}>No Team Found</p>
        )}
      </div>
      {isModal ? (
        <Modal handleClose={handleClose}>
          <CreateTeamModal handleClose={handleClose} uid={uid} />
        </Modal>
      ) : null}
    </div>
  )
}
